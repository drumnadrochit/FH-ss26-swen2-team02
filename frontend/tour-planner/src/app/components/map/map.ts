import {AfterViewInit, Component, effect, inject, input, signal} from '@angular/core';
import {MapService} from '../../services/map.service';
import {Router} from '@angular/router';
import {RouteService} from '../../services/route.service';
import {TourType} from '../../models/tour.model';
import {GeoJSON} from 'leaflet';

@Component({
  selector: 'leaflet-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit{
  private mapService = inject(MapService);
  routeService = inject(RouteService);

  route = input<GeoJSON.FeatureCollection>();

  async ngAfterViewInit() {
    this.mapService.init('map');

  }
}
