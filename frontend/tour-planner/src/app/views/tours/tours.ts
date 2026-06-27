import {Component, signal, Signal} from '@angular/core';
import {InputButton} from '../../components/input-button/input-button';
import {TourModel, TourType} from '../../interfaces/tour-model';
import {ListElement} from '../../components/tours/list-element/list-element';
import {TourDetail} from '../../components/tours/tour-detail/tour-detail';

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
export class Tours {
  tours: TourModel[] = [
    {id: 1, title: "Züricher See Rundgang", distance: 8, duration: 1.25, type: TourType.Hike, from:"From", to:"To", logs: [] },
    {id: 2, title: "Wiener Stadtwanderweg: Rundumadum A1", distance: 12, duration: 1.5, type: TourType.Hike, from:"From", to:"To", logs: [] },
    {id: 3, title: "Alster Promenaden Weg", distance: 5, duration: 0.25, type: TourType.Hike, from:"From", to:"To", logs: [] },
    {id: 4, title: "Uetliberg Talfahrt: Trail 3B", distance: 4, duration: 2.25, type: TourType.Bike, from:"From", to:"To", logs: [] },
    {id: 5, title: "Feuerkogel Hütten Wanderung, leicht", distance: 5, duration: 0.75, type: TourType.Hike , from:"From", to:"To", logs: []},
    {id: 6, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},
    {id: 7, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},
    {id: 8, title: "Schneeberg Panorama Fahrt", distance: 20, duration: 2.25, type: TourType.Bike , from:"From", to:"To", logs: []},

  ]
  selectedTour = signal<TourModel>(this.tours[0]);
  tourSelected = signal<boolean>(false);

  onSelect(tourId: number)
  {
    const t = this.tours.find(tour => tour.id === tourId)
    if(t != null) {
      this.tourSelected.set(true)
      this.selectedTour.set(t)
    }

  }
}
