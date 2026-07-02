import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {TourRequestDTO, TourResponseDTO} from '../models/dto/tour.dto';


@Injectable({
  providedIn: 'root',
})
export class TourService {

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private readonly baseURL = 'http://localhost:8080/api';

  public getDefaultHeader()
  {
    return new HttpHeaders({"authorization" : 'Bearer ' + this.auth.getAccessToken()});
  }

  createTour(tour: TourRequestDTO)
  {
    return this.http.post<TourResponseDTO>(`${this.baseURL}/tours`, tour, {headers: this.getDefaultHeader()})
  }

  deleteTour(id:number)
  {
    return this.http.delete(`${this.baseURL}/tours/${id}`, {observe: "response", headers: this.getDefaultHeader()})
  }

  updateTour(id:number, tour: TourRequestDTO)
  {
    return this.http.put<TourResponseDTO>(`${this.baseURL}/tours/${id}`, tour, {headers: this.getDefaultHeader()})
  }

  // getTours()
  // {
  //   return this.
  // }

}
