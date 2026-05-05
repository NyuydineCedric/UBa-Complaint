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
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

async function readData() {
  const raw = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const newUser = req.body;
    const data = await readData();
    const existing = data.users.find(
      (user) => user.matricule === newUser.matricule || user.email === newUser.email,
    );

    if (existing) {
      return res.status(400).json({ message: "This matricule or email is already registered." });
    }

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
    res.status(500).json({ message: "Unable to register user." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, matricule } = req.body;
    const data = await readData();
    const found = data.users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.matricule === matricule,
    );

    if (!found) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.json(found);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to login." });
  }
});

app.put("/api/users/:matricule", async (req, res) => {
  try {
    const matricule = req.params.matricule;
    const updates = req.body;
    const data = await readData();
    const index = data.users.findIndex((user) => user.matricule === matricule);

    if (index === -1) {
      return res.status(404).json({ message: "User not found." });
    }

    data.users[index] = { ...data.users[index], ...updates };
    await writeData(data);

    res.json(data.users[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update user." });
  }
});

app.get("/api/complaints", async (_, res) => {
  try {
    const data = await readData();
    res.json(data.complaints || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load complaints." });
  }
});

app.get("/api/complaints/:id", async (req, res) => {
  try {
    const data = await readData();
    const complaint = data.complaints.find((item) => item.id === req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }
    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load complaint." });
  }
});

app.post("/api/complaints", async (req, res) => {
  try {
    const complaint = req.body;
    const data = await readData();
    const createdComplaint = {
      ...complaint,
      id: Date.now().toString(),
      submittedDate: complaint.submittedDate || new Date().toISOString(),
      lastUpdate: complaint.lastUpdate || new Date().toISOString(),
      status: complaint.status || "pending",
    };

    data.complaints.unshift(createdComplaint);
    await writeData(data);

    res.status(201).json(createdComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create complaint." });
  }
});

app.put("/api/complaints/:id", async (req, res) => {
  try {
    const updates = req.body;
    const data = await readData();
    const index = data.complaints.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    data.complaints[index] = {
      ...data.complaints[index],
      ...updates,
      lastUpdate: new Date().toISOString(),
    };

    await writeData(data);
    res.json(data.complaints[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update complaint." });
  }
});

app.delete("/api/complaints/:id", async (req, res) => {
  try {
    const data = await readData();
    const existing = data.complaints.find((item) => item.id === req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    data.complaints = data.complaints.filter((item) => item.id !== req.params.id);
    await writeData(data);

    res.json({ message: "Complaint deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete complaint." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
