# Car Connect – Angular Frontend

> **Tagline:** Scan. Connect. Move.

Angular frontend for the Car Connect QR-Based Parking Assistance System, consuming the Spring Boot REST APIs for authentication, vehicle management, QR generation, and the public scan/contact flow.

## Tech Stack

- Angular 17+ (standalone components)
- Angular Router
- Angular Reactive Forms
- Angular HttpClient + JWT Interceptor
- RxJS
- Angular Material / Bootstrap (UI)
- ngx-qrcode / QR image rendering (backend-generated QR)
- Guards (AuthGuard, RoleGuard)
- Environment-based API config

## App Structure

```text
car-connect-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── vehicle.service.ts
│   │   │       ├── scan.service.ts
│   │   │       └── contact.service.ts
│   │   ├── shared/
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── vehicle.model.ts
│   │   │   │   └── contact-request.model.ts
│   │   │   └── components/
│   │   │       ├── navbar/
│   │   │       ├── loader/
│   │   │       └── toast/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── owner/
│   │   │   ├── dashboard/
│   │   │   ├── vehicle-list/
│   │   │   ├── vehicle-form/
│   │   │   ├── vehicle-qr/
│   │   │   ├── contact-history/
│   │   │   └── profile/
│   │   ├── scanner/
│   │   │   ├── scan-vehicle/
│   │   │   └── contact-form/
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── environments/
│   └── assets/
```

## User Roles → Screens

### Vehicle Owner (Authenticated)
- **Login / Register** – forms bound to `/auth/login`, `/auth/register`
- **Dashboard** – summary of vehicles, recent contact requests
- **Vehicle List** – table/cards of all vehicles (`GET /vehicles`)
- **Add/Edit Vehicle** – form for number, brand, model, color (`POST /vehicles`)
- **Vehicle QR View** – displays QR image, download-as-sticker button (`GET /vehicles/{id}/qr`)
- **Contact History** – list of messages received per vehicle, status SENT/READ
- **Profile** – view/update name, email, phone

### Scanner (Public, No Login)
- **Scan Landing Page** (`/scan/:token`) – resolves token, shows vehicle + masked owner details (`GET /scan/{token}`)
- **Contact Form** – message box, "Call Owner" and "Send SMS" actions (`POST /contact`)
- **Confirmation Screen** – "Message sent to owner"

## Routing Table

| Path | Component | Access |
|------|-----------|--------|
| `/login` | LoginComponent | Public |
| `/register` | RegisterComponent | Public |
| `/dashboard` | DashboardComponent | Owner (guarded) |
| `/vehicles` | VehicleListComponent | Owner (guarded) |
| `/vehicles/add` | VehicleFormComponent | Owner (guarded) |
| `/vehicles/:id/edit` | VehicleFormComponent | Owner (guarded) |
| `/vehicles/:id/qr` | VehicleQrComponent | Owner (guarded) |
| `/contact-history` | ContactHistoryComponent | Owner (guarded) |
| `/profile` | ProfileComponent | Owner (guarded) |
| `/scan/:token` | ScanVehicleComponent | Public |
| `**` | NotFoundComponent | Public |

## Core Services (API Mapping)

| Service | Method | Backend Endpoint |
|--------|--------|-------------------|
| `AuthService` | `register()` | POST `/auth/register` |
| `AuthService` | `login()` | POST `/auth/login` |
| `VehicleService` | `addVehicle()` | POST `/vehicles` |
| `VehicleService` | `getVehicles()` | GET `/vehicles` |
| `VehicleService` | `getVehicleQr(id)` | GET `/vehicles/{id}/qr` |
| `ScanService` | `getVehicleByToken(token)` | GET `/scan/{token}` |
| `ContactService` | `sendContactRequest()` | POST `/contact` |

## Auth Flow

1. User logs in → JWT stored (in-memory / secure storage, not localStorage for production-grade apps).
2. `AuthInterceptor` attaches `Authorization: Bearer <token>` to all owner-scoped requests.
3. `AuthGuard` protects `/dashboard`, `/vehicles/**`, `/contact-history`, `/profile`.
4. Token expiry → redirect to `/login`.

## Models

```ts
// user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// vehicle.model.ts
export interface Vehicle {
  id: number;
  vehicleNumber: string;
  brand: string;
  model: string;
  color: string;
  qrToken: string;
}

// contact-request.model.ts
export interface ContactRequest {
  id: number;
  vehicleId: number;
  message: string;
  status: 'SENT' | 'READ';
}
```

## Development Roadmap

1. Project setup (Angular CLI, routing, environments)
2. Auth module (login/register forms + validation)
3. JWT interceptor + auth guard
4. Owner dashboard layout
5. Vehicle CRUD screens
6. QR display + download-as-image
7. Public scan page (no auth)
8. Contact form + call/SMS actions
9. Contact history view
10. Profile management
11. UI polish (Material/Bootstrap theming, responsive design)
12. Error handling + toast notifications
13. Deployment (build + host alongside/behind Spring Boot or on static hosting)

## Future Enhancements

- Real-time push notifications (WebSocket) for new contact requests
- WhatsApp click-to-chat integration on scan page
- QR sticker customization (colors, logo)
- Anonymous in-app chat instead of call/SMS
- Live parking location sharing on the scan page

## Resume Description

**Car Connect – QR-Based Parking Assistance System (Frontend)**

- Built a responsive Angular frontend consuming Spring Boot REST APIs for JWT-based authentication, vehicle management, and QR code display.
- Implemented route guards and an HTTP interceptor for secure, token-based access to owner-only features.
- Designed a public, no-login scan-and-contact flow enabling instant owner contact via call/SMS.
