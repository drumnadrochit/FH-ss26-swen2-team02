import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {TourLogRequestDTO, TourLogResponseDTO, TourRequestDTO, TourResponseDTO} from '../models/dto/tour.dto';
import {TourLogModel, TourModel} from '../models/tour.model';


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

  getTours()
  {
    return this.http.get<TourModel[]>(`${this.baseURL}/tours`, {headers: this.getDefaultHeader()})
  }

  getTour(id:number)
  {
    return this.http.get<TourModel>(`${this.baseURL}/tours/${id}`, {headers: this.getDefaultHeader()})
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

  createLog(log: TourLogRequestDTO)
  {
    return this.http.post<TourLogResponseDTO>(`${this.baseURL}/logs`, log, {headers: this.getDefaultHeader()})
  }

  deleteLog(tourId: number, logId: number)
  {
    const request = {tourId: tourId}
    return this.http.delete(`${this.baseURL}/logs/${logId}` , {body:request, observe: "response",  headers: this.getDefaultHeader()})
  }

  updateLog(log: TourLogRequestDTO, logId: number)
  {
    return this.http.put<TourLogResponseDTO>(`${this.baseURL}/logs/${logId}`, log, {headers: this.getDefaultHeader()})
  }

  // getTours()
  // {
  //   return this.
  // }

}
