import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,18}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agreeTerms: [false, [Validators.requiredTrue]]
  });

  hidePassword = true;
  isLoading = false;

  get passwordStrength(): { score: number; label: string; colorClass: string; bgClass: string } {
    const val = this.registerForm.get('password')?.value || '';
    if (!val) return { score: 0, label: 'None', colorClass: 'text-outline', bgClass: 'bg-surface-container-high' };
    if (val.length < 6) return { score: 1, label: 'Weak', colorClass: 'text-error', bgClass: 'bg-error' };
    const hasNum = /\d/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    if (val.length >= 8 && (hasNum || hasSpecial)) {
      return { score: 3, label: 'Strong', colorClass: 'text-on-tertiary-container', bgClass: 'bg-on-tertiary-container' };
    }
    return { score: 2, label: 'Medium', colorClass: 'text-secondary-container', bgClass: 'bg-secondary-container' };
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastService.warning('Please review the form requirements and accept terms');
      return;
    }

    this.isLoading = true;
    const { name, email, phone, password } = this.registerForm.value;

    this.authService.register({ name, email, phone, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success(`Welcome to Car Connect, ${res.user.name}!`);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Registration failed. Please try again.');
      }
    });
  }

  registerWithGoogle(): void {
    this.isLoading = true;
    window.location.assign(`${environment.apiUrl}/login/oauth2/code/google`);
  }
}
