import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 4000;

const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@uba.cm";
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "UBa Complaint System";

// ✅ Brevo API — sends over HTTPS, never blocked by Render
async function sendNotificationEmail(to, subject, text) {
  if (!process.env.BREVO_API_KEY) {
    console.warn("⚠️  BREVO_API_KEY not set. Email not sent.");
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
    console.error(`❌ Email error:`, err.message);
  }
}

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static frontend build
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

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
    const user = data.users.find(
      (u) => u.email === email && u.password === password && u.matricule === matricule
    );
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
    const complaint = data.complaints.find((c) => c.id === req.params.id);
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
    const index = data.complaints.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Not found." });
    const old = data.complaints[index];
    const updated = { ...old, ...updates, lastUpdate: new Date().toISOString() };
    data.complaints[index] = updated;
    await writeData(data);

    // ✅ Send email when status changes
    if (updates.status && updates.status !== old.status && old.email) {
      const statusText =
        updates.status.charAt(0).toUpperCase() + updates.status.slice(1);
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
    const exists = data.complaints.some((c) => c.id === req.params.id);
    if (!exists) return res.status(404).json({ message: "Not found." });
    data.complaints = data.complaints.filter((c) => c.id !== req.params.id);
    await writeData(data);
    res.json({ message: "Deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed." });
  }
});

// Catch-all for React Router (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));