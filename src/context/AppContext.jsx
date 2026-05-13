import React, { createContext, useState, useEffect, useCallback } from "react";

export const AppContext = createContext(null);

// API base URL – from environment variable or fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function AppProvider({ children }) {
  // ---------- State ----------
  const [complaints, setComplaints] = useState([]); // always array, never null
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          language: "English",
          notifications: true,
          browserNotifications: true,
          itemsPerPage: 10,
          defaultDateRange: "Last 30 Days",
        };
  });
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------- Helper: fetch with error handling ----------
  const fetchAPI = useCallback(async (endpoint, options = {}) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }, []);

  // ---------- Load complaints on mount ----------
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchAPI("/complaints");
        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load complaints:", err);
        setComplaints([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };
    loadComplaints();
  }, [fetchAPI]);

  // ---------- Dark mode persistence ----------
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ---------- Settings persistence ----------
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // ---------- Current user persistence ----------
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // ---------- Translation helper (simple fallback) ----------
  const t = (key) => {
    const translations = {
      en: {
        dashboard: "Dashboard",
        complaints: "All Complaints" /* ... add other keys */,
      },
      fr: {
        dashboard: "Tableau de bord",
        complaints: "Toutes les réclamations" /* ... */,
      },
    };
    const lang = settings.language === "French" ? "fr" : "en";
    return translations[lang]?.[key] || key;
  };

  // ---------- Complaint functions ----------
  const addComplaint = async (complaint) => {
    try {
      const newComplaint = await fetchAPI("/complaints", {
        method: "POST",
        body: JSON.stringify(complaint),
      });
      setComplaints((prev) => [newComplaint, ...prev]);
      // Also add a notification for admin
      setNotifications((prev) => [
        {
          id: Date.now().toString(),
          title: "New complaint submitted",
          description: `${complaint.student} submitted a new complaint.`,
          time: "Just now",
          unread: true,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error("Failed to add complaint:", err);
    }
  };

  const updateComplaint = async (id, updates) => {
    try {
      const updated = await fetchAPI(`/complaints/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error("Failed to update complaint:", err);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await fetchAPI(`/complaints/${id}`, { method: "DELETE" });
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete complaint:", err);
    }
  };

  // ---------- Auth functions ----------
  const login = async (email, password, matricule) => {
    try {
      const user = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, matricule }),
      });
      setCurrentUser(user);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // ---------- Notification functions ----------
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };
  const unreadCount = notifications.filter((n) => n.unread).length;

  // ---------- Message functions ----------
  const sendMessage = async (conversationId, reply) => {
    // your implementation
  };

  // ---------- Toggle dark mode ----------
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ---------- Provider value ----------
  const value = {
    complaints,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    currentUser,
    login,
    logout,
    settings,
    setSettings,
    t,
    notifications,
    markNotificationRead,
    unreadCount,
    messages,
    sendMessage,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
