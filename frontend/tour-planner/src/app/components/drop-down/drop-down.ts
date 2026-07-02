import {Component, input, model, signal} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

export interface DropDownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-drop-down',
  imports: [],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.css',
})
export class DropDown implements FormValueControl<string>{
  open = signal(false);
  options = input.required<DropDownOption[]>();
  value = model('')
  label = input<string>('');

  onSelect(event:Event) {
    this.value.set((event.target as HTMLSelectElement).value)
  }
}
