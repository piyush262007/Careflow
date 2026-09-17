# CareFlow — AI-Powered Smart Healthcare Management Platform

CareFlow is an intelligent full-stack healthcare platform designed to streamline hospital discovery, appointment management, live queue tracking, doctor consultations, digital prescriptions, and electronic health records into a single unified workflow.

---

## 1. Overview

CareFlow bridges the gap between patient symptoms and specialized clinical care. By integrating symptom-aware specialty recommendation with location-based hospital discovery and atomic appointment booking, CareFlow provides end-to-end healthcare navigation for patients while equipping doctors and hospital administrators with real-time operational management tools.

$$\text{Symptoms} \longrightarrow \text{Specialty Match} \longrightarrow \text{Hospital Discovery} \longrightarrow \text{Doctor Selection} \longrightarrow \text{Slot Booking} \longrightarrow \text{Consultation} \longrightarrow \text{Digital Prescription}$$

> [!IMPORTANT]
> **Medical Disclaimer:** CareFlow is an administrative healthcare navigation and appointment coordination platform. CareFlow does **NOT** provide medical diagnosis or emergency triage. Users experiencing medical emergencies should contact local emergency services immediately.

---

## 2. Problem

In traditional healthcare access, patients frequently experience:
- **Specialty Misalignment:** Difficulty determining which medical specialist to consult for specific symptoms.
- **Opaque Wait Times:** Unpredictable emergency room and clinic waiting queues causing patient overcrowding.
- **Manual Booking Friction:** Fragmented booking processes leading to schedule overlaps and missing medical histories.
- **Fragmented Health Records:** Disconnected prescriptions, lab reports, and doctor consultation notes.

---

## 3. Solution

CareFlow addresses these challenges through a modern full-stack web application:
- **Intelligent Specialty Triage:** Recommends appropriate medical departments based on symptom descriptions, severity, and duration.
- **Distance & Queue-Aware Hospital Discovery:** Ranks nearby hospitals using physical distance calculations (Haversine formula in km), real-time queue length, and department availability.
- **Atomic Concurrency Protection:** Prevents double booking at the database level using SQL unique constraints and service-layer validation (`HTTP 409 Conflict`).
- **Complete Consultation & EHR Suite:** Enables doctors to record diagnosis notes, issue structured digital prescriptions, and instantly sync health records to patient portals.

---

## 4. Key Features

- **Symptom Triage & Recommendation Engine:** Smart mapping of patient symptoms to medical specialties (e.g., Cardiology, Neurology, Orthopedics).
- **Interactive Hospital Discovery & Google Maps:** Live location markers, geodesic distance calculation (km), emergency status toggles, and dynamic map fallback mode.
- **Doctor Availability & Booking Flow:** Real-time weekly schedule visibility, slot selection, and booking state transitions (`PENDING`, `CONFIRMED`, `REJECTED`, `COMPLETED`, `CANCELLED`).
- **Digital QR Appointment Passes:** Instant 300x300 PNG QR pass generation (ZXing core engine) for hospital reception check-in.
- **Live Queue Tracking:** Real-time queue position display and estimated wait time calculations for patients.
- **Doctor Consultation Portal:** Patient medical history summary, complaint notes, diagnosis entry, medication builder, and digital signature simulation.
- **Structured Digital Prescriptions:** Clear medical document format showing Doctor details, Patient information, Medication name, Dosage, Frequency, Duration, and Special Instructions.
- **Electronic Health Records (EHR):** Digital repository for consultation histories, lab reports, attached documents, and downloadable summary cards.
- **In-App Notification Center:** Real-time notification updates with unread badges and single-click read markers.
- **Healthcare Operations Admin Dashboard:** Comprehensive admin suite for managing hospital profiles, doctor rosters, patient registries, queue status, and system logs.

---

## 5. User Roles

CareFlow enforces strict Role-Based Access Control (RBAC) across three distinct user roles:

| User Role | Dashboard Portal | Core Capabilities & Permissions |
| :--- | :--- | :--- |
| **Patient** (`ROLE_PATIENT`) | Patient Dashboard | Perform symptom triage, discover hospitals, book appointments, track live queue, view digital prescriptions, upload/view health records, receive notifications. |
| **Doctor** (`ROLE_DOCTOR`) | Doctor Dashboard | Manage weekly operating schedules, view assigned patients, confirm/reject bookings, conduct consultations, issue digital prescriptions, mark visits as completed. |
| **Admin** (`ROLE_ADMIN`) | Admin Dashboard | Oversee healthcare operations, manage hospital profiles, maintain doctor/patient rosters, monitor live queue status, inspect system logs and reports. |

---

## 6. Technology Stack

### Frontend (`careflow-hero`)
- **Core:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom CSS design tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Maps:** Google Maps JavaScript API (with responsive card fallback mode)
- **HTTP Client:** Axios / Fetch API

### Backend (`careflow-backend`)
- **Runtime:** Java 21 (JDK 21)
- **Framework:** Spring Boot 3.2.5
- **Security:** Spring Security with Stateless JWT (JJWT) & BCrypt password hashing
- **Data Access:** Spring Data JPA / Hibernate
- **Database:** MySQL 8.0 (H2 in-memory for testing)
- **Database Migrations:** Flyway Migration Engine (V1 to V10)
- **QR Engine:** ZXing (Zebra Crossing) Core & JavaSE
- **API Documentation:** Springdoc OpenAPI / Swagger UI

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Build Managers:** Maven (`mvn`) & Node.js (`npm`)

---

## 7. Architecture

CareFlow follows a decoupled client-server architecture:

```
[ React + Vite Frontend ] ──(HTTP / REST / JWT)──> [ Spring Boot API Gateway ]
                                                           │
                                                           ├──> [ Spring Security + JWT ]
                                                           ├──> [ Service Layer Business Logic ]
                                                           ├──> [ Spring Data JPA / Hibernate ]
                                                           └──> [ MySQL 8.0 Database (Flyway Engine) ]
```

### Containerized Topology
```
                  ┌────────────────────────┐
                  │    Docker Network      │
                  │                        │
  Port 5173  ───> │  [ careflow-hero ]     │
                  │           │            │
  Port 8080  ───> │  [ careflow-backend ]  │
                  │           │            │
  Port 3306  ───> │  [ careflow-db ]       │
                  └────────────────────────┘
```

---

## 8. Project Structure

```
CareFlow/
├── README.md                       # Project root documentation
├── .gitignore                      # Git exclusion rules
├── careflow-hero/                  # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/             # UI Components (Auth, Dashboards, Booking, Prescriptions, Records)
│   │   ├── context/                # React AuthContext
│   │   ├── hooks/                  # Custom React Hooks
│   │   ├── services/               # API Service Clients
│   │   ├── types/                  # TypeScript Types & Interfaces
│   │   ├── App.tsx                 # Application Routing & Guards
│   │   └── main.tsx                # Frontend Entry Point
│   ├── .env.example                # Frontend Environment Template
│   ├── package.json                # Dependencies & Build Scripts
│   ├── tailwind.config.js          # Tailwind Styling Config
│   └── vite.config.ts              # Vite Compiler Config
│
└── careflow-backend/               # Spring Boot REST API Backend
    ├── Dockerfile                  # Production Multi-Stage Dockerfile
    ├── docker-compose.yml          # Container Orchestration
    ├── pom.xml                     # Maven Dependencies Config
    ├── .env.example                # Backend Environment Template
    └── src/
        ├── main/
        │   ├── java/com/careflow/
        │   │   ├── admin/          # Admin & Operations Controllers
        │   │   ├── appointment/    # Booking Engine & Service
        │   │   ├── auth/           # Authentication & User Service
        │   │   ├── common/         # Audit & Global Exception Handlers
        │   │   ├── doctor/         # Doctor Schedules & Roster
        │   │   ├── hospital/       # Hospital Discovery & Geo Search
        │   │   ├── notification/   # In-App Notification System
        │   │   ├── patient/        # Patient Profiles & Health Records
        │   │   ├── prescription/   # Consultation Notes & Prescriptions
        │   │   ├── qr/             # ZXing QR Pass Generator
        │   │   ├── recommendation/ # AI Specialty Triage Engine
        │   │   └── security/       # JWT Filters & Security Config
        │   └── resources/
        │       ├── application.yml # Core Spring Boot Configuration
        │       └── db/migration/   # Versioned Flyway SQL Scripts (V1__... to V10__...)
        └── test/                   # Integration & Unit Tests
```

---

## 9. Prerequisites

Before installing and running CareFlow, ensure your environment meets the following requirements:
- **Java Development Kit (JDK):** Version 21
- **Node.js:** Version 18.x or 20.x (with `npm`)
- **MySQL Server:** Version 8.0 (running on port `3306`)
- **Docker & Docker Compose:** (Optional, for containerized execution)
- **Git**

---

## 10. Environment Variables

CareFlow utilizes externalized configuration via environment variables.

### Frontend (`careflow-hero/.env.example`)
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### Backend (`careflow-backend/.env.example`)
```env
DATABASE_URL=jdbc:mysql://localhost:3306/careflow_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DATABASE_USERNAME=careflow_user
DATABASE_PASSWORD=YOUR_PRODUCTION_DATABASE_PASSWORD
JWT_SECRET=GENERATE_A_SECURE_SECRET_MIN_256_BITS
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## 11. Local Development

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/CareFlow.git
cd CareFlow
```

### Step 2: Run Backend Service
```bash
cd careflow-backend
# Optional: copy environment template
cp .env.example .env

# Build and execute Spring Boot application
mvn spring-boot:run
```
The REST API starts at `http://localhost:8080/api/v1`.

### Step 3: Run Frontend Application
Open a separate terminal session:
```bash
cd careflow-hero
# Install NPM dependencies
npm install

# Launch Vite development server
npm run dev
```
The application will open at `http://localhost:5173`.

---

## 12. Docker Setup

To build and run the entire CareFlow stack using Docker:

1. **Navigate to the backend directory containing `docker-compose.yml`:**
   ```bash
   cd careflow-backend
   ```
2. **Validate compose configuration:**
   ```bash
   docker compose config
   ```
3. **Build and start containerized stack:**
   ```bash
   docker compose up -d --build
   ```
4. **Verify running status and health checks:**
   ```bash
   docker compose ps
   ```
   *Expected Containers:* `careflow-db` (healthy), `careflow-backend` (healthy).

5. **Stop stack:**
   ```bash
   docker compose down
   ```

---

## 13. Database

CareFlow uses **MySQL 8.0** with **Flyway** for database migrations:
- **Migration Scripts:** Located in `careflow-backend/src/main/resources/db/migration/` (`V1__` through `V10__`).
- **Automatic Migration:** Spring Boot automatically executes pending migrations on application startup.
- **ORM Mapping:** JPA entities configured with `hibernate.ddl-auto=validate` to enforce 3NF relational integrity.

---

## 14. API Documentation

CareFlow includes Swagger UI / OpenAPI 3.0 interactive documentation:
- **Swagger UI Endpoint:** `http://localhost:8080/api/v1/swagger-ui.html`
- **OpenAPI JSON Spec:** `http://localhost:8080/api/v1/v3/api-docs`

### Major API Endpoint Groups
- `/api/v1/auth/*`: Registration, JWT Login, Refresh Token, User Details
- `/api/v1/hospitals/*`: Hospital Profiles, Recommendation Engine, Geo Search
- `/api/v1/doctors/*`: Doctor Directory, Schedules, Operating Hours
- `/api/v1/appointments/*`: Booking Creation, Confirmations, Cancellations, Status Updates, QR Code PNGs
- `/api/v1/prescriptions/*`: Doctor Consultation Notes, Digital Prescription Issuance & Retrieval
- `/api/v1/health-records/*`: Patient EHR Documents, File Uploads, Consultation Summaries
- `/api/v1/notifications/*`: Unread Notification Count, Mark as Read Controls
- `/api/v1/admin/*`: System Analytics, Roster Controls, Operations Management

---

## 15. Authentication

CareFlow implements stateless JSON Web Token (JWT) security:
- **Header Structure:** `Authorization: Bearer <JWT_TOKEN>`
- **Expiration:** Access tokens expire after 24 hours; refresh tokens expire after 7 days.
- **Password Security:** All user credentials are encrypted using BCrypt hash function before persistence.
- **Session Persistence:** Tokens are securely stored in client `localStorage` with automatic header injection via Axios interceptors.

---

## 16. Google Maps Setup

CareFlow uses the Google Maps JavaScript API for hospital geographic visualizer:
1. Obtain an API key from the **Google Cloud Console** with Maps JavaScript API enabled.
2. For production deployments, configure **HTTP Referrer Restrictions** in Google Cloud Console matching your domain name.
3. Pass the key into `VITE_GOOGLE_MAPS_API_KEY` in `careflow-hero/.env.local`.
4. **Fallback Mechanism:** If no API key is provided, CareFlow automatically switches to responsive fallback cards with Haversine distance calculations (in km) without crashing.

---

## 17. Testing

CareFlow maintains full automated test coverage for backend services and frontend builds:

### Running Backend Integration Tests
```bash
cd careflow-backend
mvn clean test
```
*Note:* Backend tests execute using an in-memory H2 database profile (`application-test.yml`).

### Running Frontend Type Checking & Build Test
```bash
cd careflow-hero
npm run build
```

---

## 18. Deployment

When deploying CareFlow to production servers:
1. **Environment Secrets:** Inject `JWT_SECRET`, `DATABASE_PASSWORD`, and `GOOGLE_MAPS_API_KEY` via container environment variables or cloud secret managers.
2. **Reverse Proxy:** Place an NGINX or Cloudflare reverse proxy in front of port 8080 for SSL/TLS HTTPS termination.
3. **CORS Security:** Set `CORS_ALLOWED_ORIGINS` strictly to your production domain URL.
4. **Database Connection Pooling:** Default HikariCP settings manage automatic connection recycling and health pinging.

---

## 19. Security

CareFlow incorporates security best practices:
- **IDOR Protection:** Backend services enforce explicit Principal ownership checks (`getAppointmentByIdSecure`, `getHealthRecordByIdSecure`, `getPrescriptionByIdSecure`).
- **Role-Based Guards:** Methods annotated with `@PreAuthorize("hasRole('PATIENT')")`, `hasRole('DOCTOR')`, or `hasRole('ADMIN')`.
- **Global Error Sanitization:** `GlobalExceptionHandler` returns structured JSON error payloads and hides internal stack traces.
- **Zero Secrets Tracked:** Sensitive configuration parameters are managed via environment variables.

---

## 20. Known Limitations

- **Telehealth Video:** Current release supports offline in-person consultations. Live WebRTC video consultation rooms are scheduled for future milestone releases.
- **External SMS Gateway:** In-app notifications are stored in MySQL and served via REST API. Direct SMS delivery via external providers (e.g. Twilio) requires plugin activation.

---

## 21. Future Improvements

- **WebRTC Video Consultations:** Integrated virtual appointment rooms for remote healthcare visits.
- **Wearable Health Sync:** Automated ingestion of vital signs (heart rate, blood pressure) from smartwatch APIs.
- **Multi-Language Support (i18n):** Support for localized regional languages.
- **FHIR / HL7 EHR Export:** Standardized medical record exports compatible with hospital systems.

---

## 22. Team & Authors

CareFlow is developed and maintained by the CareFlow Engineering Team.

- **GitHub:** [https://github.com/your-username/CareFlow](https://github.com/your-username/CareFlow)
- **License:** MIT License

---

<p align="center">
  <b>CareFlow — Connecting Patients to Intelligent Healthcare.</b>
</p>
