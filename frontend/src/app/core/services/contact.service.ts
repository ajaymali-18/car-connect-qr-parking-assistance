import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactRequest } from '../../shared/models/contact-request.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  private defaultRequests: ContactRequest[] = [
    {
      id: 1,
      vehicleId: 1,
      vehicleName: 'Honda City',
      vehicleNumber: 'MH 12 AB 1234',
      message: 'Hi, your car is slightly blocking driveway #4. Could you move forward a bit?',
      status: 'SENT',
      createdAt: '12m ago',
      isUrgent: true
    },
    {
      id: 2,
      vehicleId: 2,
      vehicleName: 'Hyundai Creta',
      vehicleNumber: 'KA 05 MN 5678',
      message: 'Headlights appear to have been left on!',
      status: 'READ',
      createdAt: 'Yesterday, 6:15 PM',
      isUrgent: false
    },
    {
      id: 3,
      vehicleId: 1,
      vehicleName: 'Honda City',
      vehicleNumber: 'MH 12 AB 1234',
      message: 'Double parked at Pillar B-12. Leaving now, thanks!',
      status: 'RESOLVED',
      createdAt: 'Oct 24, 2:30 PM',
      isUrgent: false
    },
    {
      id: 4,
      vehicleId: 1,
      vehicleName: 'Honda City',
      vehicleNumber: 'MH 12 AB 1234',
      message: 'Rear passenger window is slightly unrolled before rain starts.',
      status: 'READ',
      createdAt: 'Oct 19, 11:04 AM',
      isUrgent: false
    }
  ];

  requestsSignal = signal<ContactRequest[]>(this.loadInitialRequests());

  constructor(private http: HttpClient) {}

  private loadInitialRequests(): ContactRequest[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('carconnect_requests');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return this.defaultRequests;
        }
      }
    }
    return this.defaultRequests;
  }

  private saveRequests(requests: ContactRequest[]) {
    this.requestsSignal.set(requests);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('carconnect_requests', JSON.stringify(requests));
    }
  }

  getContactHistory(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/contact/history`).pipe(
      tap(requests => {
        if (requests && requests.length > 0) {
          this.saveRequests(requests);
        }
      }),
      catchError(err => {
        console.warn('Backend GET /contact/history failed, using local store:', err);
        return of(this.requestsSignal());
      })
    );
  }

  sendContactRequest(payload: { vehicleId?: number; qrToken?: string; message: string; callbackLocation?: string }): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(`${this.apiUrl}/contact`, payload).pipe(
      tap(newReq => {
        const current = this.requestsSignal();
        this.saveRequests([newReq, ...current]);
      }),
      catchError(err => {
        console.warn('Backend POST /contact failed, saving locally:', err);
        const created: ContactRequest = {
          id: Date.now(),
          vehicleId: payload.vehicleId || 1,
          vehicleName: 'Honda City',
          vehicleNumber: 'MH 12 AB 1234',
          message: payload.message,
          callbackLocation: payload.callbackLocation,
          status: 'SENT',
          createdAt: 'Just now',
          isUrgent: true
        };
        const current = this.requestsSignal();
        this.saveRequests([created, ...current]);
        return of(created);
      })
    );
  }

  markAsResolved(id: number): Observable<boolean> {
    const list = this.requestsSignal().map(r => r.id === id ? { ...r, status: 'RESOLVED' as const } : r);
    this.saveRequests(list);
    return of(true);
  }

  sendReply(id: number, replyText: string): Observable<boolean> {
    console.log(`Sending reply to request #${id}: ${replyText}`);
    return of(true);
  }
}
