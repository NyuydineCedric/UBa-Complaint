import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 4000;

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = Number(process.env.EMAIL_PORT || 587);
const EMAIL_SECURE = process.env.EMAIL_SECURE === "true";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
let EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

let emailTransporter = null;

async function configureEmailTransporter() {
  if (!EMAIL_HOST) {
    console.warn("Email SMTP host not configured. Email notifications disabled.");
    return;
  }

  try {
    if (EMAIL_HOST === "smtp.gmail.com") {
      if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("❌ Gmail requires EMAIL_USER and EMAIL_PASS.");
        return;
      }
      emailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });
      console.log("✅ Gmail SMTP configured for real emails.");
    } else if (EMAIL_HOST === "smtp.ethereal.email") {
      const testAccount = await nodemailer.createTestAccount();
      emailTransporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURE,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      EMAIL_FROM = testAccount.user;
      console.log("🔧 Ethereal email transport configured (test emails).");
    } else {
      emailTransporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURE,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });
      console.log(`🔧 Custom SMTP: ${EMAIL_HOST}:${EMAIL_PORT}`);
    }
  } catch (error) {
    console.error("Email configuration failed:", error.message);
  }
}

await configureEmailTransporter();

async function sendNotificationEmail(to, subject, text) {
  if (!emailTransporter) {
    console.log(`Email not sent (no transporter): ${to}`);
    return;
  }
  try {
    const result = await emailTransporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent to ${to}. Message ID: ${result.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(result);
    if (previewUrl) console.log(`📧 Preview: ${previewUrl}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
  }
}

const app = express();

// ========== CORS – allow localhost and Vercel frontend ==========
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://ub-a-complaint.vercel.app",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static frontend (for production)
app.use(express.static(path.join(__dirname, "../dist")));

// Data functions
async function readData() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    const defaultData = { users: [], complaints: [] };
    await writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ============ API ROUTES ============

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.post("/api/auth/register", async (req, res) => {
  try {
    const newUser = req.body;
    const data = await readData();
    const existing = data.users.find(
      (user) => user.matricule === newUser.matricule || user.email === newUser.email
    );
    if (existing) return res.status(400).json({ message: "Already registered." });
    const createdUser = { ...newUser, id: Date.now().toString(), role: newUser.role || "student", createdAt: new Date().toISOString() };
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
    const user = data.users.find(u => u.email === email && u.password === password && u.matricule === matricule);
    if (!user) return res.status(401).json({ message: "Invalid credentials." });
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
    const index = data.users.findIndex(u => u.matricule === matricule);
    if (index === -1) return res.status(404).json({ message: "User not found." });
    data.users[index] = { ...data.users[index], ...updates };
    await writeData(data);
    res.json(data.users[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed." });
  }
});

app.get("/api/complaints", async (_, res) => {
  try {
    const data = await readData();
    res.json(data.complaints || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load complaints." });
  }
});

app.get("/api/complaints/:id", async (req, res) => {
  try {
    const data = await readData();
    const complaint = data.complaints.find(c => c.id === req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found." });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create complaint." });
  }
});

app.put("/api/complaints/:id", async (req, res) => {
  try {
    const updates = req.body;
    const data = await readData();
    const index = data.complaints.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Not found." });
    const old = data.complaints[index];
    const updated = { ...old, ...updates, lastUpdate: new Date().toISOString() };
    data.complaints[index] = updated;
    await writeData(data);

    // Send email if status changed
    if (updates.status && updates.status !== old.status && old.email) {
      const statusText = updates.status.charAt(0).toUpperCase() + updates.status.slice(1);
      const subject = `UBa Complaint System - Status Update: ${statusText}`;
      const message = `Dear ${old.name || "Student"},

Your complaint has been updated:

Complaint ID: ${old.id}
Course: ${old.courseTitle || old.course}
Type: ${old.type}
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
    const exists = data.complaints.some(c => c.id === req.params.id);
    if (!exists) return res.status(404).json({ message: "Not found." });
    data.complaints = data.complaints.filter(c => c.id !== req.params.id);
    await writeData(data);
    res.json({ message: "Deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed." });
  }
});

// Catch-all for React Router (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:4000`));