import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { VehicleService } from '../../core/services/vehicle.service';
import { ContactService } from '../../core/services/contact.service';
import { ToastService } from '../../core/services/toast.service';
import { ContactRequest } from '../../shared/models/contact-request.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  vehicleService: VehicleService = inject(VehicleService);
  contactService: ContactService = inject(ContactService);
  toastService: ToastService = inject(ToastService);

  currentUser = this.authService.currentUser;
  vehicles = this.vehicleService.vehiclesSignal;
  contactRequests = this.contactService.requestsSignal;

  latestAlert = (): ContactRequest | null => {
    return this.contactRequests().find((r: ContactRequest) => r.status === 'SENT') || null;
  };

  unreadCount = (): number => {
    return this.contactRequests().filter((r: ContactRequest) => r.status === 'SENT').length;
  };

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe();
    this.contactService.getContactHistory().subscribe();
  }

  markResolved(requestId: number): void {
    this.contactService.markAsResolved(requestId).subscribe(() => {
      this.toastService.success('Alert marked as resolved!');
    });
  }

  quickReply(requestId: number): void {
    this.contactService.sendReply(requestId, 'On my way down!').subscribe(() => {
      this.toastService.success('SMS reply sent via masked relay: "On my way down!"');
      this.contactService.markAsResolved(requestId).subscribe();
    });
  }
}
