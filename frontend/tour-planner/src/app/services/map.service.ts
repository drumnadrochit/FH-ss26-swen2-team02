import {Injectable, OnInit, output} from '@angular/core';
import * as L from 'leaflet';
import {control, GeoJSON, LatLng, LatLngExpression, point, PointExpression} from 'leaflet';
import zoom = control.zoom;
import {Subject} from 'rxjs';
import {Location} from "../models/tour.model"

@Injectable({
  providedIn: 'root',
})
export class MapService{
  public ready = new Subject<void>();
  private map : L.Map | null = null;

  private startMarker = L.icon({
    iconUrl: "start-marker.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 35],
  })

  private endMarker = L.icon({
    iconUrl: "end-marker.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 35],
    className: "end-marker"
  })

  init(containerId: string){
    if (this.map) this.map.remove();

    this.map = new L.Map(containerId, {
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: "OpenStreetMap contributors" }
    ).addTo(this.map);

    this.map.setView([48.2082,16.3738],12);
    this.ready.next();
  }

  moveTo(location:Location){
    this.map?.setView([location.latitude, location.longitude],this.map.getZoom(),{animate:false})
  }

  setCenter(position: LatLng, zoom: number=10){
    this.map?.setView(position,zoom);

  }

  setBounds(bounds: GeoJSON.BBox, padding:number) {
    const latlngBound = new L.LatLngBounds(
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]]
    )
    this.map?.fitBounds(latlngBound, {padding: point(padding,padding)})
  }

  setMarker(lat: number, lng: number){
    if (!this.map) return;
    L.marker([lat, lng]).addTo(this.map);
  }

  private route: GeoJSON<any, GeoJSON.Geometry> | null = null;
  private start: L.Marker | null = null;
  private end: L.Marker | null = null;

  RemoveStartMarker(){
    if(!this.map) return;

    if(this.start != null) this.start.remove()

  }

  setStartMarker(location:Location){
    if(!this.map) return;

    this.RemoveStartMarker()
    this.start = L.marker([location.latitude, location.longitude], {icon: this.startMarker, interactive: false}).addTo(this.map);

  }

  RemoveEndMarker(){
    if(!this.map) return;
    if(this.end != null) this.end.remove()

  }

  setEndMarker(location:Location){
    if(!this.map) return;
    this.RemoveEndMarker()
    this.end = L.marker([location.latitude, location.longitude], {icon: this.endMarker, interactive: false}).addTo(this.map);

  }

  setRoute(geoJson:  GeoJSON.GeoJsonObject[]){
    if(!this.map) return;

    if(this.route != null) this.route.remove()
    if(this.start != null) this.start.remove()
    if(this.end != null) this.end.remove()


    if (Array.isArray(geoJson))
    {
      const points = ((geoJson[0] as GeoJSON.Feature).geometry as GeoJSON.LineString).coordinates;
      const start = points[0];
      const end = points.at(-1);

      this.start = L.marker([start[1],start[0]], {icon: this.startMarker, interactive: false}).addTo(this.map);
      this.end = L.marker([end![1], end![0]], {icon: this.endMarker, interactive: false}).addTo(this.map);
      this.route = L.geoJSON(geoJson, {interactive: false, style: {weight:5}}).addTo(this.map);
    }

  }
}
