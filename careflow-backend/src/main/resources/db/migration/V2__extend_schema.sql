-- CareFlow V2 Extension Migration

ALTER TABLE doctor_schedules CHANGE COLUMN slot_duration slot_duration_minutes INT NOT NULL DEFAULT 15;

ALTER TABLE appointments ADD COLUMN notes TEXT AFTER symptoms;

ALTER TABLE appointments CHANGE COLUMN qr_pass_token qr_code VARCHAR(100) NOT NULL UNIQUE;
