import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ScanService, ScanResult } from '../../core/services/scan.service';
import { ContactService } from '../../core/services/contact.service';
import { ToastService } from '../../core/services/toast.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-scan-vehicle',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './scan-vehicle.component.html'
})
export class ScanVehicleComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private scanService: ScanService = inject(ScanService);
  private contactService: ContactService = inject(ContactService);
  private toastService: ToastService = inject(ToastService);

  token: string = 'AbX92Kd';
  scanResult: ScanResult | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || 'AbX92Kd';
    this.scanService.getVehicleByToken(this.token).subscribe({
      next: (res: ScanResult) => {
        this.scanResult = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  callOwner(): void {
    this.toastService.info('Connecting to virtual audio relay...');
    setTimeout(() => {
      window.location.href = `tel:${this.scanResult?.maskedPhone || '18005550199'}`;
    }, 800);
  }

  openContactForm(): void {
    this.router.navigate(['/scan', this.token, 'contact']);
  }

  sendPreset(situation: string): void {
    const msg = `Urgent alert: ${situation}. Please attend to your vehicle.`;
    this.toastService.info(`Dispatching "${situation}" preset...`);
    
    this.contactService.sendContactRequest({
      vehicleId: this.scanResult?.vehicle?.id || 1,
      qrToken: this.token,
      message: msg
    }).subscribe(() => {
      this.toastService.success('Preset alert dispatched to owner via encrypted relay!');
      this.router.navigate(['/scan', this.token, 'confirmation'], {
        queryParams: { message: msg, plate: this.scanResult?.vehicle?.vehicleNumber || 'MH 12 AB ••••' }
      });
    });
  }
}
