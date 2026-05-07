// context/AppContext.jsx
import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { getTranslation } from "../translations";

export const AppContext = createContext(null);

const API_BASE = "https://uba-complaint-backend-3.onrender.com/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || response.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
}

export default function AppProvider({ children }) {
  // ========== USER ==========
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // ========== COMPLAINTS ==========
  const [complaints, setComplaints] = useState([]);
  const [lastComplaintCount, setLastComplaintCount] = useState(0);
  const [studentResolvedNotifications, setStudentResolvedNotifications] =
    useState(0);

  const resolvedBaselineRef = useRef(null);
  const previousResolvedCountRef = useRef(null);
  const previousComplaintsRef = useRef([]);

  // ========== TOASTS ==========
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // ========== SEARCH QUERY ==========
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await apiRequest("/complaints");
        setComplaints(data);
        setLastComplaintCount(data.length);
        previousComplaintsRef.current = data;
      } catch (error) {
        console.warn("Could not load complaints from backend:", error.message);
      }
    };

    loadComplaints();

    const pollInterval = setInterval(async () => {
      try {
        const data = await apiRequest("/complaints");

        if (data.length > lastComplaintCount) {
          setUnreadNotifications(data.length - lastComplaintCount);
        }

        if (previousComplaintsRef.current.length > 0) {
          data.forEach((newComplaint) => {
            const oldComplaint = previousComplaintsRef.current.find(
              (c) => c.id === newComplaint.id,
            );
            if (oldComplaint && oldComplaint.status !== newComplaint.status) {
              console.log(
                `Complaint ${newComplaint.id} status changed from ${oldComplaint.status} to ${newComplaint.status}`,
              );
              setUnreadNotifications((prev) => prev + 1);
            }
          });
        }

        setComplaints(data);
        previousComplaintsRef.current = data;
      } catch (error) {
        console.warn("Polling error:", error.message);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [lastComplaintCount]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
      resolvedBaselineRef.current = null;
      previousResolvedCountRef.current = null;
      setStudentResolvedNotifications(0);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const resolvedCount = complaints.filter(
      (c) => c.userId === user?.matricule && c.status === "resolved",
    ).length;

    if (resolvedBaselineRef.current === null) {
      resolvedBaselineRef.current = resolvedCount;
      setStudentResolvedNotifications(0);
    } else if (resolvedCount > resolvedBaselineRef.current) {
      setStudentResolvedNotifications(
        resolvedCount - resolvedBaselineRef.current,
      );
    }

    if (previousResolvedCountRef.current === null) {
      previousResolvedCountRef.current = resolvedCount;
    } else if (resolvedCount > previousResolvedCountRef.current) {
      showToast(
        `A complaint has been resolved. Check your complaints list.`,
        "success",
      );
      previousResolvedCountRef.current = resolvedCount;
    }
  }, [complaints, user, showToast]);

  const markStudentNotificationsRead = () => {
    if (!user) return;
    const currentResolvedCount = complaints.filter(
      (c) => c.userId === user?.matricule && c.status === "resolved",
    ).length;
    resolvedBaselineRef.current = currentResolvedCount;
    setStudentResolvedNotifications(0);
  };

  const register = async (data) => {
    const newUser = {
      ...data,
      role: data.role || "student",
      avatar: data.avatar || null,
      createdAt: new Date().toISOString(),
    };
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
  };

  const login = async (email, password, matricule) => {
    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, matricule }),
      });
      setUser(result);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToasts([]);
  };

  const getComplaints = () => complaints;

  const addComplaint = async (payload) => {
    const currentUser = user || {};
    const complaint = {
      id: Date.now().toString(),
      ...payload,
      userId:
        currentUser.matricule || payload.studentId || payload.userId || "N/A",
      student: currentUser.name || payload.student || payload.name || "Unknown",
      name: currentUser.name || payload.name || payload.student || "Unknown",
      studentId:
        currentUser.matricule || payload.studentId || payload.userId || "N/A",
      email: currentUser.email || payload.email || "N/A",
      department:
        currentUser.department ||
        payload.department ||
        payload.program ||
        "N/A",
      program:
        currentUser.program ||
        payload.program ||
        currentUser.department ||
        "N/A",
      school: currentUser.school || payload.school || "N/A",
      level: currentUser.level || payload.level || "N/A",
      phoneNumber: currentUser.phoneNumber || payload.phoneNumber || "N/A",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      submittedDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    };

    const created = await apiRequest("/complaints", {
      method: "POST",
      body: JSON.stringify(complaint),
    });

    setComplaints((prev) => [created, ...prev]);
    showToast("Complaint submitted successfully!", "success");
    return created;
  };

  const updateComplaint = async (id, updates) => {
    const updated = await apiRequest(`/complaints/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...updates,
        lastUpdate: new Date().toISOString(),
      }),
    });

    setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    showToast("Complaint updated successfully!", "success");
    return updated;
  };

  const updateComplaintStatus = async (id, status) => {
    return updateComplaint(id, { status });
  };

  const deleteComplaint = async (id) => {
    await apiRequest(`/complaints/${id}`, { method: "DELETE" });
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    showToast("Complaint deleted successfully!", "success");
  };

  const updateProfile = async (matricule, updates) => {
    const updated = await apiRequest(`/users/${matricule}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });

    if (user?.matricule === matricule) {
      setUser(updated);
    }
    return updated;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [settings, setSettings] = useState({
    language: localStorage.getItem("language") || "en",
    notifications: true,
  });

  const t = (key) => {
    return getTranslation(settings.language, key);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentUser: user,
        setUser,
        register,
        login,
        logout,
        theme,
        darkMode: theme === "dark",
        setTheme,
        toggleTheme,
        toggleDarkMode: toggleTheme,
        complaints,
        getComplaints,
        addComplaint,
        updateComplaint,
        updateComplaintStatus,
        deleteComplaint,
        updateProfile,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        settings,
        setSettings,
        t,
        unreadNotifications,
        setUnreadNotifications,
        studentResolvedNotifications,
        markStudentNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
