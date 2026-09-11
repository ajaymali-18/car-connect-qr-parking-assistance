import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle } from '../../shared/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  private defaultVehicles: Vehicle[] = [
    {
      id: 1,
      vehicleNumber: 'MH 12 AB 1234',
      brand: 'Honda',
      model: 'City ZX',
      color: 'Deep Navy Blue',
      qrToken: 'AbX92Kd',
      scansCount: 8,
      lastPing: '2h ago',
      status: 'BUSY',
      imageUrl: 'assets/images/honda-city.png',
      maskPhoneNumber: true
    },
    {
      id: 2,
      vehicleNumber: 'KA 05 MN 5678',
      brand: 'Hyundai',
      model: 'Creta SX',
      color: 'Polar White',
      qrToken: 'KrP49Wq',
      scansCount: 4,
      lastPing: 'Yesterday',
      status: 'AVAILABLE',
      imageUrl: 'assets/images/hyundai-creta.png',
      maskPhoneNumber: true
    }
  ];

  vehiclesSignal = signal<Vehicle[]>(this.loadInitialVehicles());

  constructor(private http: HttpClient) {}

  private loadInitialVehicles(): Vehicle[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('carconnect_vehicles');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return this.defaultVehicles;
        }
      }
    }
    return this.defaultVehicles;
  }

  private saveVehicles(vehicles: Vehicle[]) {
    this.vehiclesSignal.set(vehicles);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('carconnect_vehicles', JSON.stringify(vehicles));
    }
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`).pipe(
      tap(vehicles => {
        if (vehicles && vehicles.length > 0) {
          this.saveVehicles(vehicles);
        }
      }),
      catchError(err => {
        console.warn('Backend GET /vehicles failed, using in-memory store:', err);
        return of(this.vehiclesSignal());
      })
    );
  }

  getVehicleById(id: number): Observable<Vehicle | undefined> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`).pipe(
      catchError(err => {
        const found = this.vehiclesSignal().find(v => v.id === id);
        return of(found);
      })
    );
  }

  addVehicle(vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle).pipe(
      tap(created => {
        const current = this.vehiclesSignal();
        this.saveVehicles([...current, created]);
      }),
      catchError(err => {
        console.warn('Backend POST /vehicles failed, adding locally:', err);
        const newVehicle: Vehicle = {
          id: Date.now(),
          vehicleNumber: vehicle.vehicleNumber || 'MH 12 AB 9999',
          brand: vehicle.brand || 'Honda',
          model: vehicle.model || 'City',
          color: vehicle.color || 'Deep Navy Blue',
          qrToken: 'Tk' + Math.random().toString(36).substring(2, 7).toUpperCase(),
          scansCount: 0,
          lastPing: 'Just now',
          status: 'AVAILABLE',
          imageUrl: 'assets/images/generic-car.png',
          maskPhoneNumber: vehicle.maskPhoneNumber !== undefined ? vehicle.maskPhoneNumber : true
        };
        const current = this.vehiclesSignal();
        this.saveVehicles([...current, newVehicle]);
        return of(newVehicle);
      })
    );
  }

  getVehicleQr(id: number): Observable<{ qrToken: string; qrUrl?: string }> {
    return this.http.get<{ qrToken: string; qrUrl?: string }>(`${this.apiUrl}/vehicles/${id}/qr`).pipe(
      catchError(err => {
        const vehicle = this.vehiclesSignal().find(v => v.id === id);
        return of({ qrToken: vehicle?.qrToken || 'AbX92Kd' });
      })
    );
  }
}
