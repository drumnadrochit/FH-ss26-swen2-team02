import {Component, EventEmitter, model, output, Output, signal} from '@angular/core';
import {TourDifficultyIndicator} from '../tour-difficulty-indicator/tour-difficulty-indicator';
import {TourRatingIndicator} from '../tour-rating-indicator/tour-rating-indicator';
import {TourLogModel} from '../../../models/tour.model';
import {LogListElement} from '../log-list-element/log-list-element';
import {InputField, InputType} from '../../input-field/input-field';
import {ButtonType, InputButton} from '../../input-button/input-button';

@Component({
  selector: 'log-list',
  imports: [
    LogListElement,
    InputField,
    InputButton
  ],
  templateUrl: './log-list.html',
  styleUrl: './log-list.css',
})
export class LogList {
  protected readonly InputType = InputType;
  protected readonly ButtonType = ButtonType;

  logs = model.required<TourLogModel[]>();

  filteredLogs = signal<TourLogModel[]>([]);
  onAddLog = output({alias: 'onAddLog'})
  @Output() onEdit = new EventEmitter<TourLogModel>();

  onValueChanged(value: string ): void {
    if ( value.length > 0) {
      this.filteredLogs.set(this.logs().filter((e) => e.comment.includes(value)))

    }else{
      this.filteredLogs.set([])
    }
  }
}
