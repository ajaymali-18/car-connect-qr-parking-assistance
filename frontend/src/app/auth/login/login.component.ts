import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  loginForm: FormGroup = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  hidePassword = true;
  isLoading = false;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.warning('Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    const { identifier, password } = this.loginForm.value;

    this.authService.login({ identifier, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success(`Welcome back, ${res.user.name}!`);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Login failed. Please check your credentials.');
      }
    });
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    window.location.assign(`${environment.apiUrl}/oauth2/authorization/google`);
  }
}
