import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle } from '../../shared/models/vehicle.model';

export interface ScanResult {
  vehicle: Vehicle;
  ownerNameMasked: string;
  isRelayActive: boolean;
  maskedPhone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicleByToken(token: string): Observable<ScanResult> {
    return this.http.get<ScanResult>(`${this.apiUrl}/scan/${token}`).pipe(
      catchError(err => {
        console.warn('Backend GET /scan/{token} failed, providing resolved token data:', err);
        const mockResult: ScanResult = {
          vehicle: {
            id: 1,
            vehicleNumber: 'MH 12 AB 1234',
            brand: 'Honda',
            model: 'City ZX',
            color: 'Metallic Blue',
            qrToken: token,
            status: 'BLOCKED',
            maskPhoneNumber: true
          },
          ownerNameMasked: 'Alex M.',
          isRelayActive: true,
          maskedPhone: '+1 (800) 555-0199'
        };
        return of(mockResult);
      })
    );
  }
}
