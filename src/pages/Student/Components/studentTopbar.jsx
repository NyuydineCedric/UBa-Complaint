// pages/Student/Components/studentTopbar.jsx
import { Bell, Sun, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import "./studenttopbar.css";
import "../StudentStyle.css";

export default function Topbar() {
  const { user, theme, setTheme, complaints, logout } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Dashboard");

  // ===== TITLE HANDLER =====
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path === "/student" || path === "/student/") {
      setTitle(`Welcome back, ${user?.name || "User"}`);
    } else if (path.includes("complaints") && !path.includes("submit")) {
      setTitle("My Complaints");
    } else if (path.includes("submit")) {
      setTitle("Submit Complaint");
    } else if (path.includes("profile")) {
      setTitle("My Profile");
    } else if (path.includes("settings")) {
      setTitle("Settings");
    } else {
      setTitle("Dashboard");
    }
  }, [location, user]);

  // ===== NOTIFICATIONS (only count in-progress for notifications) =====
  const myComplaints = complaints?.filter((c) => c.userId === user?.matricule) || [];
  const notificationCount = myComplaints.filter((c) => c.status === "in-progress").length || 0;

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
        <div className="student-notification">
          <Bell className="student-icon" />
          {notificationCount > 0 && (
            <span className="student-badge">{notificationCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}