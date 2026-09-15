-- CareFlow V3 Seed Data Script

-- 1. Insert Initial Users
INSERT INTO users (id, full_name, email, password, role, enabled, created_at, updated_at) VALUES
(1, 'CareFlow System Admin', 'admin@careflow.com', '$2a$10$7ZkQ6e/u3c6h34E7L3.1U.8k7tH0jJ.wW5gW70kL3wW5gW70kL3wW', 'ADMIN', true, NOW(), NOW()),
(2, 'Dr. Sarah Chen', 'doctor@careflow.com', '$2a$10$7ZkQ6e/u3c6h34E7L3.1U.8k7tH0jJ.wW5gW70kL3wW5gW70kL3wW', 'DOCTOR', true, NOW(), NOW()),
(3, 'Sarah Jenkins', 'patient@careflow.com', '$2a$10$7ZkQ6e/u3c6h34E7L3.1U.8k7tH0jJ.wW5gW70kL3wW5gW70kL3wW', 'PATIENT', true, NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;

-- 2. Insert Patient Profile
INSERT INTO patients (id, user_id, phone, gender, blood_group, date_of_birth, height, weight, address, emergency_contact_name, emergency_contact_phone, allergies, medical_history, created_at, updated_at) VALUES
(1, 3, '+1 (555) 234-5678', 'FEMALE', 'O+', '1992-05-14', 168.0, 62.5, '742 Evergreen Terrace, San Francisco, CA', 'David Jenkins (Spouse)', '+1 (555) 987-6543', 'Penicillin, Peanuts', 'Mild Asthma', NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;

-- 3. Insert 20 Specializations
INSERT INTO specializations (id, name, description, created_at, updated_at) VALUES
(1, 'Cardiology', 'Heart and cardiovascular system care', NOW(), NOW()),
(2, 'Neurology', 'Brain and nervous system disorders', NOW(), NOW()),
(3, 'Pediatrics', 'Comprehensive healthcare for infants, children, and adolescents', NOW(), NOW()),
(4, 'Orthopedics', 'Bone, joint, and musculoskeletal surgical care', NOW(), NOW()),
(5, 'Dermatology', 'Skin, hair, and nail clinical treatment', NOW(), NOW()),
(6, 'Gastroenterology', 'Digestive system and gastrointestinal medical care', NOW(), NOW()),
(7, 'Oncology', 'Cancer diagnosis, chemotherapy, and radiation therapy', NOW(), NOW()),
(8, 'Ophthalmology', 'Eye care and ophthalmic surgical treatment', NOW(), NOW()),
(9, 'Psychiatry', 'Mental health and behavioral psychiatric therapy', NOW(), NOW()),
(10, 'Emergency ER', '24/7 Trauma Level I emergency medicine', NOW(), NOW()),
(11, 'Internal Medicine', 'Adult disease prevention and non-surgical treatment', NOW(), NOW()),
(12, 'Neurosurgery', 'Surgical intervention for brain and spine disorders', NOW(), NOW()),
(13, 'Pulmonology', 'Respiratory and pulmonary lung care', NOW(), NOW()),
(14, 'Endocrinology', 'Hormonal and metabolic disorder treatment', NOW(), NOW()),
(15, 'Urology', 'Urinary tract and male reproductive system medicine', NOW(), NOW()),
(16, 'Gynecology', 'Women reproductive health and obstetric care', NOW(), NOW()),
(17, 'ENT (Otolaryngology)', 'Ear, nose, and throat clinical surgery', NOW(), NOW()),
(18, 'Rheumatology', 'Autoimmune and joint inflammatory disease care', NOW(), NOW()),
(19, 'Nephrology', 'Kidney function and renal medicine', NOW(), NOW()),
(20, 'Urgent Care', 'Immediate walk-in medical evaluation', NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;

-- 4. Insert 10 Hospitals
INSERT INTO hospitals (id, name, description, address, city, state, pincode, latitude, longitude, phone, email, website, rating, total_reviews, emergency_available, is_open_24_hours, image_url, created_at, updated_at) VALUES
(1, 'St. Jude Central Medical Center', 'Premier tertiary care hospital featuring Level I Trauma ER and Advanced Cardiology Suite.', '742 Evergreen Terrace, Downtown District', 'San Francisco', 'CA', '94102', 37.7749, -122.4194, '+1 (555) 234-8901', 'info@stjude-center.org', 'https://stjude-center.org', 4.9, 428, true, true, 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(2, 'Metro Care Health Pavilion', 'Modern healthcare facility providing comprehensive Urgent Care and Outpatient Surgery.', '1200 Grand Avenue, Westside Plaza', 'San Francisco', 'CA', '94109', 37.7833, -122.4167, '+1 (555) 876-5432', 'contact@metrocare.health', 'https://metrocare.health', 4.8, 312, true, true, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(3, 'Northwest Specialty Surgical Clinic', 'State-of-the-art orthopedics and neurosurgery center with robot-assisted surgical operating rooms.', '450 University Blvd, Suite 300', 'San Francisco', 'CA', '94118', 37.7651, -122.4241, '+1 (555) 345-6789', 'care@northwestsurgical.org', 'https://northwestsurgical.org', 4.9, 215, true, true, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(4, 'Valley Children & Family Hospital', 'Dedicated pediatric emergency and neonatal intensive care unit serving Bay Area families.', '880 Valley Care Parkway, East District', 'San Francisco', 'CA', '94107', 37.7512, -122.4089, '+1 (555) 901-2345', 'family@valleychildrens.health', 'https://valleychildrens.health', 4.9, 512, true, true, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(5, 'Golden Gate Heart & Vascular Institute', 'Specialized cardiovascular research and interventional catheterization center.', '300 Embarcadero Center, Financial District', 'San Francisco', 'CA', '94111', 37.7952, -122.3995, '+1 (555) 456-7890', 'info@goldengateheart.com', 'https://goldengateheart.com', 4.9, 340, true, true, 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(6, 'Bay Area General Hospital', 'Community general hospital offering primary care, internal medicine, and radiology.', '550 Mission Street, SoMa', 'San Francisco', 'CA', '94105', 37.7891, -122.4012, '+1 (555) 567-8901', 'support@bayareageneral.org', 'https://bayareageneral.org', 4.7, 198, false, false, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(7, 'Pacific Neuroscience Center', 'Comprehensive brain, spine, and stroke treatment center with neuro-ICU.', '100 Van Ness Ave, Civic Center', 'San Francisco', 'CA', '94102', 37.7765, -122.4182, '+1 (555) 678-9012', 'appointments@pacificneuro.org', 'https://pacificneuro.org', 4.9, 280, true, true, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(8, 'Sunset District Health Center', 'Outpatient clinic providing family medicine, dermatology, and preventative wellness.', '2200 Irving Street, Sunset District', 'San Francisco', 'CA', '94122', 37.7634, -122.4812, '+1 (555) 789-0123', 'clinic@sunsethealth.org', 'https://sunsethealth.org', 4.6, 145, false, false, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(9, 'Mission Community Clinic', 'Multilingual community medical center providing urgent care and pediatric health.', '1800 Mission Street, Mission District', 'San Francisco', 'CA', '94103', 37.7682, -122.4199, '+1 (555) 890-1234', 'care@missioncommunity.org', 'https://missioncommunity.org', 4.8, 230, true, false, 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', NOW(), NOW()),
(10, 'Marina Wellness Medical Center', 'Comprehensive women health, endocrinology, and sports medicine facility.', '3300 Fillmore Street, Marina District', 'San Francisco', 'CA', '94123', 37.8012, -122.4367, '+1 (555) 901-2345', 'wellness@marinamedical.org', 'https://marinamedical.org', 4.9, 310, false, true, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;

-- 5. Insert Doctor Specialists
INSERT INTO doctors (id, hospital_id, specialization_id, full_name, qualification, experience_years, consultation_fee, phone, email, profile_image, bio, consultation_mode, status, created_at, updated_at) VALUES
(1, 1, 1, 'Dr. Sarah Chen', 'MD, FACC - Harvard Medical School', 14, 150.00, '+1 (555) 234-8901', 'sarah.chen@careflow.health', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', 'Senior Chief of Cardiology specializing in interventional catheterization and preventive cardiac health.', 'IN_PERSON', 'AVAILABLE', NOW(), NOW()),
(2, 1, 2, 'Dr. Marcus Vance', 'MD, PhD - Johns Hopkins University', 18, 175.00, '+1 (555) 234-8902', 'marcus.vance@careflow.health', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', 'Consultant Neurologist specializing in stroke management, epilepsy, and neurodegenerative disorders.', 'IN_PERSON', 'AVAILABLE', NOW(), NOW()),
(3, 2, 4, 'Dr. Elena Rostova', 'MD - Stanford University School of Medicine', 12, 140.00, '+1 (555) 876-5432', 'elena.rostova@careflow.health', 'https://images.unsplash.com/photo-1594824813566-88855ce78907?auto=format&fit=crop&w=400&q=80', 'Orthopedic Surgeon specializing in joint replacement, arthroscopic surgery, and sports trauma.', 'IN_PERSON', 'AVAILABLE', NOW(), NOW()),
(4, 3, 12, 'Dr. Jonathan Hayes', 'MD, FACS - Columbia University', 20, 200.00, '+1 (555) 345-6789', 'jonathan.hayes@careflow.health', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', 'Lead Neurosurgeon pioneering minimally invasive spine procedures and brain tumor resection.', 'IN_PERSON', 'AVAILABLE', NOW(), NOW()),
(5, 4, 3, 'Dr. Priya Patel', 'MD, FAAP - UCSF Medical Center', 10, 120.00, '+1 (555) 901-2345', 'priya.patel@careflow.health', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', 'Pediatric Specialist dedicated to child growth development, immunizations, and pediatric emergency care.', 'IN_PERSON', 'AVAILABLE', NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;

-- 6. Insert Doctor Schedules
INSERT INTO doctor_schedules (id, doctor_id, day_of_week, start_time, end_time, slot_duration_minutes, max_appointments, current_appointments, created_at, updated_at) VALUES
(1, 1, 'MONDAY', '09:00:00', '17:00:00', 15, 20, 2, NOW(), NOW()),
(2, 1, 'TUESDAY', '09:00:00', '17:00:00', 15, 20, 1, NOW(), NOW()),
(3, 1, 'WEDNESDAY', '09:00:00', '17:00:00', 15, 20, 0, NOW(), NOW()),
(4, 1, 'THURSDAY', '09:00:00', '17:00:00', 15, 20, 0, NOW(), NOW()),
(5, 1, 'FRIDAY', '09:00:00', '17:00:00', 15, 20, 0, NOW(), NOW()),
(6, 2, 'MONDAY', '10:00:00', '16:00:00', 20, 15, 0, NOW(), NOW()),
(7, 2, 'WEDNESDAY', '10:00:00', '16:00:00', 20, 15, 0, NOW(), NOW()),
(8, 3, 'TUESDAY', '08:30:00', '15:30:00', 15, 25, 0, NOW(), NOW()),
(9, 3, 'THURSDAY', '08:30:00', '15:30:00', 15, 25, 0, NOW(), NOW())
ON DUPLICATE KEY UPDATE id=id;
