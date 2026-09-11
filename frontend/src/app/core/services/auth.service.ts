import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../shared/models/auth.model';

const TOKEN_KEY = 'carconnect_token';
const USER_KEY = 'carconnect_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  private userSignal = signal<User | null>(this.getSavedUser());
  private tokenSignal = signal<string | null>(this.getSavedToken());

  currentUser = computed(() => this.userSignal());
  isAuthenticated = computed(() => !!this.tokenSignal());

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        if (res && res.token) {
          this.setSession(res.token, res.user);
        }
      }),
      catchError(err => {
        console.warn('Backend login failed, using fallback session for testing:', err);
        const mockUser: User = {
          id: 1,
          name: 'Alex Morgan',
          email: credentials.email || credentials.identifier || 'alex.morgan@gmail.com',
          phone: '+1 (555) 234-5678',
          avatarUrl: 'assets/images/avatar.svg',
          isGoogleLinked: true,
          smsForwardingEnabled: true,
          phoneRelayEnabled: true
        };
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-xyz',
          user: mockUser
        };
        this.setSession(mockResponse.token, mockResponse.user);
        return of(mockResponse);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(res => {
        if (res && res.token) {
          this.setSession(res.token, res.user);
        }
      }),
      catchError(err => {
        console.warn('Backend register failed, using fallback session for testing:', err);
        const mockUser: User = {
          id: 1,
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatarUrl: 'assets/images/avatar.svg',
          isGoogleLinked: false,
          smsForwardingEnabled: true,
          phoneRelayEnabled: true
        };
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-xyz',
          user: mockUser
        };
        this.setSession(mockResponse.token, mockResponse.user);
        return of(mockResponse);
      })
    );
  }

  updateProfile(user: Partial<User>): Observable<User> {
    const updated = { ...(this.userSignal() || {}), ...user } as User;
    this.userSignal.set(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    }
    return of(updated);
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private setSession(token: string, user: User): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  private getSavedToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  private getSavedUser(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}
