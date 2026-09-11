export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isGoogleLinked?: boolean;
  smsForwardingEnabled?: boolean;
  phoneRelayEnabled?: boolean;
}
