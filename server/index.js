import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Point dotenv to the root .env file (one level up from server/)
dotenv.config({ path: path.join(__dirname, "../.env") });

const DATA_FILE = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 4000;

const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@uba.cm";
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "UBa Complaint System";

async function sendNotificationEmail(to, subject, text) {
  if (!process.env.BREVO_API_KEY) {
    console.warn("⚠️ BREVO_API_KEY not set. Email not sent.");
    return;
  }
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: EMAIL_FROM_NAME, email: EMAIL_FROM },
        to: [{ email: to }],
        subject,
        textContent: text,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(`❌ Failed to send email to ${to}:`, data.message || JSON.stringify(data));
    } else {
      console.log(`✅ Email sent to ${to}. Message ID: ${data.messageId}`);
    }
  } catch (err) {
    console.error(`❌ Email error:`, err.message, err.cause);
  }
}

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

async function readData() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    const defaultData = { users: [], complaints: [], hods: [] };
    await writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ========== AUTH MIDDLEWARE ==========
async function authMiddleware(req, res, next) {
  const userId = req.headers["x-user-id"];
  if (!userId) {
    req.user = null;
    return next();
  }
  const data = await readData();
  let user = data.users.find((u) => u.id === userId);
  if (!user) user = data.users.find((u) => u.matricule === userId);
  if (!user) return res.status(401).json({ message: "Invalid user" });
  req.user = user;
  next();
}
app.use(authMiddleware);

// ========== API ROUTES ==========
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// ---------- AUTH ----------
app.post("/api/auth/register", async (req, res) => {
  try {
    const newUser = req.body;
    const data = await readData();
    const existing = data.users.find(
      (u) => u.matricule === newUser.matricule || u.email === newUser.email
    );
    if (existing) return res.status(400).json({ message: "Already registered." });
    const createdUser = {
      ...newUser,
      id: Date.now().toString(),
      role: newUser.role || "student",
      createdAt: new Date().toISOString(),
    };
    data.users.push(createdUser);
    await writeData(data);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, matricule } = req.body;
    const data = await readData();
    let user = data.users.find(
      (u) => u.email === email && u.password === password && u.matricule === matricule
    );
    if (!user) return res.status(401).json({ message: "Invalid credentials." });
    if (!user.id) {
      user.id = Date.now().toString();
      const index = data.users.findIndex((u) => u.matricule === matricule);
      data.users[index] = user;
      await writeData(data);
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed." });
  }
});

app.put("/api/users/:matricule", async (req, res) => {
  try {
    const { matricule } = req.params;
    const updates = req.body;
    const data = await readData();
    const index = data.users.findIndex((u) => u.matricule === matricule);
    if (index === -1) return res.status(404).json({ message: "User not found." });
    data.users[index] = { ...data.users[index], ...updates };
    await writeData(data);
    res.json(data.users[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed." });
  }
});

// ---------- COMPLAINTS ----------
app.get("/api/complaints", async (req, res) => {
  try {
    const data = await readData();
    let complaints = data.complaints || [];

    if (!req.user || req.user.role === "admin") {
      return res.json(complaints);
    }

    if (req.user.role === "school_admin") {
      complaints = complaints.filter((c) => {
        if (c.complaintType === "wide") return false;
        if (c.school === "UNIVERSITY_WIDE") return false;
        if (c.responsibleSchool === "UNIVERSITY_WIDE") return false;
        const target = c.responsibleSchool || c.school;
        return target === req.user.school;
      });
      return res.json(complaints);
    }

    if (req.user.role === "student") {
      complaints = complaints.filter((c) => c.userId === req.user.matricule);
      return res.json(complaints);
    }

    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load complaints." });
  }
});

app.get("/api/complaints/:id", async (req, res) => {
  try {
    const data = await readData();
    const complaint = data.complaints.find((c) => c.id === req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found." });
    if (req.user?.role === "school_admin") {
      if (
        complaint.complaintType === "wide" ||
        complaint.school === "UNIVERSITY_WIDE" ||
        complaint.responsibleSchool === "UNIVERSITY_WIDE"
      ) {
        return res.status(403).json({ message: "Access denied." });
      }
      const target = complaint.responsibleSchool || complaint.school;
      if (target !== req.user.school) {
        return res.status(403).json({ message: "Access denied." });
      }
    }
    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load complaint." });
  }
});

app.post("/api/complaints", async (req, res) => {
  try {
    const complaint = req.body;
    const data = await readData();
    const newComplaint = {
      ...complaint,
      id: Date.now().toString(),
      submittedDate: complaint.submittedDate || new Date().toISOString(),
      lastUpdate: complaint.lastUpdate || new Date().toISOString(),
      status: complaint.status || "pending",
    };
    data.complaints.unshift(newComplaint);
    await writeData(data);
    res.status(201).json(newComplaint);

    // HOD alert at 30 complaints
    const course = newComplaint.courseTitle || newComplaint.course;
    const department = newComplaint.department;
    const school = newComplaint.studentSchool || newComplaint.school;

    if (course && department && newComplaint.complaintType !== "wide") {
      const courseComplaints = data.complaints.filter(
        (c) => (c.courseTitle || c.course) === course
      );
      if (courseComplaints.length === 30) {
        const hod = (data.hods || []).find(
          (h) =>
            h.department.toLowerCase().trim() === department.toLowerCase().trim() &&
            h.school.toLowerCase().trim() === (school || "").toLowerCase().trim()
        );
        if (hod) {
          const subject = `UBa Complaint System - Alert: 30 Complaints for ${course}`;
          const message = `Dear ${hod.name},

This is an automated alert from the UBa Complaint Management System.

The course "${course}" in the ${department} department (${school}) has reached 30 complaints.

Please review the complaints and take appropriate action.

Best regards,
UBa Complaint Management System`;
          await sendNotificationEmail(hod.email, subject, message);
          console.log(`🔔 HOD alert sent to ${hod.email} for course: ${course}`);
        } else {
          console.warn(`⚠️ No HOD found for school: ${school}, department: ${department}`);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create complaint." });
  }
});

app.put("/api/complaints/:id", async (req, res) => {
  try {
    const updates = req.body;
    const data = await readData();
    const index = data.complaints.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Not found." });
    const old = data.complaints[index];

    if (req.user?.role === "school_admin") {
      if (
        old.complaintType === "wide" ||
        old.school === "UNIVERSITY_WIDE" ||
        old.responsibleSchool === "UNIVERSITY_WIDE"
      ) {
        return res.status(403).json({ message: "Access denied." });
      }
      const target = old.responsibleSchool || old.school;
      if (target !== req.user.school) {
        return res.status(403).json({ message: "Access denied." });
      }
    }

    const updated = { ...old, ...updates, lastUpdate: new Date().toISOString() };
    data.complaints[index] = updated;
    await writeData(data);

    // Email student when status changes
    if (updates.status && updates.status !== old.status && old.email) {
      const statusText = updates.status.charAt(0).toUpperCase() + updates.status.slice(1);
      const subject = `UBa Complaint System - Status Update: ${statusText}`;
      const message = `Dear ${old.name || "Student"},

Your complaint has been updated:

Complaint ID: ${old.id}
Course: ${old.courseTitle || old.course || "N/A"}
Type: ${old.type || "N/A"}
Previous Status: ${old.status}
New Status: ${statusText}
Updated Date: ${new Date().toLocaleString()}

Please log in to your dashboard for details.

Best regards,
UBa Complaint Management System`;
      await sendNotificationEmail(old.email, subject, message);
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed." });
  }
});

app.delete("/api/complaints/:id", async (req, res) => {
  try {
    const data = await readData();
    const complaint = data.complaints.find((c) => c.id === req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found." });
    if (req.user?.role === "school_admin") {
      const target = complaint.responsibleSchool || complaint.school;
      if (
        complaint.complaintType === "wide" ||
        complaint.school === "UNIVERSITY_WIDE" ||
        target !== req.user.school
      ) {
        return res.status(403).json({ message: "Access denied." });
      }
    }
    data.complaints = data.complaints.filter((c) => c.id !== req.params.id);
    await writeData(data);
    res.json({ message: "Deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed." });
  }
});

// ---------- HODs ----------
app.get("/api/hods", async (_, res) => {
  try {
    const data = await readData();
    res.json(data.hods || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load HODs." });
  }
});

app.post("/api/hods", async (req, res) => {
  try {
    const { name, email, school, department } = req.body;
    if (!name || !email || !school || !department)
      return res.status(400).json({ message: "Name, email, school and department are required." });
    const data = await readData();
    if (!data.hods) data.hods = [];
    const newHod = {
      id: Date.now().toString(),
      name,
      email,
      school,
      department,
      createdAt: new Date().toISOString(),
    };
    data.hods.push(newHod);
    await writeData(data);
    res.status(201).json(newHod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add HOD." });
  }
});

app.delete("/api/hods/:id", async (req, res) => {
  try {
    const data = await readData();
    const exists = (data.hods || []).some((h) => h.id === req.params.id);
    if (!exists) return res.status(404).json({ message: "HOD not found." });
    data.hods = data.hods.filter((h) => h.id !== req.params.id);
    await writeData(data);
    res.json({ message: "HOD deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete HOD." });
  }
});

// Catch-all for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));