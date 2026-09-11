import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { ToastService } from '../../core/services/toast.service';
import { ContactRequest } from '../../shared/models/contact-request.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-contact-history',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './contact-history.component.html'
})
export class ContactHistoryComponent implements OnInit {
  contactService: ContactService = inject(ContactService);
  toastService: ToastService = inject(ToastService);

  requests = this.contactService.requestsSignal;
  activeFilter: 'all' | 'unread' | 'resolved' = 'all';

  expandedReplyId: number | null = null;
  replyInputs: { [key: number]: string } = {};
  isCallingId: number | null = null;

  ngOnInit(): void {
    this.contactService.getContactHistory().subscribe();
  }

  setFilter(filter: 'all' | 'unread' | 'resolved'): void {
    this.activeFilter = filter;
  }

  filteredRequests(): ContactRequest[] {
    const all = this.requests();
    if (this.activeFilter === 'unread') {
      return all.filter((r: ContactRequest) => r.status === 'SENT');
    }
    if (this.activeFilter === 'resolved') {
      return all.filter((r: ContactRequest) => r.status === 'RESOLVED' || r.status === 'READ');
    }
    return all;
  }

  unreadCount(): number {
    return this.requests().filter((r: ContactRequest) => r.status === 'SENT').length;
  }

  toggleQuickReply(id: number): void {
    this.expandedReplyId = this.expandedReplyId === id ? null : id;
  }

  populateReply(id: number, text: string): void {
    this.replyInputs[id] = text;
  }

  sendReply(id: number): void {
    const text = this.replyInputs[id];
    if (!text || !text.trim()) return;

    this.contactService.sendReply(id, text).subscribe(() => {
      this.toastService.success('Relayed reply dispatched to driver!');
      this.contactService.markAsResolved(id).subscribe();
      this.replyInputs[id] = '';
      this.expandedReplyId = null;
    });
  }

  triggerRelayCall(id: number): void {
    this.isCallingId = id;
    this.toastService.info('Connecting through private dual-masked audio bridge...');
    setTimeout(() => {
      this.isCallingId = null;
      this.toastService.success('Masked audio bridge connected!');
    }, 1500);
  }
}
