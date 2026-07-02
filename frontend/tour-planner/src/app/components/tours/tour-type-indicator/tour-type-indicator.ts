import {Component, input} from '@angular/core';
import {TourType} from '../../../models/tour.model';

@Component({
  selector: 'app-tour-type-indicator',
  imports: [],
  templateUrl: './tour-type-indicator.html',
  styleUrl: './tour-type-indicator.css',
})
export class TourTypeIndicator {
  tourType = input.required<TourType>();

  protected readonly TourType = TourType;
}
