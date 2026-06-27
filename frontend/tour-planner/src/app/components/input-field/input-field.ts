import {Component, input, InputSignal, model, Type} from '@angular/core';
import {FormValueControl, REQUIRED, required, ValidationError, WithOptionalFieldTree} from '@angular/forms/signals';

@Component({
  selector: 'input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField  implements FormValueControl<string> {
  value = model('')
  label = input<string>('Input Field Label');
  type = input<string>('text');
  required  = input<boolean>(false);
  placeholder = input<string>('');
  invalid = input<boolean>(false);
  dirty = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  isInvalid(){
    return  this.invalid() && this.dirty();
  }

  // label = input("Label")
  // placeholder = input("Value Placeholder")
  // required = input(false)
  // type = input("text")

}
