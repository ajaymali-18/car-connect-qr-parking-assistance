import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { ToastService } from '../../core/services/toast.service';
import { Vehicle } from '../../shared/models/vehicle.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
  vehicleService: VehicleService = inject(VehicleService);
  toastService: ToastService = inject(ToastService);

  vehicles = this.vehicleService.vehiclesSignal;
  selectedVehicleModal: Vehicle | null = null;

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe();
  }

  openQrModal(vehicle: Vehicle): void {
    this.selectedVehicleModal = vehicle;
  }

  closeQrModal(): void {
    this.selectedVehicleModal = null;
  }

  sharePass(): void {
    if (!this.selectedVehicleModal) return;
    const url = `${window.location.origin}/scan/${this.selectedVehicleModal.qrToken || 'AbX92Kd'}`;
    if (navigator.share) {
      navigator.share({
        title: `Car Connect QR - ${this.selectedVehicleModal.vehicleNumber}`,
        text: `Scan to connect with driver of ${this.selectedVehicleModal.brand} ${this.selectedVehicleModal.model}`,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      this.toastService.success('QR link copied to clipboard!');
    }
  }

  downloadPdf(): void {
    this.toastService.success('Windshield Sticker PDF generation started!');
  }
}
