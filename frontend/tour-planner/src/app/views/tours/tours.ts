import {AfterViewInit, Component, computed, inject, OnChanges, OnInit, signal} from '@angular/core';
import {InputButton} from '../../components/input-button/input-button';
import {ListElement} from '../../components/tours/list-element/list-element';
import {TourDetail} from '../../components/tours/tour-detail/tour-detail';
import {RouteService} from '../../services/route.service';
import * as L from 'leaflet';
import {ActivatedRoute, Router} from '@angular/router';
import {TourModel, TourType} from '../../models/tour.model';
import {httpResource} from '@angular/common/http';
import {TourService} from '../../services/tour.service';
import {TourStore} from '../../stores/tour.store';

@Component({
  selector: 'app-tours',
  imports: [
    InputButton,
    ListElement,
    TourDetail
  ],
  templateUrl: './tours.html',
  styleUrl: './tours.css',
})
export class Tours implements OnInit{
  ngOnInit(): void {
    this.tourStore.loadTours()
  }

  tourService = inject(TourService);
  tourStore = inject(TourStore);
  router = inject(Router);

  tours = computed(() => {
    return this.tourStore.loadTours();
  })

  selectedTour = computed(()=> {
    return this.tourStore.selectedTour();
  })

  getTourById(id:number){
    const t = this.tours().find(tour => tour.id === id)

    return t;
  }

  onEdit(tourId: number){
    const tour = this.getTourById(tourId);

    if(tour != null)
    {
      this.router.navigate(['tours/edit', tourId]);

    }
  }

  onSelect(tourId: number)
  {
    const t = this.tourStore.getTour(tourId)
    if(t != undefined) {
      this.tourStore.selectedTour.set(t as TourModel)
    }

  }
}
