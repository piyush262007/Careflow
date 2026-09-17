-- CareFlow V8 Migration: Update Seeded User Passwords to Valid BCrypt Hashes
-- Credentials:
-- admin@careflow.com   -> Admin123!
-- doctor@careflow.com  -> Doctor123!
-- patient@careflow.com -> Patient123!

UPDATE users 
SET password = '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a' 
WHERE email = 'admin@careflow.com';

UPDATE users 
SET password = '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a' 
WHERE email = 'doctor@careflow.com';

UPDATE users 
SET password = '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a' 
WHERE email = 'patient@careflow.com';
