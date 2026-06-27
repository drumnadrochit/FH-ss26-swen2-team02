import {Component, model} from '@angular/core';
import {TourModel, TourType} from '../../../interfaces/tour-model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'tour-detail',
  imports: [
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './tour-detail.html',
  styleUrl: './tour-detail.css',
})
export class TourDetail {
  tour = model<TourModel>({id:0, from:"Location A", to: "Location B", type: TourType.Hike, title:"Tour Title", description:"Tour description", duration: 0, distance: 0, logs: []});
}
