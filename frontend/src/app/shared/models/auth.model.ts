import { User } from './user.model';

export interface LoginRequest {
  identifier?: string;
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}
