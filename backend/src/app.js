const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const database = new db.Database();
database.initialize().catch(err => {
    console.error("Database initialization error:", err);
    process.exit(1);
});

/*
Expected frontend request:
POST /api/auth/register
Content-Type: application/json
body: { firstName, lastName, email, password, role }
*/
app.post("/api/auth/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // check duplicate email (case-insensitive)
        const exists = users.some(u => String(u.email).toLowerCase() === String(email).toLowerCase());
        if (exists) {
            return res.status(409).json({ error: "Email is already registered" });
        }

        database.createUser({
            email,
            password,
            firstName,
            lastName,
            userType: role
        });
        res.status(201).json({ user: publicUser });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});