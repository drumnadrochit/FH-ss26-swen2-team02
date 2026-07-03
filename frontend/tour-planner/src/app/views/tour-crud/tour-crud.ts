import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnChanges,
  resource,
  signal
} from '@angular/core';
import {Map} from '../../components/map/map';
import {
  FieldTree,
  form,
  FormField,
  FormRoot,
  required,
  validate,
  validateAsync,
  validateHttp, debounce
} from '@angular/forms/signals';
import {ActivatedRoute, Router} from '@angular/router';
import {InputField, InputType} from '../../components/input-field/input-field';
import {InputButton} from '../../components/input-button/input-button';
import {DropDown} from '../../components/drop-down/drop-down';
import {MapService} from '../../services/map.service';
import {RouteService} from '../../services/route.service';
import {ReactiveFormsModule} from '@angular/forms';
import {GeoJSON, latLng, LatLng} from 'leaflet';
import {DecimalPipe} from '@angular/common';
import {TourService} from '../../services/tour.service';
import {TourModel, TourType, Location} from '../../models/tour.model';
import {TourRequestDTO} from '../../models/dto/tour.dto';
import {toSignal} from '@angular/core/rxjs-interop';
import {TourStore} from '../../stores/tour.store';


type tourCRUD =  Omit<TourModel, "id" | "logs" | "from" | "to" | "distance" | "duration" >
  & {fromAddress:string, toAddress:string};

@Component({
  selector: 'app-tour-crud',
  imports: [
    Map,
    InputField,
    InputButton,
    DropDown,
    FormRoot,
    FormField,
    ReactiveFormsModule,
    DecimalPipe
  ],
  templateUrl: './tour-crud.html',
  styleUrl: './tour-crud.css',
})
export class TourCRUD implements AfterViewInit {
  router = inject(Router)
  private tourService = inject(TourService);
  private activatedRoute = inject(ActivatedRoute);
  private map = inject(MapService);
  private routingService = inject(RouteService);
  private route = inject(ActivatedRoute)
  private tourStore = inject(TourStore);

  id = signal<number>(0)
  edit = computed(()=> {
    return this.tourStore.getTour(this.id())
  })

  distance = signal<number>(0);
  duration = signal<number>(0);

  clientLocation = signal<Location>({latitude:0,longitude:0,address:''})

  startLocation? : Location
  endLocation? : Location


  constructor() {
    this.route.params.subscribe(params => {
      this.id.set(params['id']);
    })
  }

  onEditRecieved = effect(() =>{
    if(this.edit() != undefined){
      this.formModel.set({title: this.edit()!.title, description: this.edit()!.description, type: this.edit()!.type, fromAddress: this.edit()!.from.address, toAddress: this.edit()!.to.address})
    }
  })

  onTypeChanged = effect(async () => {
    if(this.tourForm.type().valid())
    {
      if(this.startLocation != null)
         this.startLocation = await this.routingService.getGeoCode(this.tourForm.fromAddress().value(),latLng([this.clientLocation().latitude, this.clientLocation().longitude]))

      if(this.endLocation != null)
        this.endLocation = await this.routingService.getGeoCode(this.tourForm.toAddress().value(),latLng([this.clientLocation().latitude, this.clientLocation().longitude]));
    }
  })

  onClientLocationChanged = effect(async () =>{
    let cl = await this.routingService.getCurrentGeoLocation()
    this.clientLocation.set(cl)
  })

  onRouteChange = effect(async () => {
    if(this.tourForm.fromAddress().valid() && this.startLocation != null){
      this.map.setStartMarker(this.startLocation)

      if(this.endLocation == null)
        this.map.moveTo(this.startLocation)
    }
    if(this.tourForm.toAddress().valid() && this.endLocation != null){
      this.map.setEndMarker(this.endLocation)

      if(this.startLocation == null)
        this.map.moveTo(this.endLocation)
    }

    if(this.startLocation != null && this.endLocation != null){
      let route = await this.routingService.getRoute(latLng([this.startLocation.latitude,this.startLocation.longitude]), latLng([this.endLocation.latitude,this.endLocation.longitude]),this.tourForm.type().value())

      this.map.setRoute(route.features)
      this.map.setBounds(route.bbox!,0)

      let properties = route.features[0].properties
      if(properties != null )
      {
        this.distance.set(Number(properties['summary']['distance'])/1000)
        this.duration.set(Number(properties['summary']['duration'])/60/60)

      }
    }
    console.log("Tour CRUD changed");
  })

  onDelete(id:number)
  {
    this.tourService.deleteTour(id).subscribe(res => {
      this.router.navigate(['/tours'])
    })
  }

  async ngAfterViewInit() {
    const location = await this.routingService.getCurrentGeoLocation()
    if(this.formModel().fromAddress == "" || this.formModel().toAddress == "")
    this.map.setCenter(latLng([location.latitude, location.longitude]), 16);
  }

  formModel = model<tourCRUD>({
    description: '',
    fromAddress: '',
    toAddress: '',
    title: "",
    type: TourType.Hike
  });

  tourForm = form(this.formModel, (sp) => {
    required(sp.fromAddress, {message: "Starting Address is required"});
    required(sp.toAddress, {message: "Destination Address is required"});
    required(sp.title, {message: "Title is required"});
    debounce(sp.fromAddress,500)
    debounce(sp.toAddress,500)
    validateHttp(sp.fromAddress,
      {
        request:
          (ctx) => this.routingService.GetGeoCodeUrl(ctx.value(), latLng([this.clientLocation().latitude, this.clientLocation().longitude]))
        , onError: () => {
        },
        onSuccess: (result : GeoJSON.FeatureCollection, ctx) => {

          if(result.features.length < 1)
            return {kind:"Error", message:"No Location found under given Address"};

          this.startLocation = this.routingService.getLocationFromFeatureCollection(result)

          return null
        }
      });
    validateHttp(sp.toAddress,
      {
        request:
          (ctx) => this.routingService.GetGeoCodeUrl(ctx.value(), latLng([this.clientLocation().latitude, this.clientLocation().longitude]))
        , onError: () => {
        },
        onSuccess: (result : GeoJSON.FeatureCollection, ctx) => {

          if(result.features.length < 1)
            return {kind:"Error", message:"No Location found under given Address"};

          this.endLocation = this.routingService.getLocationFromFeatureCollection(result)

          return null
        }
      });
  }, {submission: {
    action: async (field) => {
      const formData = this.formModel();
      const request : TourRequestDTO = {title: formData.title, description: formData.description, type: formData.type , from: this.startLocation!, to: this.endLocation!, distance: this.distance(), duration: this.duration() }

      if(this.edit() != undefined){
        this.tourService.updateTour(this.id(),request).subscribe(res => {
          this.router.navigate(['/tours'])
        })
      }else{
      this.tourService.createTour(request).subscribe(value => {
        this.router.navigate(['tours'])
      })

      }

    }
    }})


  protected readonly InputType = InputType;
  protected readonly TourType = TourType;
}
