import {Component, model} from '@angular/core';
import {TourDifficultyIndicator} from "../tour-difficulty-indicator/tour-difficulty-indicator";
import {TourRatingIndicator} from "../tour-rating-indicator/tour-rating-indicator";
import {TourLogModel} from '../../../models/tour.model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-log-list-element',
  imports: [
    TourDifficultyIndicator,
    TourRatingIndicator,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './log-list-element.html',
  styleUrl: './log-list-element.css',
})
export class LogListElement {
  log = model.required<TourLogModel>();
}
