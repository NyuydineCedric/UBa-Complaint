// pages/Student/Components/studentTopbar.jsx
import { Bell, Sun, Moon } from "lucide-react";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import "./studenttopbar.css";
import "../StudentStyle.css";

export default function Topbar() {
  const {
    user,
    theme,
    setTheme,
    studentResolvedNotifications,
    markStudentNotificationsRead,
  } = useContext(AppContext);
  const location = useLocation();

  const title = useMemo(() => {
    const path = location.pathname.toLowerCase();

    if (path === "/student" || path === "/student/") {
      return `Welcome back, ${user?.name || "User"}`;
    }
    if (path.includes("complaints") && !path.includes("submit")) {
      return "My Complaints";
    }
    if (path.includes("submit")) {
      return "Submit Complaint";
    }
    if (path.includes("profile")) {
      return "My Profile";
    }
    if (path.includes("settings")) {
      return "Settings";
    }
    return "Dashboard";
  }, [location.pathname, user]);

  return (
    <div className="student-topbar">
      {/* LEFT TITLE */}
      <div className="student-title">
        <h3 className="student-title-one">{title}</h3>
        <p className="student-title-paragraph">
          Here's what's happening with your complaints
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="student-topbar-right">
        {/* THEME SWITCH */}
        <div className="student-theme-toggle-container">
          <button
            className={`student-toggle-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
            title="Light Mode"
          >
            <Sun size={18} />
          </button>
          <button
            className={`student-toggle-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
            title="Dark Mode"
          >
            <Moon size={18} />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div
          className="student-notification"
          onClick={markStudentNotificationsRead}
          title={
            studentResolvedNotifications > 0
              ? "Click to clear solved complaint notifications"
              : "No new notifications"
          }
        >
          <Bell className="student-icon" />
          {studentResolvedNotifications > 0 && (
            <span className="student-badge">
              {studentResolvedNotifications}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
