import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { ScanService, ScanResult } from '../../core/services/scan.service';
import { ToastService } from '../../core/services/toast.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private contactService: ContactService = inject(ContactService);
  private scanService: ScanService = inject(ScanService);
  private toastService: ToastService = inject(ToastService);

  token = 'AbX92Kd';
  scanResult: ScanResult | null = null;
  isLoading = false;

  presets = [
    { label: 'Blocking my car', text: '⚠️ You are blocking my car. Could you please move it?' },
    { label: 'Move forward slightly', text: '🚗 Please move slightly forward to clear the parking lane.' },
    { label: 'Blocking driveway', text: '🚪 Blocking garage / driveway. Urgent movement requested.' },
    { label: 'Headlights left on', text: '💡 Headlights are left on. Please check your car battery.' }
  ];

  contactForm: FormGroup = this.fb.group({
    message: ['Hello, your car is currently blocking my parking space. Could you please move it when possible?', [Validators.required, Validators.maxLength(300)]],
    callbackLocation: ['']
  });

  get charCount(): number {
    return (this.contactForm.get('message')?.value || '').length;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || 'AbX92Kd';
    this.scanService.getVehicleByToken(this.token).subscribe((res: ScanResult) => {
      this.scanResult = res;
    });
  }

  applyPreset(text: string): void {
    this.contactForm.patchValue({ message: text });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.toastService.warning('Please enter a message to send to the vehicle owner');
      return;
    }

    this.isLoading = true;
    const { message, callbackLocation } = this.contactForm.value;

    this.contactService.sendContactRequest({
      vehicleId: this.scanResult?.vehicle?.id || 1,
      qrToken: this.token,
      message,
      callbackLocation
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastService.success('SMS Alert successfully dispatched to owner!');
        this.router.navigate(['/scan', this.token, 'confirmation'], {
          queryParams: {
            message,
            plate: this.scanResult?.vehicle?.vehicleNumber || 'MH 12 AB ••••',
            location: callbackLocation
          }
        });
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Could not deliver alert. Please try calling directly.');
      }
    });
  }
}
