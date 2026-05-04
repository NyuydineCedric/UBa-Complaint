// context/AppContext.jsx
import { createContext, useState, useEffect } from "react";

// Export the context separately
export const AppContext = createContext(null);

// Export the provider as default
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
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("complaints");
    return saved ? JSON.parse(saved) : [];
  });

  // ========== TOASTS ==========
  const [toasts, setToasts] = useState([]);
  
  // ========== SEARCH QUERY ==========
  const [searchQuery, setSearchQuery] = useState("");

  // Sync theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  // Sync complaints with localStorage
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  // ========== AUTH FUNCTIONS ==========
  const register = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      ...data,
      id: Date.now(),
      role: data.role || "student",
      avatar: data.avatar || null,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  };

  const login = (email, password, matricule) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => 
        u.email === email && 
        u.password === password && 
        u.matricule === matricule
    );
    if (found) {
      setUser(found);
      localStorage.setItem("currentUser", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    setToasts([]);
  };

  // ========== COMPLAINT FUNCTIONS ==========
  const getComplaints = () => complaints;

  const addComplaint = (payload) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const newComplaint = {
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
    setComplaints((prev) => [newComplaint, ...prev]);
    showToast("Complaint submitted successfully!", "success");
    return newComplaint;
  };

  const updateComplaint = (id, updates) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id 
          ? { ...c, ...updates, lastUpdate: new Date().toISOString() } 
          : c
      )
    );
    showToast("Complaint updated successfully!", "success");
  };

  const updateComplaintStatus = (id, status) => {
    updateComplaint(id, { status });
  };

  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    showToast("Complaint deleted successfully!", "success");
  };

  // ========== TOAST FUNCTIONS ==========
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

  // ========== THEME FUNCTIONS ==========
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ========== SETTINGS ==========
  const [settings, setSettings] = useState({
    language: "English",
    notifications: true,
  });

  // ========== TRANSLATION FUNCTION ==========
  const t = (key) => {
    const translations = {
      // Dashboard
      "dashboard": "Dashboard",
      "welcome_back": "Welcome back, Administrator",
      "total_complaints": "Total Complaints",
      "this_week": "this week",
      "pending": "Pending",
      "in_progress": "In Progress",
      "resolved": "Resolved",
      "rejected": "Rejected",
      "complaints_by_school": "Complaints by School",
      "complaints_overview": "Complaints Overview",
      "recent_complaints": "Recent Complaints",
      "view_all": "View All",
      "complaint_id": "ID",
      "student_name": "Student",
      "course_code": "Course",
      "complaint_type": "Type",
      "status": "Status",
      "submitted": "Submitted",
      "actions": "Actions",
      "view": "View",
      
      // All Complaints
      "complaints": "Complaints",
      "manage_complaints": "Manage all complaints",
      "search_by": "Search by student, ID, course...",
      "all_status": "All Status",
      "pending_cap": "Pending",
      "in_progress_cap": "In Progress",
      "resolved_cap": "Resolved",
      "rejected_cap": "Rejected",
      "all_schools": "All Schools",
      "all_types": "All Types",
      "quick_filter": "Quick Filter",
      "all": "All",
      "school_label": "School",
      "type_label": "Type",
      "submitted_label": "Submitted",
      
      // Reports
      "reports_title": "Reports",
      "reports_subtitle": "Complaints analytics and reports",
      "export_report": "Export Report",
      "complaints_trend": "Complaints Trend",
      "by_semester": "By Semester",
      "by_year": "By Year",
      "total_complaints_short": "Total",
      "current_academic_year": "Current Academic Year",
      "last_10_years": "Last 10 Years",
      "resolved_short": "Resolved",
      "pending_short": "Pending",
      "complaints_by_status": "Complaints by Status",
      "complaints_by_semester": "Complaints by Semester",
      "complaints_by_year": "Complaints by Year",
      
      // Schools
      "schools_title": "Schools",
      "schools_subtitle": "Manage schools and departments",
      "add_school": "Add School",
      "schools": "Schools",
      "complaints_count": "Complaints",
      "students_count": "Students",
      "resolution_progress": "Resolution Progress",
      "head": "Head",
      "school_performance_details": "School Performance Details",
      "resolution_rate": "Resolution Rate",
      "details": "Details",
      
      // Settings
      "settings_title": "Settings",
      "settings_subtitle": "Manage your system settings",
      "save_changes": "Save Changes",
      "system_information": "System Information",
      "system_name": "System Name",
      "admin_email": "Admin Email",
      "appearance": "Appearance",
      "theme": "Theme",
      "light": "Light",
      "dark": "Dark",
      "language": "Language",
      "english": "English",
      "french": "French",
      "settings_saved": "Settings saved successfully!",
      "switched_to_light": "Switched to Light mode",
      "switched_to_dark": "Switched to Dark mode",
      
      // Layout
      "app_name": "UBa Complaint System",
      "search_placeholder": "Search...",
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