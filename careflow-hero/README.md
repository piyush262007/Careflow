# 🏥 CareFlow — Next-Gen Healthcare Platform

CareFlow is a full-stack digital healthcare navigation platform built with **React**, **TypeScript**, **Spring Boot**, **MySQL**, and **Google Maps**.

---

## 🌟 Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, Lucide Icons, Framer Motion
- **Backend**: Java 21, Spring Boot 3.x, Spring Data JPA / Hibernate, Spring Security (JWT)
- **Database**: MySQL 8.x with Flyway database migrations
- **Location Services**: Google Maps JavaScript API, Places API, Haversine Distance Engine

---

## 🔐 Demo Accounts (Development & Demo Environment)

| Role | Email | Password | Dashboard Route |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@careflow.com` | `Patient@123` | `/patient` |
| **Doctor** | `doctor@careflow.com` | `Doctor@123` | `/doctor` |
| **Admin** | `admin@careflow.com` | `Admin@123` | `/hospitals` |

---

## ⚙️ Environment Variables

### Frontend (`careflow-hero/.env.local`)
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### Backend (`careflow-backend/src/main/resources/application.yml` or OS Environment)
```env
DATABASE_URL=jdbc:mysql://localhost:3306/careflow_db?useSSL=false&serverTimezone=UTC
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
JWT_SECRET=GENERATE_A_SECURE_SECRET_MIN_256_BITS
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## 🚀 Running CareFlow Locally

### 1. Backend Startup (Spring Boot)
```bash
cd careflow-backend
mvn spring-boot:run
```
*Backend runs at: `http://localhost:8080/api/v1`*  
*Swagger API Docs: `http://localhost:8080/api/v1/swagger-ui.html`*

### 2. Frontend Startup (Vite Dev Server)
```bash
cd careflow-hero
npm install
cmd /c npm run dev
```
*Frontend runs at: `http://localhost:5173/`*

---

## 🧪 Production Build Commands

```bash
# Frontend Build
cd careflow-hero
npm run build

# Backend Build
cd careflow-backend
mvn clean package
```
