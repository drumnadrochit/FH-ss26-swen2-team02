import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {TourTypeIndicator} from '../tour-type-indicator/tour-type-indicator';
import {TourType} from '../../../models/tour.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'list-element',
  imports: [
    TourTypeIndicator,
    DecimalPipe
  ],
  templateUrl: './list-element.html',
  styleUrl: './list-element.css',
})
export class ListElement {
  id = input<number>(0);
  type = input<TourType>(TourType.Hike);
  title = input<string>('Tour Title Name')
  distance = input<number>(0)
  duration = input<number>(0)

  hover = signal<boolean>(false)
  selected = input<boolean>(false)

  @Output('elementSelected') elementSelected = new EventEmitter<number>();
  @Output('elementEdited') elementEdit = new EventEmitter<number>();

}
