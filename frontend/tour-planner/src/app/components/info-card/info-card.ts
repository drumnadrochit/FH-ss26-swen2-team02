import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

export enum CardType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

@Component({
  selector: 'info-card',
  imports: [
  ],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard {
  type = input<CardType>(CardType.Info);
  message = input<string>('Card information');


  getColor() {
    switch (this.type()) {
      case CardType.Info:
        return "gray-400";
      case CardType.Success:
        return "emerald-500";
      case CardType.Warning:
        return 'orange-400';
      case CardType.Error:
        return 'red-400';
      default:
        return 'gray-900';
    }
  }
}
