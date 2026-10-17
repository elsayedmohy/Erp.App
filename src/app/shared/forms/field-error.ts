import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TuiError } from '@taiga-ui/core';
import { errorMessage } from './form-utils';

@Component({
  selector: 'app-field-error',
  imports: [TuiError],
  template: `<tui-error class="my-2" [error]="message()" />`,
})
export class FieldError {
  readonly control = input.required<AbstractControl>();
  protected message(): string | null {
    return errorMessage(this.control());
  }
}
