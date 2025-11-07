const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const database =  new db();
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
        const publicUser = {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.user_type
        };
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

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await database.getUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.user_type
        };
        res.json({ user: publicUser });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});