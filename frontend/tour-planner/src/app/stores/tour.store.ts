import {inject, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {TourModel} from '../models/tour.model';
import {TourService} from '../services/tour.service';

@Injectable({
  providedIn: 'root',
})
export class TourStore {
  private tourService = inject(TourService);

  public tours = httpResource<TourModel[]>(() => ({
    url: 'http://localhost:8080/api/tours',
    method: 'GET',
    headers: this.tourService.getDefaultHeader()
  }))


  public getTour(id: number)
  {
      let tour = this.tours.value()!.find(tour => tour.id == id);
      console.log(tour)
      return tour;
  }

}
