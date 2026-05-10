import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Safe read/write with automatic file creation
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

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// Register
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

// Login
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

// Update user profile
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

// Get all complaints
app.get("/api/complaints", async (_, res) => {
  try {
    const data = await readData();
    res.json(data.complaints || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load complaints." });
  }
});

// Get single complaint
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

// Create complaint
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

// Update complaint (status changes only – no email)
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
    if (updates.status && updates.status !== old.status) {
      console.log(`Status changed: ${old.status} → ${updates.status} (email would be sent to ${old.email})`);
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed." });
  }
});

// Delete complaint
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

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));