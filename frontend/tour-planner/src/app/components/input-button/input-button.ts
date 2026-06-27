import {Component, input} from '@angular/core';
import {Input} from 'postcss';


@Component({
  selector: 'input-button',
  imports: [],
  templateUrl: './input-button.html',
  styleUrl: './input-button.css',
})
export class InputButton {
  type = input<string>('submit');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  label = input<string>('label');
}
