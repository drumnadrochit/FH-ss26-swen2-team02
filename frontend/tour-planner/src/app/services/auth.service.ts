import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Authenciation, AuthenticationResponseDTO} from '../models/auth.model';
import {firstValueFrom, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly baseURL = 'http://localhost:8080/api';

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async login(data: Authenciation, persist:boolean = true)
  {
    let responseDTO = await firstValueFrom(this.http.post<AuthenticationResponseDTO>(`${this.baseURL}/auth/login`,data));

    if(persist)
    {
      localStorage.setItem("accessToken", responseDTO.accessToken);
    }

    return responseDTO.accessToken;

  }

  async register(data: Authenciation)
  {
    let responseDTO = await firstValueFrom(this.http.post(`${this.baseURL}/auth/register`,data, {observe: 'response'}));
    let status = responseDTO.status;

    return status == 201;
  }
}
