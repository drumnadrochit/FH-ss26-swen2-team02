import {Component, input} from '@angular/core';
import {required} from '@angular/forms/signals';
import {DomUtil} from 'leaflet';

@Component({
  selector: 'app-tour-difficulty-indicator',
  imports: [],
  templateUrl: './tour-difficulty-indicator.html',
  styleUrl: './tour-difficulty-indicator.css',
})
export class TourDifficultyIndicator {
  difficulty = input.required<number>();

  getDifficulty(){
    var output = "Easy";

    if (this.difficulty() >= 2.5){
      output = "Medium";
    }

    if (this.difficulty() >= 3.75){
      output = "Hard";
    }

    return output;
  }

}
