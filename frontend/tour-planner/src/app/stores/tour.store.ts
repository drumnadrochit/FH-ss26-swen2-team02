import {inject, Injectable, model, resource, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {TourModel} from '../models/tour.model';
import {TourService} from '../services/tour.service';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourStore {
  private tourService = inject(TourService);

  // public tours = httpResource<TourModel[]>(() => ({
  //   url: 'http://localhost:8080/api/tours',
  //   method: 'GET',
  //   headers: this.tourService.getDefaultHeader()
  // }))

  public selectedTour = signal<TourModel | undefined >(undefined);

  public tours = signal<TourModel[]>([]);

  public loadTours() {

    this.tourService.getTours().subscribe((tours: TourModel[]) => {
      this.tours.set(tours);
    },error => {
      console.log(error)
    })

    return this.tours()
  }

  public getTour(id: number)
  {
      let tour = this.tours().find(tour => tour.id == id);
      return tour;
  }

}
