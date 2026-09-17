-- CareFlow V10 Schema Migration: Extend Prescriptions and Consultation Fields

ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS symptoms TEXT AFTER doctor_id;
ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS recommendations TEXT AFTER notes;
ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS follow_up_instructions VARCHAR(255) AFTER recommendations;

ALTER TABLE prescription_items ADD COLUMN IF NOT EXISTS instructions VARCHAR(255) AFTER timing;
