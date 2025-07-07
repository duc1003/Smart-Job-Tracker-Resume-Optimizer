-- Create database
CREATE DATABASE IF NOT EXISTS smart_job_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_job_tracker;

-- Drop existing tables in proper order
DROP TABLE IF EXISTS oauth_accounts, ai_match_reports, mock_interview_questions, mock_interviews, application_interview_dates, applications, cv_skills, skills, cvs, jobs, users;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255),
    profile_picture_url VARCHAR(2048),
    role ENUM('job_seeker', 'recruiter') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON users(email);

-- OAUTH ACCOUNTS
CREATE TABLE oauth_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    provider ENUM('google', 'linkedin', 'indeed') NOT NULL,
    provider_user_id VARCHAR(255),
    access_token TEXT,
    refresh_token TEXT,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- JOBS
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recruiter_id INT,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    location VARCHAR(255),
    description LONGTEXT,
    external_url VARCHAR(2048),
    source ENUM('internal', 'linkedin', 'indeed', 'other_scraper', 'manual'),
    posted_date DATETIME,
    application_deadline DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    ai_score_threshold INT CHECK (ai_score_threshold BETWEEN 0 AND 100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE SET NULL
);

-- CVS
CREATE TABLE cvs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255),
    content TEXT NOT NULL,
    file_path VARCHAR(2048),
    google_drive_file_id VARCHAR(255),
    last_optimized_for_job_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (last_optimized_for_job_id) REFERENCES jobs(id) ON DELETE SET NULL
);

-- SKILLS (standardized)
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE cv_skills (
    cv_id INT,
    skill_id INT,
    PRIMARY KEY (cv_id, skill_id),
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- APPLICATIONS
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    cv_id INT NOT NULL,
    status ENUM('applied', 'interviewing', 'rejected', 'offered', 'accepted', 'withdrawn') DEFAULT 'applied',
    applied_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    ai_match_score INT CHECK (ai_match_score BETWEEN 0 AND 100),
    ai_match_feedback TEXT,
    follow_up_email_sent_date DATETIME,
    notes TEXT,
    rejection_reason TEXT,
    offer_salary DECIMAL(10, 2),
    offer_benefits TEXT,
    offer_start_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (user_id, job_id, cv_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE
);

-- INTERVIEW DATES
CREATE TABLE application_interview_dates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    interview_date DATETIME NOT NULL,
    type ENUM('initial', 'technical', 'hr', 'onsite'),
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    result ENUM('pass', 'fail', 'pending') DEFAULT 'pending',
    google_calendar_event_id VARCHAR(255),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- MOCK INTERVIEWS
CREATE TABLE mock_interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    cv_id INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    overall_ai_score INT CHECK (overall_ai_score BETWEEN 0 AND 100),
    overall_ai_feedback TEXT,
    status ENUM('started', 'in_progress', 'completed', 'cancelled') DEFAULT 'started',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE
);

-- MOCK INTERVIEW QUESTIONS
CREATE TABLE mock_interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mock_interview_id INT NOT NULL,
    question_text TEXT,
    ai_generated_ideal_answer TEXT,
    user_answer TEXT,
    ai_feedback TEXT,
    ai_score INT CHECK (ai_score BETWEEN 0 AND 100),
    FOREIGN KEY (mock_interview_id) REFERENCES mock_interviews(id) ON DELETE CASCADE
);

-- AI MATCH REPORTS
CREATE TABLE ai_match_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT UNIQUE NOT NULL,
    cv_id INT NOT NULL,
    job_id INT NOT NULL,
    report_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    match_score INT CHECK (match_score BETWEEN 0 AND 100),
    feedback_summary TEXT,
    detailed_feedback LONGTEXT,
    suggested_keywords TEXT,
    suggested_skills TEXT,
    raw_ai_response JSON,
    report_version INT DEFAULT 1,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
