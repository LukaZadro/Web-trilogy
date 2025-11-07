-- Enable foreign keys
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_type TEXT CHECK(user_type IN ('student', 'alumni', 'studentska organizacija', 'poslodavac','admin')) NOT NULL
);

CREATE TABLE IF NOT EXISTS job_postings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    job_type TEXT CHECK(job_type IN ('posao', 'studentski-posao', 'internship')) NOT NULL,
    application_deadline DATE,
    contact_email VARCHAR(255),
    is_active BOOLEAN DEFAULT 1,
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );


CREATE TABLE IF NOT EXISTS student_organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS student_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(100),
    organizer_id INTEGER,
    organizer_type TEXT CHECK(organizer_type IN ('organization', 'college', 'company')) DEFAULT 'college',
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    location VARCHAR(255),
    max_attendees INTEGER,
    is_public BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES student_organizations(id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_posting_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
    cover_letter TEXT,
    FOREIGN KEY (job_posting_id) REFERENCES job_postings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_job_postings_active ON job_postings(is_active, application_deadline);
CREATE INDEX IF NOT EXISTS idx_job_applications_user ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_events_datetime ON student_events(start_datetime);