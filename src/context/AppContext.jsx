import { createContext, useState, useEffect } from "react";
import { getTranslation } from "../translations";

export const AppContext = createContext(null);

// ---------- Default data ----------
const defaultComplaints = [
  {
    id: "COMP-2026-001",
    student: "Nyuydine Cedric",
    studentId: "UBA2481980",
    department: "Department of Education",
    course: "EDU201",
    type: "Missing CA Marks",
    status: "pending",
    submitted: "Apr 28, 2026",
    details: "The CA mark for Educational Psychology is not recorded.",
  },
  // ... add your other 5 complaints here (keep them as you had)
];

const defaultNotifications = [
  {
    id: "n-001",
    title: "New complaint submitted",
    description: "A student has submitted a new marks complaint.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n-002",
    title: "Monthly summary ready",
    description: "Your weekly complaint performance report is ready.",
    time: "1h ago",
    unread: false,
  },
];

const defaultMessages = [
  {
    id: "m-001",
    studentName: "Nyuydine Cedric",
    studentId: "UBA2481980",
    lastMessage: "Need an update...",
    time: "2m ago",
    conversation: [],
  },
];

export function AppProvider({ children }) {
  // ---------- Persistent complaints ----------
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("complaints");
    return saved ? JSON.parse(saved) : defaultComplaints;
  });
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  // ---------- Persistent notifications ----------
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : defaultNotifications;
  });
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Cross‑tab sync
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "complaints") setComplaints(JSON.parse(e.newValue));
      if (e.key === "notifications") setNotifications(JSON.parse(e.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ---------- Authentication ----------
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // ---------- Dark mode ----------
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ---------- Settings ----------
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
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const t = (key) => getTranslation(settings.language, key);

  // ---------- Other state ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(defaultMessages);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // ---------- Complaint functions ----------
  const addComplaint = (payload) => {
    const newId = `COMP-${Date.now()}`;
    const submittedDate = new Date().toISOString();
    const newComplaint = {
      id: newId,
      student: payload.student,
      studentId: payload.studentId,
      email: payload.email,
      school: payload.school,
      department: payload.department,
      course: payload.course,
      courseTitle: payload.courseTitle || "",
      type:
        payload.type ||
        (payload.complaintType === "ca_mark" ? "CA Mark" : "Exam Mark"),
      status: "pending",
      priority: payload.priority || "Medium",
      submittedDate,
      submitted: new Date(submittedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      semester: payload.semester || "First",
      year: payload.year || new Date().getFullYear(),
      details: payload.details,
      attachment: payload.attachment,
      attachmentName: payload.attachmentName,
      level: payload.level,
      academicYear: payload.academicYear,
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: t("new_complaint_submitted"),
        description: `${payload.student} submitted a new complaint.`,
        time: "Just now",
        unread: true,
      },
      ...prev,
    ]);
  };

  const updateComplaint = (id, updates) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updates, lastUpdate: new Date().toISOString() }
          : c,
      ),
    );
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };
  const sendMessage = (conversationId, reply) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === conversationId
          ? {
              ...msg,
              lastMessage: reply,
              time: "Just now",
              conversation: [
                ...msg.conversation,
                { sender: "admin", text: reply, time: "Just now" },
              ],
            }
          : msg,
      ),
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        complaints,
        addComplaint,
        updateComplaint,
        searchQuery,
        setSearchQuery,
        darkMode,
        toggleDarkMode,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        messages,
        sendMessage,
        settings,
        setSettings,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
