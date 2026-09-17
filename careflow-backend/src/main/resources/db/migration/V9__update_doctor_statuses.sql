-- CareFlow V9 Migration: Update Doctor Status to ACTIVE for Appointment Booking Compatibility
UPDATE doctors SET status = 'ACTIVE' WHERE status = 'AVAILABLE' OR status IS NULL OR status = '';
