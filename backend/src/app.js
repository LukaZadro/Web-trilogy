const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const database = new db();
database.initialize().catch((err) => {
  console.error("Database initialization error:", err);
  process.exit(1);
});

/*
REGISTER
*/
app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await database.createUser({
      email,
      password,
      firstName,
      lastName,
      userType: role,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/*
LOGIN
 */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await database.getUserByEmail(email);
    if (!user || user[0].password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const publicUser = {
      id: user[0].id,
      email: user[0].email,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      role: user[0].user_type,
    };
    res.json({ user: publicUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get uloge korisnika
app.get("/api/role/users", async (req, res) => {
  try {
    const role = req.query.role;
    const users = await database.getUsersByRole(role);
    const publicUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.user_type,
    }));
    res.json({ users: publicUsers });
  } catch (err) {
    console.error("Get users by role error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//dohvat svih oglasa za posao
app.get("/api/job-postings", async (req, res) => {
  try {
    const jobPostings = await database.getAllJobPostings();
    res.json({ jobPostings });
  } catch (err) {
    console.error("Get job postings error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//post oglasa za posao
app.post("/api/job-postings", async (req, res) => {
  try {
    const jobData = req.body;
    const jobId = await database.createJobPosting(jobData);
    res.status(201).json({ jobId });
  } catch (err) {
    console.error("Create job posting error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//brisanje oglasa za posao
app.delete("/api/job-postings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await database.deleteJobPosting(id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Delete job error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// dohvat svih dogadjanja
app.get("/api/events", async (req, res) => {
  try {
    const events = await database.getAllEvents();
    res.json({ events });
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post dogadaja
app.post("/api/events", async (req, res) => {
  try {
    const {
      title,
      description,
      domain,
      organizer,
      start_datetime,
      end_datetime,
      location,
    } = req.body;

    if (!title || !start_datetime || !end_datetime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await database.addEvent({
      title,
      description,
      domain,
      organizer,
      start_datetime,
      end_datetime,
      location,
    });

    res
      .status(201)
      .json({ message: "Event added successfully", id: result.id });
  } catch (err) {
    console.error("Add event error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// brisanje dogadaja
app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.deleteEvent(id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
