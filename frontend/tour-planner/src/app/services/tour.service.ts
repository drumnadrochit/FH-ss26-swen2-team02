import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Authenciation} from '../interfaces/authentication-model';
import {firstValueFrom, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private http = inject(HttpClient);
  private readonly baseURL = 'http://localhost:2407/api';

  async login(data: Authenciation)
  {
    const status = await firstValueFrom(this.http.post(`${this.baseURL}/auth/login`,data, {observe: 'response'}).pipe(map(r => r.status))).catch(err => {return 400});

    return status == 200;
  }

  async register(data: Authenciation)
  {
    const status = await firstValueFrom(this.http.post(`${this.baseURL}/auth/register`,data, {observe: 'response'}).pipe(map(r => r.status))).catch((r) => { return 400})

    return status == 201;
  }

}
