import { Component, Input, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() title: string = 'Car Connect';
  @Input() subtitle: string = '';
  @Input() showBack: boolean = false;
  @Input() backUrl?: string;

  authService: AuthService = inject(AuthService);
  location: Location = inject(Location);
  router: Router = inject(Router);

  currentUser = this.authService.currentUser;

  goBack(): void {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    } else {
      this.location.back();
    }
  }
}
