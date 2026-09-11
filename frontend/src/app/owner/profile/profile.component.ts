import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  private toastService: ToastService = inject(ToastService);

  currentUser = this.authService.currentUser;
  showToastFeedback = false;

  profileForm: FormGroup = this.fb.group({
    name: ['Alex Morgan', [Validators.required]],
    email: ['alex.morgan@gmail.com', [Validators.required, Validators.email]],
    phone: ['+1 (555) 234-5678', [Validators.required]],
    smsForwardingEnabled: [true],
    phoneRelayEnabled: [true]
  });

  ngOnInit(): void {
    const user = this.currentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        smsForwardingEnabled: user.smsForwardingEnabled !== undefined ? user.smsForwardingEnabled : true,
        phoneRelayEnabled: user.phoneRelayEnabled !== undefined ? user.phoneRelayEnabled : true
      });
    }
  }

  toggleSmsForwarding(): void {
    const current = this.profileForm.get('smsForwardingEnabled')?.value;
    this.profileForm.patchValue({ smsForwardingEnabled: !current });
  }

  togglePhoneRelay(): void {
    const current = this.profileForm.get('phoneRelayEnabled')?.value;
    this.profileForm.patchValue({ phoneRelayEnabled: !current });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      this.toastService.warning('Please enter valid profile details');
      return;
    }

    const val = this.profileForm.value;
    this.authService.updateProfile(val).subscribe(() => {
      this.showToastFeedback = true;
      this.toastService.success('Profile preferences saved securely!');
      setTimeout(() => {
        this.showToastFeedback = false;
      }, 3000);
    });
  }

  logout(): void {
    this.authService.logout();
    this.toastService.info('Logged out successfully.');
  }
}
