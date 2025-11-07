const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs").promises;

//OPREZ!!! NEMA PASSWORD HASHINGA I OSTALE SIGURNOSNE MJERE U OVOM KODU. SAMO JE PRIMJER.
class Database {
    constructor(dbPath = "./database.db") {
        this.dbPath = dbPath;
        this.db = null;
        this.schemaFile = path.join(__dirname, "schema.sql");
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connected to SQLite database");
                    resolve();
                }
            });
        });
    }

    async initialize() {
        await this.connect();
        let schemaSQL = "";
        try {
            schemaSQL = await fs.readFile(this.schemaFile, "utf8");
        } catch (err) {
            console.warn("Schema file not found:", this.schemaFile, err);
            schemaSQL = ""; // fallback to empty
        }

        if (!schemaSQL) {
            console.log("No schema SQL to execute");
            return;
        }
        return new Promise((resolve, reject) => {
            this.db.exec(schemaSQL, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Database schema initialized");
                    resolve();
                }
            });
        });
    }

    // User management methods
    async createUser(userData) {
        const { email, password, firstName, lastName, userType } = userData;

        const sql = `
        INSERT INTO users (email, password, first_name, last_name, user_type)
        VALUES (?, ?, ?, ?, ?)
    `;

        return new Promise((resolve, reject) => {
            this.db.run(
                sql,
                [email, password, firstName, lastName, userType],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }
    // Job posting methods
    async createJobPosting(jobData) {
        const {
            companyName,
            title,
            description,
            location,
            jobType,
            applicationDeadline,
            contactEmail,
        } = jobData;

        const sql = `
        INSERT INTO job_postings (
            company_name, title, description, location, job_type, 
            application_deadline, contact_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        return new Promise((resolve, reject) => {
            this.db.run(
                sql,
                [
                    companyName, // company_name (directly from form)
                    title, // title
                    description, // description
                    location, // location
                    jobType, // job_type
                    applicationDeadline, // application_deadline
                    contactEmail, // contact_email
                ],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
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
            this.db.run(
                sql,
                [
                    eventData.title,
                    eventData.description,
                    eventData.eventType,
                    eventData.organizerId,
                    eventData.organizerType,
                    eventData.startDatetime,
                    eventData.endDatetime,
                    eventData.location,
                    eventData.maxAttendees,
                    eventData.isPublic,
                ],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    // Query methods
    async getAllJobPostings() {
        const sql = `
            SELECT * FROM job_postings
            WHERE is_active = 1 AND (application_deadline IS NULL OR application_deadline >= DATE('now'))
            ORDER BY posted_date DESC
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

    async getUsersByRole(role) {
        const sql = `
            SELECT id, email, first_name, last_name, user_type 
            FROM users 
            WHERE user_type = ?
        `;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [role], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    // Close database connection
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error("Error closing database:", err);
                } else {
                    console.log("Database connection closed");
                }
            });
        }
    }
}

module.exports = Database;
