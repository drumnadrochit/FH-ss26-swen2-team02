import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import { TourType } from "../../../interfaces/tour-model";

@Component({
  selector: 'list-element',
  imports: [],
  templateUrl: './list-element.html',
  styleUrl: './list-element.css',
})
export class ListElement {
  id = input<number>(0);
  title = input<string>('Tour Title Name')
  distance = input<number>(0)
  duration = input<number>(0)
  type = input<TourType>(TourType.Hike)

  @Output('elementSelected') elementSelected = new EventEmitter<number>();
}
