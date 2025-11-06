const sqlite3 = require('sqlite3').verbose();
const path = require('path');


//OPREZ!!! NEMA PASSWORD HASHINGA I OSTALE SIGURNOSNE MJERE U OVOM KODU. SAMO JE PRIMJER.
class Database {
    constructor(dbPath = './database.db') {
        this.dbPath = dbPath;
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    resolve();
                }
            });
        });
    }

    async initialize() {
        await this.connect();
        const schemaSQL = `
            ${this.getSchemaSQL()}
        `;
        
        return new Promise((resolve, reject) => {
            this.db.exec(schemaSQL, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database schema initialized');
                    resolve();
                }
            });
        });
    }

    getSchemaSQL() {
        return `
            
        `;
    }

    // User management methods
    async createUser(userData) {
        const {
            email,
            password,
            firstName,
            lastName,
            userType
        } = userData;


        const sql = `
            INSERT INTO users (email, password, first_name, last_name,user_type)
            VALUES (?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [email, password, firstName, lastName,userType], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    async createStudent(studentData) {
        const sql = `
            INSERT INTO students (user_id, student_id_number, major)
            VALUES (?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [
                studentData.userId,
                studentData.studentIdNumber,
                studentData.major
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    async createAlumni(alumniData) {
        const sql = `
            INSERT INTO alumni (user_id, graduation_year, degree, major, current_job_title, linkedin_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [
                alumniData.userId,
                alumniData.graduationYear,
                alumniData.degree,
                alumniData.major,
                alumniData.currentJobTitle,
                alumniData.linkedinUrl
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Company methods
    async createCompany(companyData) {
        const sql = `
            INSERT INTO companies (name, description, industry,email, phone, address)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [
                companyData.name,
                companyData.description,
                companyData.industry,
                companyData.websiteUrl,
                companyData.email,
                companyData.phone,
                companyData.address
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Job posting methods
    async createJobPosting(jobData) {
        const sql = `
            INSERT INTO job_postings (
                company_id, title, description, requirements, job_type, 
                location, salary_range, application_deadline, contact_email
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [
                jobData.companyId,
                jobData.title,
                jobData.description,
                jobData.requirements,
                jobData.jobType,
                jobData.location,
                jobData.salaryRange,
                jobData.applicationDeadline,
                jobData.contactEmail
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Event methods
    async createEvent(eventData) {
        const sql = `
            INSERT INTO student_events (
                title, description, event_type, organizer_id, organizer_type,
                start_datetime, end_datetime, location, max_attendees, is_public
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [
                eventData.title,
                eventData.description,
                eventData.eventType,
                eventData.organizerId,
                eventData.organizerType,
                eventData.startDatetime,
                eventData.endDatetime,
                eventData.location,
                eventData.maxAttendees,
                eventData.isPublic
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Query methods
    async getActiveJobPostings() {
        const sql = `
            SELECT jp.*, c.name as company_name, c.industry 
            FROM job_postings jp
            JOIN companies c ON jp.company_id = c.id
            WHERE jp.is_active = 1 AND jp.application_deadline > date('now')
            ORDER BY jp.posted_date DESC
        `;

        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getUpcomingEvents(limit = 10) {
        const sql = `
            SELECT * FROM student_events 
            WHERE start_datetime > datetime('now') 
            ORDER BY start_datetime ASC 
            LIMIT ?
        `;

        return new Promise((resolve, reject) => {
            this.db.all(sql, [limit], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getUserByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        
        return new Promise((resolve, reject) => {
            this.db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Close database connection
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    }
}

module.exports = Database;