
# Car Connect – QR-Based Parking Assistance System

> **Tagline:** Scan. Connect. Move.

A Spring Boot resume project where vehicle owners generate a QR code for their vehicle. Anyone blocked by the parked vehicle can scan the QR code and contact the owner instantly.

## Tech Stack

- Java 21
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- MySQL
- ZXing
- Swagger
- Maven

## User Roles

### Vehicle Owner
- Register/Login
- Add multiple vehicles
- Generate QR code
- Download QR sticker
- View contact history
- Manage profile

### Scanner (No Login Required)
- Scan QR
- View vehicle details
- Call owner
- Send SMS

## Folder Structure

```text
car-connect/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── security/
├── exception/
├── config/
└── util/
```

## Database

### users
| Field | Type |
|------|------|
| id | BIGINT |
| name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| password | VARCHAR |

### vehicles
| Field | Type |
|------|------|
| id | BIGINT |
| vehicle_number | VARCHAR |
| brand | VARCHAR |
| model | VARCHAR |
| color | VARCHAR |
| qr_token | VARCHAR |
| user_id | BIGINT |

### contact_requests
| Field | Type |
|------|------|
| id | BIGINT |
| vehicle_id | BIGINT |
| message | VARCHAR |
| status | SENT/READ |

## QR Workflow

The QR stores a secure token like:

`https://carconnect.app/scan/AbX92Kd`

The backend maps the token to the vehicle and owner.

## Main APIs

| Method | Endpoint |
|------|----------|
| POST | /auth/register |
| POST | /auth/login |
| POST | /vehicles |
| GET | /vehicles |
| GET | /vehicles/{id}/qr |
| GET | /scan/{token} |
| POST | /contact |

## Development Roadmap

1. Project setup
2. MySQL configuration
3. User registration
4. JWT authentication
5. Vehicle CRUD
6. QR generation
7. Public scan page
8. Validation
9. Exception handling
10. Swagger
11. UI polish
12. Deployment

## Future Enhancements

- Push notifications
- WhatsApp integration
- QR customization
- Anonymous chat
- Live parking location

## Resume Description

**Car Connect – QR-Based Parking Assistance System**

- Built a QR-based parking assistance platform using Java, Spring Boot, JWT, MySQL, JPA, and ZXing.
- Implemented secure QR token mapping, REST APIs, and vehicle management.
- Added validation, exception handling, and Swagger documentation.
