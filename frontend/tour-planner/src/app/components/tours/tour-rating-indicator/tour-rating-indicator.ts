import {Component, input} from '@angular/core';
import {RangePipePipe} from '../../../pipes/range.pipe-pipe';

@Component({
  selector: 'app-tour-rating-indicator',
  imports: [
    RangePipePipe
  ],
  templateUrl: './tour-rating-indicator.html',
  styleUrl: './tour-rating-indicator.css',
})
export class TourRatingIndicator {
  maxScore = input.required<number>();
  rating = input.required<number>();
  protected readonly Array = Array;
}
