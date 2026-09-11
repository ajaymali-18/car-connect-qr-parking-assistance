import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string, duration: number = 3500) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type, title, duration };
    this.toasts.update(list => [...list, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, title?: string) {
    this.show(message, 'success', title);
  }

  error(message: string, title?: string) {
    this.show(message, 'error', title);
  }

  info(message: string, title?: string) {
    this.show(message, 'info', title);
  }

  warning(message: string, title?: string) {
    this.show(message, 'warning', title);
  }

  remove(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
