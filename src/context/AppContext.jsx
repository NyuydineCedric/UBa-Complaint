import { createContext, useState, useEffect } from "react";
import { getTranslation } from "../translations";

export const AppContext = createContext(null);

// ========== INITIAL DATA ==========
const initialComplaints = [
  {
    id: "COMP-2026-006",
    student: "Amina Tchamba",
    studentId: "UBA2012345",
    department: "Department of Mathematics",
    program: "BSc Mathematics",
    course: "MTH151",
    courseTitle: "Calculus I",
    school: "FHS",
    type: "Missing Exam Marks",
    status: "pending",
    priority: "High",
    submittedDate: "2026-05-01T09:20:00.000Z",
    submitted: "May 1, 2026",
    lastUpdate: "May 1, 2026",
    semester: "First",
    year: 2026,
    details:
      "I have not received my final exam mark for Calculus I. The portal shows zero even though I sat the exam.",
  },
  {
    id: "COMP-2026-005",
    student: "Kofi Mensah",
    studentId: "UBA1945678",
    department: "Department of Physics",
    program: "BSc Physics",
    course: "PHY151",
    courseTitle: "Physics I",
    school: "FHS",
    type: "Incorrect CA Marks",
    status: "rejected",
    priority: "Medium",
    submittedDate: "2026-04-25T13:40:00.000Z",
    submitted: "Apr 25, 2026",
    lastUpdate: "Apr 28, 2026",
    semester: "First",
    year: 2026,
    details:
      "My CA marks appear lower than the score I received in class tests.",
  },
  {
    id: "COMP-2026-004",
    student: "Amara Dushime",
    studentId: "UBA1932100",
    department: "Department of Biology",
    program: "BSc Biology",
    course: "BIO202",
    courseTitle: "Organic Biology",
    school: "FED",
    type: "Missing CA Marks",
    status: "pending",
    priority: "Medium",
    submittedDate: "2026-04-29T10:30:00.000Z",
    submitted: "Apr 29, 2026",
    lastUpdate: "Apr 29, 2026",
    semester: "First",
    year: 2026,
    details:
      "Continuous assessment marks for Organic Biology are not reflected on my transcript.",
  },
  {
    id: "COMP-2026-003",
    student: "Sarah Nkasa",
    studentId: "UBA1956234",
    department: "Department of Chemistry",
    program: "BSc Chemistry",
    course: "CHM101",
    courseTitle: "General Chemistry",
    school: "HTTC",
    type: "Missing Exam Marks",
    status: "resolved",
    priority: "Low",
    submittedDate: "2026-04-26T11:55:00.000Z",
    submitted: "Apr 26, 2026",
    lastUpdate: "Apr 29, 2026",
    semester: "First",
    year: 2026,
    details:
      "Final exam mark is missing from the portal even though I have the exam slip.",
  },
  {
    id: "COMP-2026-002",
    student: "James Okonkwo",
    studentId: "UBA1987654",
    department: "Department of Economics",
    program: "BSc Economics",
    course: "MTH151",
    courseTitle: "Calculus I",
    school: "FHS",
    type: "Incorrect Exam Marks",
    status: "in-progress",
    priority: "High",
    submittedDate: "2026-04-27T11:10:00.000Z",
    submitted: "Apr 27, 2026",
    lastUpdate: "Apr 29, 2026",
    semester: "First",
    year: 2026,
    details:
      "My exam score has been entered incorrectly and does not match the official grade sheet.",
  },
  {
    id: "COMP-2026-001",
    student: "Nyuydine Cedric",
    studentId: "UBA2481980",
    department: "Department of Education",
    program: "BA Education",
    course: "EDU201",
    courseTitle: "Educational Psychology",
    school: "FED",
    type: "Missing CA Marks",
    status: "pending",
    priority: "High",
    submittedDate: "2026-04-28T15:00:00.000Z",
    submitted: "Apr 28, 2026",
    lastUpdate: "Apr 29, 2026",
    semester: "First",
    year: 2026,
    details:
      "The CA mark for Educational Psychology is not recorded in the system.",
  },
];

const initialNotifications = [
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

const initialMessages = [
  {
    id: "m-001",
    studentName: "Nyuydine Cedric",
    studentId: "UBA2481980",
    lastMessage: "Need an update on my complaint...",
    time: "2m ago",
    conversation: [
      {
        sender: "student",
        text: "Need an update on my complaint for Continuous Assessment grade.",
        time: "2m ago",
      },
    ],
  },
  {
    id: "m-002",
    studentName: "Dr. John Doe",
    studentId: "STAFF001",
    lastMessage: "Please confirm the attached report.",
    time: "1h ago",
    conversation: [
      {
        sender: "staff",
        text: "Please confirm the attached report.",
        time: "1h ago",
      },
    ],
  },
];

// ========== PROVIDER ==========
export function AppProvider({ children }) {
  // Dark mode
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

  // Settings
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

  // Translation function
  const t = (key) => getTranslation(settings.language, key);

  // State
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [messages, setMessages] = useState(initialMessages);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Complaint functions
  const addComplaint = (payload) => {
    const nextIndex = complaints.length + 1;
    const id = `COMP-${new Date().getFullYear()}-${String(nextIndex).padStart(3, "0")}`;
    const submittedDate = new Date().toISOString();
    const newComplaint = {
      id,
      status: "pending",
      priority: "High",
      lastUpdate: new Date().toISOString(),
      submittedDate,
      submitted: new Date(submittedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      semester: payload.semester,
      year: payload.year,
      details: payload.details,
      ...payload,
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: "New complaint submitted",
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

  // Notification functions
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Message function
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

export default AppProvider;
