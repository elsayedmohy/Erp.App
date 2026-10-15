import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-login',
  imports: [...UI],
  templateUrl: './login.html',
  styles: `
    :host {
      inline-size: 100%;
      max-inline-size: 26rem;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
})
export class Login {
  protected readonly form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(true),
  });
}
