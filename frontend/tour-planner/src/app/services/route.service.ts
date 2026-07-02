import { inject, Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResourceRequest} from '@angular/common/http';
import {GeoJSON, LatLng, latLng, Point} from 'leaflet';
import {firstValueFrom, map} from 'rxjs';
import {TourType, Location} from '../models/tour.model';


// API token will be recieved after login
// it will be stored until the session is terminated
@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private http = inject(HttpClient)
  private readonly url = "https://api.openrouteservice.org"
//TEST ONLY API token will be saved in RouteService for testing purposes
  private readonly apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY0MjgzNDBmOTk2YWJiYWJhZTc1OWRjODY0YmI1MDY2ZWZlN2JkZGVjMDI2NmFlYjI1ZTJhYjlhIiwiaCI6Im11cm11cjY0In0="

  async getRoute(from:LatLng, to:LatLng, type: TourType) {
    return await firstValueFrom(this.http.get<GeoJSON.FeatureCollection>(`${this.url}/v2/directions/${type.valueOf()}`, {params: {start: `${from.lng},${from.lat}`, end:`${to.lng},${to.lat}`, api_key:this.apiKey}}))

  }

  GetGeoCodeUrl(address:string, focus: LatLng){
    let request : HttpResourceRequest = new HttpRequest("GET",`${this.url}/geocode/search`,
      {params: {text: address, api_key:this.apiKey, "focus.point.lon" : focus.lng, "focus.point.lat" : focus.lat}})
    return request
  }

  getGeoCode(address: string, focus: LatLng)
  {
    return firstValueFrom( this.http.get<GeoJSON.FeatureCollection>(`${this.url}/geocode/search`, {params: {text: address, api_key:this.apiKey, "focus.point.lon" : focus.lng, "focus.point.lat" : focus.lat}}).pipe(map(value => {
      const coordinates = (value.features[0].geometry as GeoJSON.Point).coordinates
      const address = (value.features[0].properties!['label']) as string
      return {longitude:coordinates[0], latitude:coordinates[1], address: address }as Location ;

    })))
  }

  getLocationFromFeatureCollection(collection: GeoJSON.FeatureCollection)
  {
    const coordinates = (collection.features[0].geometry as GeoJSON.Point).coordinates
    const address = (collection.features[0].properties!['label']) as string
    return {longitude:coordinates[0], latitude:coordinates[1], address: address } as Location ;
  }

  async getCurrentGeoLocation() {
    return new Promise<Location>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
          var location = {latitude: p.coords.latitude, longitude: p.coords.longitude} as Location;
          resolve(location)
        })
      } else {
        reject("Geolocation is not supported");
        console.error('GeoLocation not supported');
      }

    })

  }
}
