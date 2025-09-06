-- MySQL Database Schema for Smart Job Tracker & Resume Optimizer

-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS smart-job-tracker-resume-optimizer;

-- Use the newly created or existing database
USE smart-job-tracker-resume-optimizer;

-- Drop tables if they exist to allow for clean re-creation during development
-- Order matters due to foreign key constraints, so drop child tables first.
DROP TABLE IF EXISTS ai_match_reports;
DROP TABLE IF EXISTS mock_interview_questions;
DROP TABLE IF EXISTS mock_interviews;
DROP TABLE IF EXISTS application_interview_dates;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS cvs;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;

---

-- 1. `users` Table
-- Stores user accounts, including job seekers and recruiters, with authentication and integration tokens.
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Stores the hashed password for local authentication
    google_id VARCHAR(255) UNIQUE, -- For Google OAuth users (can be NULL, unique if not NULL)
    linkedin_id VARCHAR(255) UNIQUE, -- For LinkedIn OAuth (can be NULL, unique if not NULL)
    role ENUM('job_seeker', 'recruiter') NOT NULL, -- Defines user role
    name VARCHAR(255),
    profile_picture_url VARCHAR(2048), -- URL to user's profile picture
    google_access_token VARCHAR(2048), -- Sensitive token, store securely
    google_refresh_token VARCHAR(2048), -- Sensitive token, store securely
    google_calendar_id VARCHAR(255), -- User's default Google Calendar ID
    linkedin_access_token VARCHAR(2048),
    indeed_access_token VARCHAR(2048),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

---

-- 2. `jobs` Table
-- Manages job postings, either posted by recruiters or imported via scraping/APIs.
CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recruiter_id INT, -- Foreign Key to users table (can be NULL if scraped)
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL, -- Use LONGTEXT for potentially very large job descriptions
    external_url VARCHAR(2048), -- URL to the original job posting
    source ENUM('internal', 'linkedin', 'indeed', 'other_scraper', 'manual') NOT NULL, -- Origin of the job post
    posted_date DATETIME,
    application_deadline DATETIME,
    is_active BOOLEAN DEFAULT TRUE, -- For recruiters to manage job visibility
    ai_score_threshold INT CHECK (ai_score_threshold >= 0 AND ai_score_threshold <= 100), -- Minimum AI score for suitable applicants
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE SET NULL -- If recruiter deleted, job remains but recruiter_id set to NULL
);

---

-- 3. `cvs` Table
-- Stores resume content and metadata. Each CV belongs to a specific user.
CREATE TABLE cvs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Foreign Key to users table
    name VARCHAR(255) NOT NULL, -- User-defined name for the CV
    content TEXT NOT NULL, -- The full text content of the CV
    file_path VARCHAR(2048), -- URL or path if stored externally (e.g., Google Drive)
    google_drive_file_id VARCHAR(255), -- ID if stored in Google Drive
    last_optimized_for_job_id INT, -- Foreign Key to jobs table (optional: job it was last optimized against)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- If user deleted, delete their CVs
    FOREIGN KEY (last_optimized_for_job_id) REFERENCES jobs(id) ON DELETE SET NULL -- If job deleted, set this to NULL
);

---

-- 4. `applications` Table
-- Tracks each specific application a job seeker makes for a job using a particular CV.
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Foreign Key to users table (job seeker)
    job_id INT NOT NULL,  -- Foreign Key to jobs table
    cv_id INT NOT NULL,   -- Foreign Key to cvs table (the specific CV used for this application)
    status ENUM('applied', 'interviewing', 'rejected', 'offered', 'accepted', 'withdrawn') NOT NULL DEFAULT 'applied', -- Tracking states
    applied_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    ai_match_score INT CHECK (ai_match_score >= 0 AND ai_match_score <= 100), -- GPT-4 assessed match score
    ai_match_feedback TEXT, -- GPT-4's suggestions for improvement for this specific application
    follow_up_email_sent_date DATETIME, -- Timestamp of the last follow-up email sent
    notes TEXT, -- General user notes for this application
    rejection_reason TEXT, -- If status is 'rejected'
    offer_salary DECIMAL(10, 2), -- If status is 'offered' / 'accepted'
    offer_benefits TEXT,
    offer_start_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    UNIQUE (user_id, job_id, cv_id) -- Ensures a user applies to a specific job with a specific CV only once
);

---

-- 5. `application_interview_dates` Table
-- Stores individual interview dates for a specific application, linked by a foreign key.
CREATE TABLE application_interview_dates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL, -- Foreign Key to applications table
    interview_date DATETIME NOT NULL,
    type ENUM('initial', 'technical', 'hr', 'onsite'), -- Type of interview
    google_calendar_event_id VARCHAR(255), -- ID of the event in Google Calendar
    notes TEXT, -- Specific notes for this interview
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

---

-- 6. `mock_interviews` Table
-- Stores the high-level details of AI-powered mock interviews.
CREATE TABLE mock_interviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Foreign Key to users table (the user who took the interview)
    job_id INT NOT NULL, -- Foreign Key to jobs table (Job Description context for the interview)
    cv_id INT NOT NULL, -- Foreign Key to cvs table (CV context for the interview)
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    overall_ai_score INT CHECK (overall_ai_score >= 0 AND overall_ai_score <= 100),
    overall_ai_feedback TEXT,
    status ENUM('started', 'in_progress', 'completed', 'canceled') NOT NULL DEFAULT 'started',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE
);

---

-- 7. `mock_interview_questions` Table
-- Stores individual questions and user answers for a specific mock interview.
CREATE TABLE mock_interview_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mock_interview_id INT NOT NULL, -- Foreign Key to mock_interviews table
    question_text TEXT NOT NULL,
    ai_generated_ideal_answer TEXT, -- AI's ideal answer for reference
    user_answer TEXT, -- The user's transcribed/typed answer
    ai_feedback TEXT, -- GPT-4's specific feedback on the user's answer
    ai_score INT CHECK (ai_score >= 0 AND ai_score <= 100), -- Score for this specific question
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mock_interview_id) REFERENCES mock_interviews(id) ON DELETE CASCADE
);

---

-- 8. `ai_match_reports` Table (Optional but recommended for detailed history)
-- Stores comprehensive AI analysis reports between a CV and a Job Description.
CREATE TABLE ai_match_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT UNIQUE NOT NULL, -- Foreign Key to applications table (one report per application)
    cv_id INT NOT NULL, -- Foreign Key to cvs table
    job_id INT NOT NULL, -- Foreign Key to jobs table
    report_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    match_score INT NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    feedback_summary TEXT,
    detailed_feedback LONGTEXT, -- Use LONGTEXT for very detailed feedback
    suggested_keywords TEXT, -- Store as comma-separated string or JSON string
    suggested_skills TEXT, -- Store as comma-separated string or JSON string
    raw_ai_response JSON, -- MySQL 5.7+ supports JSON data type natively
    report_version INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);