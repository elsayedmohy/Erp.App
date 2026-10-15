import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UI } from '@shared/ui';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';

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
  protected readonly auth = inject(AuthService);
  protected readonly alert = inject(AlertService);
  protected readonly router = inject(Router);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    remember: new FormControl(true),
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.auth.login({ email, password }).subscribe({
      next: (result) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.alert.error(error.message);
      }
    });
  }
}
