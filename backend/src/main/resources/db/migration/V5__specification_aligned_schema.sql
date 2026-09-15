-- CareFlow V5 Complete Schema Migration aligned to Senior Architect Specification

-- 1. Align Patients Table Columns
ALTER TABLE patients ADD COLUMN height_cm DECIMAL(5,2);
ALTER TABLE patients ADD COLUMN weight_kg DECIMAL(5,2);

-- 2. Align Hospitals Table Columns & Indexes
ALTER TABLE hospitals ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

CREATE INDEX idx_hospital_name ON hospitals(name);
CREATE INDEX idx_hospital_geo ON hospitals(latitude, longitude);

-- 3. Align Doctors Table Columns & Indexes
ALTER TABLE doctors ADD COLUMN user_id BIGINT UNIQUE;
ALTER TABLE doctors ADD CONSTRAINT fk_doctor_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_doctor_status ON doctors(status);

-- 4. Align Doctor Schedules Table Columns & Indexes
ALTER TABLE doctor_schedules ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX idx_schedule_day_doctor ON doctor_schedules(day_of_week, doctor_id);

-- 5. Align Appointments Table Columns & Indexes
ALTER TABLE appointments ADD COLUMN appointment_reference VARCHAR(100) UNIQUE;

-- Add Unique Constraint to prevent double-booking on same doctor, date & time slot
ALTER TABLE appointments ADD CONSTRAINT uk_doctor_appointment_slot UNIQUE (doctor_id, appointment_date, appointment_time, status);

CREATE INDEX idx_appointment_hospital ON appointments(hospital_id);
CREATE INDEX idx_appointment_date ON appointments(appointment_date);

-- 6. Align AI Consultations Table Columns & Indexes
CREATE TABLE IF NOT EXISTS ai_consultations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    symptoms TEXT NOT NULL,
    pain_level VARCHAR(30),
    duration VARCHAR(100),
    predicted_department VARCHAR(150),
    severity VARCHAR(30),
    confidence_score INT NOT NULL,
    recommended_hospital_id BIGINT NULL,
    recommended_doctor_id BIGINT NULL,
    recommendation_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aiconsultation_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_aiconsultation_hospital FOREIGN KEY (recommended_hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL,
    CONSTRAINT fk_aiconsultation_doctor FOREIGN KEY (recommended_doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    INDEX idx_aiconsultation_patient (patient_id),
    INDEX idx_aiconsultation_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Align Notifications Table Columns & Indexes
CREATE INDEX idx_notification_user ON notifications(user_id);

-- 8. Health Records Table
CREATE TABLE IF NOT EXISTS health_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_name VARCHAR(255),
    file_url VARCHAR(500),
    file_type VARCHAR(100),
    file_size BIGINT,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_healthrecord_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    INDEX idx_healthrecord_patient (patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Medical History Table
CREATE TABLE IF NOT EXISTS medical_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    condition_name VARCHAR(200) NOT NULL,
    description TEXT,
    diagnosed_date DATE,
    status VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    CONSTRAINT fk_medhistory_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    INDEX idx_medhistory_patient (patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. QR Codes Table
CREATE TABLE IF NOT EXISTS qr_codes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_id BIGINT NOT NULL UNIQUE,
    qr_token VARCHAR(255) NOT NULL UNIQUE,
    file_path VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    expires_at TIMESTAMP NULL,
    CONSTRAINT fk_qrcode_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Refresh Tokens Table (Secure Token Hash)
ALTER TABLE refresh_tokens ADD COLUMN token_hash VARCHAR(255) UNIQUE;

-- 12. Hospital Live Status Table (CareFlow Signature Queue & ER Status Feature)
CREATE TABLE IF NOT EXISTS hospital_live_status (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hospital_id BIGINT NOT NULL UNIQUE,
    current_queue INT NOT NULL DEFAULT 0,
    estimated_wait_minutes INT NOT NULL DEFAULT 0,
    available_beds INT DEFAULT 0,
    icu_beds_available INT DEFAULT 0,
    emergency_status VARCHAR(30) DEFAULT 'AVAILABLE',
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    CONSTRAINT fk_livestatus_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
    INDEX idx_livestatus_hospital (hospital_id),
    INDEX idx_livestatus_updated (last_updated)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id BIGINT,
    ip_address VARCHAR(100),
    details TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auditlog_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_auditlog_user (user_id),
    INDEX idx_auditlog_action (action),
    INDEX idx_auditlog_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
