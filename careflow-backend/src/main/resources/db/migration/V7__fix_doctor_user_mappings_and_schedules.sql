-- Flyway Migration V7: Fix Doctor User Mappings and Expand Doctor Schedules

-- 1. Link Dr. Sarah Chen (Doctor ID 1) to User 2 (doctor@careflow.com)
UPDATE doctors SET user_id = 2 WHERE id = 1 AND (user_id IS NULL OR user_id = 0);

-- 2. Insert active schedules for Doctor 1 for remaining days of week
INSERT IGNORE INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, is_active, created_at, updated_at) VALUES
(1, 'SATURDAY', '09:00:00', '14:00:00', 15, 15, 0, TRUE, NOW(), NOW()),
(1, 'SUNDAY', '10:00:00', '13:00:00', 15, 10, 0, TRUE, NOW(), NOW());

-- 3. Insert active schedules for Doctor 2 (Dr. Marcus Vance)
INSERT IGNORE INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, is_active, created_at, updated_at) VALUES
(2, 'TUESDAY', '10:00:00', '16:00:00', 20, 15, 0, TRUE, NOW(), NOW()),
(2, 'THURSDAY', '10:00:00', '16:00:00', 20, 15, 0, TRUE, NOW(), NOW()),
(2, 'FRIDAY', '10:00:00', '16:00:00', 20, 15, 0, TRUE, NOW(), NOW()),
(2, 'SATURDAY', '09:00:00', '13:00:00', 20, 10, 0, TRUE, NOW(), NOW()),
(2, 'SUNDAY', '09:00:00', '12:00:00', 20, 8, 0, TRUE, NOW(), NOW());

-- 4. Insert active schedules for Doctor 3 (Dr. Elena Rostova)
INSERT IGNORE INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, is_active, created_at, updated_at) VALUES
(3, 'MONDAY', '08:30:00', '15:30:00', 15, 25, 0, TRUE, NOW(), NOW()),
(3, 'WEDNESDAY', '08:30:00', '15:30:00', 15, 25, 0, TRUE, NOW(), NOW()),
(3, 'FRIDAY', '08:30:00', '15:30:00', 15, 25, 0, TRUE, NOW(), NOW()),
(3, 'SATURDAY', '08:30:00', '13:00:00', 15, 15, 0, TRUE, NOW(), NOW()),
(3, 'SUNDAY', '09:00:00', '12:00:00', 15, 10, 0, TRUE, NOW(), NOW());

-- 5. Insert active schedules for Doctor 4 (Dr. Jonathan Hayes)
INSERT IGNORE INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, is_active, created_at, updated_at) VALUES
(4, 'MONDAY', '09:00:00', '17:00:00', 30, 12, 0, TRUE, NOW(), NOW()),
(4, 'TUESDAY', '09:00:00', '17:00:00', 30, 12, 0, TRUE, NOW(), NOW()),
(4, 'WEDNESDAY', '09:00:00', '17:00:00', 30, 12, 0, TRUE, NOW(), NOW()),
(4, 'THURSDAY', '09:00:00', '17:00:00', 30, 12, 0, TRUE, NOW(), NOW()),
(4, 'FRIDAY', '09:00:00', '17:00:00', 30, 12, 0, TRUE, NOW(), NOW()),
(4, 'SATURDAY', '09:00:00', '14:00:00', 30, 8, 0, TRUE, NOW(), NOW()),
(4, 'SUNDAY', '10:00:00', '13:00:00', 30, 5, 0, TRUE, NOW(), NOW());

-- 6. Insert active schedules for Doctor 5 (Dr. Priya Patel)
INSERT IGNORE INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, is_active, created_at, updated_at) VALUES
(5, 'MONDAY', '08:00:00', '16:00:00', 20, 20, 0, TRUE, NOW(), NOW()),
(5, 'TUESDAY', '08:00:00', '16:00:00', 20, 20, 0, TRUE, NOW(), NOW()),
(5, 'WEDNESDAY', '08:00:00', '16:00:00', 20, 20, 0, TRUE, NOW(), NOW()),
(5, 'THURSDAY', '08:00:00', '16:00:00', 20, 20, 0, TRUE, NOW(), NOW()),
(5, 'FRIDAY', '08:00:00', '16:00:00', 20, 20, 0, TRUE, NOW(), NOW()),
(5, 'SATURDAY', '09:00:00', '13:00:00', 20, 10, 0, TRUE, NOW(), NOW()),
(5, 'SUNDAY', '09:00:00', '12:00:00', 20, 8, 0, TRUE, NOW(), NOW());
