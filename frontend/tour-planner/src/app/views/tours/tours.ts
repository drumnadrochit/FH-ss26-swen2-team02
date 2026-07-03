import {AfterViewInit, Component, computed, effect, inject, OnChanges, OnInit, signal} from '@angular/core';
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
export class Tours implements OnInit {
  ngOnInit(): void {
   this.tourStore.loadTours();
  }


  tourService = inject(TourService);
  tourStore = inject(TourStore);
  router = inject(Router);



  tours = computed(() => {
    return this.tourStore.tours();
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
      this.tourStore.lastSelectedTour.set(t as TourModel)
    }

  }

  onDownload(event: Event)
  {
    this.tourService.exportTours().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tours.json';

      link.click();

      window.URL.revokeObjectURL(url)
    }, error => {
      console.error("Failed downloading tour export file", error);
    })
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.files)
    {
      const file = target.files[0];

      if(file && file.type == 'application/json')
      {
        this.tourService.importTours(file).subscribe((value) => {
          this.tourStore.loadTours();

        });
      }
    }
  }
}
