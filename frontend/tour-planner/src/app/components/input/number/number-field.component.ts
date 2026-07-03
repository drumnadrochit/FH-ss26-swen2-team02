import {Component, computed, input, model, signal} from '@angular/core';
import {FormValueControl, readonly, ValidationError, WithOptionalFieldTree} from '@angular/forms/signals';

@Component({
  selector: 'app-number-field',
  imports: [],
  templateUrl: './number-field.component.html',
  styleUrl: './number-field.component.css',
})
export class NumberField implements FormValueControl<number> {
  value = model<number>(0)
  touched = model<boolean>(false);

  label = input<string>('');
  required  = input<boolean>(false);
  placeholder = input<string>('');

  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  focused = signal<boolean>(false);

  min = input<number | undefined>()
  max = input<number | undefined>()

  minLabel = input<string | undefined>()
  maxLabel = input<string | undefined>()

  metric = input<string | undefined>();

  displayedValue = computed(()=>{
    if(this.touched() || this.value() != 0) return String(this.value())

    return ""
  })

  onInput(event:Event)
  {
    const target = event.target as HTMLInputElement;
    const regex = new RegExp(/\D+/);
    console.log(regex.test(target.value));

    if(regex.test(target.value))
    {
      const r = regex.exec(target.value);
      if (r != null)
      {
        r.forEach((v, i) => {
          console.log(v);
          target.value =  target.value.replace(v,"")
        })
      }
    }

    let value = Number(target.value);




    this.value.set(Number(value))
    this.touched.set(true)
  }

  onFocusOut(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = Number(target.value);

    if(isNaN(value)){
      value = 0
    }

    if(this.min() != undefined)
    {
      value = Math.max(value,this.min()!)
    }

    if(this.max() != undefined)
    {
      value = Math.min(value,this.max()!)
    }

    this.value.set(value);
    target.value = String(value);
  }
}
