import {AfterViewInit, Component, computed, inject, signal} from '@angular/core';
import {InputButton} from '../../components/input-button/input-button';
import {ListElement} from '../../components/tours/list-element/list-element';
import {TourDetail} from '../../components/tours/tour-detail/tour-detail';
import {RouteService} from '../../services/route.service';
import * as L from 'leaflet';
import {ActivatedRoute, Router} from '@angular/router';
import {TourModel, TourType} from '../../models/tour.model';
import {httpResource} from '@angular/common/http';
import {TourService} from '../../services/tour.service';
import {TourStore} from '../../stores/tour.store';

@Component({
  selector: 'app-tours',
  imports: [
    InputButton,
    ListElement,
    TourDetail
  ],
  templateUrl: './tours.html',
  styleUrl: './tours.css',
})
export class Tours{

  tourService = inject(TourService);
  tourStore = inject(TourStore);
  router = inject(Router);

  tours = computed(() => {
    return this.tourStore.tours.value()
  })

  // tours: TourModel[] = [
  //   {id: 1, title: "Züricher See Rundgang", distance: 8, duration: 1.25, type: TourType.Hike, description:"This wonderful route lets you experience Zurich from its best side. This route is easily reachable by tram and starts Zurich Tiefenbrunnen. ", from:{latitude:47.364932,longitude:8.494223 , address: "Zürich Tiefenbrunnen, 8008 Zürich, Switzerland"}, to: { latitude:47.355023,longitude:8.535030 , address:"Mythenquai, 8038 Zürich, Switzerland"}, logs: [
  //       {id: 1, creationDate: new Date(),rating: 4, difficulty: 1, comment:"Was a very nice stroll.", duration:1, distance:8 },
  //       {id: 2, creationDate: new Date(),rating: 5, difficulty: 1, comment:"Zürich is such a lovely city. And taking a walk next to the river is amazing.", duration:1.5, distance:8.25 },
  //       {id: 3, creationDate: new Date(),rating: 5, difficulty: 2, comment:"I can only recommend this route. It is also very beginner friendly.", duration:1.5, distance:7 }
  //     ] },
  //   // {id: 2, title: "Uetliberg Talfahrt, B1", distance: 5, duration: 2, type: TourType.Bike, description:"This bike tour promises the best view onto zürich and its sorounding areas. As the mountain is quiet steep, this tour is only recommended for experienced mountain bikers.", from:{latitude:47.364932, longitude: 8.494223, address: "Hohensteinweg, Friesenberg, Kreis 3, Zurich, District Zurich, Zurich, 8063, Switzerland"}, to: {latitude:47.349429, longitude: 8.492013, address:"Uto Kulm, Sellenbüren, Stallikon, Bezirk Affoltern, Zurich, 8143, Switzerland"}, logs: [
  //   //     {id: 1, creationDate: new Date(),rating: 4, difficulty: 5, comment:"Nice bike tour, but only recommended for the expierienced.", duration:2, distance:6 },
  //   //   ] },
  //   // {id: 2, title: "Wiener Stadtwanderweg: Rundumadum A1", distance: 12, duration: 1.5, type: TourType.Hike, from:"From", to:"To", logs: [] },
  //   // {id: 3, title: "Alster Promenaden Weg", distance: 5, duration: 0.25, type: TourType.Hike, from:"From", to:"To", logs: [] },
  //   // {id: 4, title: "Uetliberg Talfahrt: Trail 3B", distance: 4, duration: 2.25, type: TourType.Bike, from:"From", to:"To", logs: [] },
  //   // {id: 5, title: "Feuerkogel Hütten Wanderung, leicht", distance: 5, duration: 0.75, type: TourType.Hike , from:"From", to:"To", logs: []},
  //   // {id: 6, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},
  //   // {id: 7, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},
  //   // {id: 8, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},
  //
  // ]

  selectedTour?: TourModel;
  tourSelected = signal<boolean>(false);

  getTourById(id:number){
    const t = this.tours()!.find(tour => tour.id === id)

    return t;
  }

  onEdit(tourId: number){
    const tour = this.getTourById(tourId);

    if(tour != null)
    {
      this.router.navigate(['tours/edit', tourId]);

    }
  }

  onSelect(tourId: number)
  {
    const t = this.getTourById(tourId);
    if(t != null) {
      this.tourSelected.set(true)
      this.selectedTour = t
    }

  }
}
