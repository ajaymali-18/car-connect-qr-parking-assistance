import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./owner/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'vehicles',
    loadComponent: () => import('./owner/vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'vehicles/add',
    loadComponent: () => import('./owner/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'vehicles/:id/edit',
    loadComponent: () => import('./owner/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'vehicles/:id/qr',
    loadComponent: () => import('./owner/vehicle-qr/vehicle-qr.component').then(m => m.VehicleQrComponent),
    canActivate: [authGuard]
  },
  {
    path: 'contact-history',
    loadComponent: () => import('./owner/contact-history/contact-history.component').then(m => m.ContactHistoryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./owner/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'scan/:token',
    loadComponent: () => import('./scanner/scan-vehicle/scan-vehicle.component').then(m => m.ScanVehicleComponent)
  },
  {
    path: 'scan/:token/contact',
    loadComponent: () => import('./scanner/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'scan/:token/confirmation',
    loadComponent: () => import('./scanner/confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
