// context/AppContext.jsx
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

const API_BASE = "/api";

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

  // ========== COMPLAINTS ==========
  const [complaints, setComplaints] = useState([]);

  // ========== TOASTS ==========
  const [toasts, setToasts] = useState([]);

  // ========== SEARCH QUERY ==========
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await apiRequest("/complaints");
        setComplaints(data);
      } catch (error) {
        console.warn("Could not load complaints from backend:", error.message);
      }
    };

    loadComplaints();
  }, []);

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
    }
  }, [user]);

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
      userId: currentUser.matricule || payload.userId,
      name: currentUser.name || payload.name || "Unknown",
      email: currentUser.email || payload.email || "N/A",
      department: currentUser.department || payload.department || "N/A",
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

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [settings, setSettings] = useState({
    language: "English",
    notifications: true,
  });

  const t = (key) => {
    const translations = {
      dashboard: "Dashboard",
      welcome_back: "Welcome back, Administrator",
      total_complaints: "Total Complaints",
      this_week: "this week",
      pending: "Pending",
      in_progress: "In Progress",
      resolved: "Resolved",
      rejected: "Rejected",
      complaints_by_school: "Complaints by School",
      complaints_overview: "Complaints Overview",
      recent_complaints: "Recent Complaints",
      view_all: "View All",
      complaint_id: "ID",
      student_name: "Student",
      course_code: "Course",
      complaint_type: "Type",
      status: "Status",
      submitted: "Submitted",
      actions: "Actions",
      view: "View",
      complaints: "Complaints",
      manage_complaints: "Manage all complaints",
      search_by: "Search by student, ID, course...",
      all_status: "All Status",
      pending_cap: "Pending",
      in_progress_cap: "In Progress",
      resolved_cap: "Resolved",
      rejected_cap: "Rejected",
      all_schools: "All Schools",
      all_types: "All Types",
      quick_filter: "Quick Filter",
      all: "All",
      school_label: "School",
      type_label: "Type",
      submitted_label: "Submitted",
      reports_title: "Reports",
      reports_subtitle: "Complaints analytics and reports",
      export_report: "Export Report",
      complaints_trend: "Complaints Trend",
      by_semester: "By Semester",
      by_year: "By Year",
      total_complaints_short: "Total",
      current_academic_year: "Current Academic Year",
      last_10_years: "Last 10 Years",
      resolved_short: "Resolved",
      pending_short: "Pending",
      complaints_by_status: "Complaints by Status",
      complaints_by_semester: "Complaints by Semester",
      complaints_by_year: "Complaints by Year",
      schools_title: "Schools",
      schools_subtitle: "Manage schools and departments",
      add_school: "Add School",
      schools: "Schools",
      complaints_count: "Complaints",
      students_count: "Students",
      resolution_progress: "Resolution Progress",
      head: "Head",
      school_performance_details: "School Performance Details",
      resolution_rate: "Resolution Rate",
      details: "Details",
      settings_title: "Settings",
      settings_subtitle: "Manage your system settings",
      save_changes: "Save Changes",
      system_information: "System Information",
      system_name: "System Name",
      admin_email: "Admin Email",
      appearance: "Appearance",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      english: "English",
      french: "French",
      settings_saved: "Settings saved successfully!",
      switched_to_light: "Switched to Light mode",
      switched_to_dark: "Switched to Dark mode",
      app_name: "UBa Complaint System",
      search_placeholder: "Search...",
    };

    return translations[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
        theme,
        setTheme,
        toggleTheme,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
