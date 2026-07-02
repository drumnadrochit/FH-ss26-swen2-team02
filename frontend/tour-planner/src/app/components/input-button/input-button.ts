import {Component, input} from '@angular/core';
import {Input} from 'postcss';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',

}

@Component({
  selector: 'input-button',
  imports: [],
  templateUrl: './input-button.html',
  styleUrl: './input-button.css',
})
export class InputButton {
  buttonType = input<ButtonType>(ButtonType.primary);
  type = input<string>('submit');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  label = input.required<string>();
  protected readonly ButtonType = ButtonType;
}
