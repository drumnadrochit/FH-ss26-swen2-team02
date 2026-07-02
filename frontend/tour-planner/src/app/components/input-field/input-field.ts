import {Component, input, InputSignal, model, Type} from '@angular/core';
import {FormValueControl, REQUIRED, required, ValidationError, WithOptionalFieldTree} from '@angular/forms/signals';

export enum InputType {
  text = 'text',
  password = 'password',
  search = 'search',
  multiline = 'multiline',
  number = 'number',
}

@Component({
  selector: 'input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField  implements FormValueControl<string> {
  value = model('')
  label = input<string>('');
  type = input.required<InputType>();
  required  = input<boolean>(false);
  placeholder = input<string>('');

  invalid = input<boolean>(false);
  dirty = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  onInput(event: Event){
    let value = (event.target as HTMLInputElement).value;

    this.value.set(value);
  }

  isInvalid(){
    return  this.invalid() && this.dirty();
  }

  getType()
  {
    let type = this.type();

    if (type == InputType.search){
      type = InputType.text;
    }

    return type;
  }

  protected readonly InputType = InputType;
}
