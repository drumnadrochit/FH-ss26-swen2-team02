import {Component, computed, inject, model, OnChanges} from '@angular/core';
import {TourLogModel, TourModel, TourType} from '../../../models/tour.model';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Map} from '../../map/map';
import {LogList} from '../log-list/log-list';
import {TourTypeIndicator} from '../tour-type-indicator/tour-type-indicator';
import {MapService} from '../../../services/map.service';
import {RouteService} from '../../../services/route.service';
import {TourService} from '../../../services/tour.service';
import {latLng} from 'leaflet';
import {Router} from '@angular/router';

@Component({
  selector: 'tour-detail',
  imports: [
    DecimalPipe,
    Map,
    LogList,
    TourTypeIndicator
  ],
  templateUrl: './tour-detail.html',
  styleUrl: './tour-detail.css',
})
export class TourDetail implements  OnChanges{
  router = inject(Router)

  tour = model.required<TourModel>();
  popularity = computed(() => this.tour().logs.length)
  childFriendliness = computed(() => {
    let difficulty = 0;
    let distance = 0;
    let duration = 0;

    // Calculation a distance of 5km in 1.5h with medium difficulty should be managable by a child
    // if the average pace is higher than the reference pace, the tour becomes child unfriendly
    let childPace = 5/1.5 * 2.5;

    if (this.tour().logs.length > 0) {
    for (let log of this.tour().logs) {
      difficulty  += log.difficulty;
      distance  += log.distance;
      duration  += log.duration;
    }

    difficulty = difficulty / this.tour().logs.length;
    distance = distance / this.tour().logs.length;
    duration = duration / this.tour().logs.length;

    }else{
     return 0;
    }
    let pace = distance / duration * difficulty;

    return childPace - pace;
  })

  readonly mapService = inject(MapService);
  readonly routeService = inject(RouteService);

  onEditLog(log:TourLogModel)
  {
    this.router.navigate([`/tours/${this.tour().id}/logs/${log.id}`]);
  }

  onAddLogPressed(){
    this.router.navigate([`/tours/${this.tour().id}/logs/create`]);
  }

  async ngOnChanges(){
      let route = await this.routeService.getRoute(
        latLng({lat: this.tour().from.latitude, lng: this.tour().from.longitude}),
        latLng({lat: this.tour().to.latitude, lng: this.tour().to.latitude})
        ,this.tour().type)
      this.mapService.setRoute(route.features);
      this.mapService.setBounds(route.bbox!, 0)
      // this.mapService.ready.subscribe(async ready => {
      //
      //   })
    }


}
