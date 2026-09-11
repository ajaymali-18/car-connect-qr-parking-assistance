import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  plate: string = 'MH 12 AB ••••';
  refNumber: string = 'CC-8492';
  timestamp: string = 'Just now';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['plate']) {
        this.plate = params['plate'];
      }
      this.refNumber = 'CC-' + Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      this.timestamp = `Just now • ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    });
  }

  callFallback(): void {
    this.toastService.info('Routing to masked private call...');
    setTimeout(() => {
      window.location.href = 'tel:18005550199';
    }, 800);
  }

  returnHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
