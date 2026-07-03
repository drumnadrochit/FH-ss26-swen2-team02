import {computed, inject, Injectable, model, resource, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {TourLogModel, TourModel} from '../models/tour.model';
import {TourService} from '../services/tour.service';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourStore {
  private tourService = inject(TourService);

  public lastSelectedTour = signal<TourModel | undefined >(undefined);
  public tours = signal<TourModel[]>([]);

  private log = signal<TourLogModel | undefined>(undefined);

  public selectedTour = computed(()=>{
    if(this.lastSelectedTour()){
      return this.getTour(this.lastSelectedTour()!.id)
    }
    return undefined;
  });


  public saveLog(log: TourLogModel){
    this.log.set(log)
  }

  public freeLog(){
    this.log.set(undefined);
  }

  public getLog(){
    return this.log();
  }

  public loadTours() {

    this.tourService.getTours().subscribe((tours: TourModel[]) => {
      this.tours.set(tours);
    },error => {
      console.log(error)
    })

  }

  public getTour(id: number)
  {
      let tour = this.tours().find(tour => tour.id == id);
      return tour;
  }

}
