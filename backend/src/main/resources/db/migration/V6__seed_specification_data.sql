-- CareFlow Production Seed Data for Specification Compliance

-- Seed Specializations lookup data
INSERT IGNORE INTO specializations (id, name, description) VALUES
(1, 'General Medicine', 'Comprehensive primary care and internal health management'),
(2, 'Cardiology', 'Heart health, cardiovascular diseases, and vascular care'),
(3, 'Neurology', 'Brain, spinal cord, and peripheral nervous system disorders'),
(4, 'Dermatology', 'Skin, hair, nail conditions, and aesthetic care'),
(5, 'Orthopedics', 'Musculoskeletal system, bone fractures, and joint surgeries'),
(6, 'Pediatrics', 'Infant, child, and adolescent healthcare'),
(7, 'ENT', 'Ear, nose, and throat diagnostic and surgical care'),
(8, 'Ophthalmology', 'Eye care, vision correction, and ocular surgery'),
(9, 'Gynecology', 'Female reproductive system and maternity care'),
(10, 'Psychiatry', 'Mental health, behavioral wellness, and therapy'),
(11, 'Pulmonology', 'Lungs and respiratory system management'),
(12, 'Gastroenterology', 'Digestive tract, stomach, and liver medical care');

-- Seed Hospital Live Queue Status for seeded hospitals
INSERT IGNORE INTO hospital_live_status (id, hospital_id, current_queue, estimated_wait_minutes, available_beds, icu_beds_available, emergency_status, last_updated) VALUES
(1, 1, 3, 12, 24, 5, 'AVAILABLE', NOW()),
(2, 2, 8, 25, 12, 2, 'BUSY', NOW()),
(3, 3, 1, 5, 30, 8, 'AVAILABLE', NOW()),
(4, 4, 14, 45, 4, 0, 'CRITICAL', NOW());

-- Seed Demo Patient Medical History
INSERT IGNORE INTO medical_history (id, patient_id, condition_name, description, diagnosed_date, status, created_at, updated_at) VALUES
(1, 1, 'Mild Asthma', 'Carries rescue inhaler, mild exercise-induced bronchospasm', '2022-04-15', 'ACTIVE', NOW(), NOW()),
(2, 1, 'Seasonal Rhinitis', 'Allergic reaction to spring pollen', '2023-03-10', 'MANAGED', NOW(), NOW());

-- Seed Demo Patient Health Records
INSERT IGNORE INTO health_records (id, patient_id, title, description, file_name, file_url, file_type, file_size, uploaded_at) VALUES
(1, 1, 'Routine ECG Diagnostic Report', 'Normal sinus rhythm, 72 bpm', 'ecg_report_sarah.pdf', '/uploads/records/ecg_report_sarah.pdf', 'application/pdf', 1024500, NOW());
