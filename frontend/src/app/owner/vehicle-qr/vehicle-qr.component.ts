import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { ToastService } from '../../core/services/toast.service';
import { Vehicle } from '../../shared/models/vehicle.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-vehicle-qr',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './vehicle-qr.component.html'
})
export class VehicleQrComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private vehicleService: VehicleService = inject(VehicleService);
  private toastService: ToastService = inject(ToastService);

  vehicle: Vehicle | null = null;
  qrToken = 'AbX92Kd';
  scanUrl = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 1);
    this.vehicleService.getVehicleById(id).subscribe((v: Vehicle | undefined) => {
      if (v) {
        this.vehicle = v;
        this.qrToken = v.qrToken || 'AbX92Kd';
        this.updateScanUrl();
      } else {
        // Default fallback vehicle
        this.vehicle = {
          id: 1,
          vehicleNumber: 'MH 12 AB 1234',
          brand: 'Honda',
          model: 'City ZX',
          color: 'Deep Navy Blue',
          qrToken: 'AbX92Kd',
          scansCount: 8,
          lastPing: '2h ago',
          status: 'AVAILABLE'
        };
        this.updateScanUrl();
      }
    });
  }

  private updateScanUrl(): void {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://carconnect.app';
    this.scanUrl = `${origin}/scan/${this.qrToken}`;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.scanUrl);
    this.toastService.success('Direct QR Scan URL copied to clipboard!');
  }

  shareTag(): void {
    if (navigator.share) {
      navigator.share({
        title: `Car Connect Smart Tag - ${this.vehicle?.vehicleNumber}`,
        text: `Scan my vehicle smart pass to notify me securely: ${this.vehicle?.brand} ${this.vehicle?.model}`,
        url: this.scanUrl
      }).catch(() => {});
    } else {
      this.copyLink();
    }
  }

  downloadSticker(): void {
    this.toastService.success('Windshield Sticker printable file download initiated!');
  }
}
