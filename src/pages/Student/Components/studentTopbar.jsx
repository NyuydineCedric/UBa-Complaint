// pages/Student/Components/studentTopbar.jsx
import { Bell, Sun, Moon } from "lucide-react";
import { useContext, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import "./studenttopbar.css";
import "../StudentStyle.css";
import profile from "../../../assets/profile.jpg";

export default function Topbar() {
  const {
    user,
    theme,
    setTheme,
    studentResolvedNotifications,
    markStudentNotificationsRead,
    complaints,
    t,
  } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

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

  // Get student's complaints sorted by last update
  const studentComplaints = useMemo(() => {
    if (!user) return [];
    return complaints
      .filter((c) => c.userId === user.matricule)
      .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
      .slice(0, 5); // Show latest 5
  }, [complaints, user]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markStudentNotificationsRead();
    }
  };

  const handleViewComplaint = (complaintId) => {
    setShowNotifications(false);
    navigate(`/student/complaints/${complaintId}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return t("pending_status");
      case "in-progress":
        return t("in_progress_status");
      case "resolved":
        return t("resolved_status");
      case "rejected":
        return t("rejected_status");
      default:
        return status;
    }
  };

  return (
    <div className="student-topbar">
      {/* LEFT TITLE / SEARCH */}
      <div className="student-title">
        <input type="text" placeholder="Search..." />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="student-topbar-right">
        {/* NOTIFICATION */}
        <div className="student-notification-container">
          <div
            className="student-notification"
            onClick={handleNotificationClick}
            title={
              studentResolvedNotifications > 0
                ? "Click to view complaint updates"
                : "No new notifications"
            }
          >
            <Bell
              size={28}
              style={{
                width: "28px",
                height: "28px",
                color:
                  studentResolvedNotifications > 0
                    ? "var(--student-primary)"
                    : "var(--student-text-secondary)",
              }}
              className="student-icon"
            />
            {studentResolvedNotifications > 0 && (
              <span className="student-badge">
                {studentResolvedNotifications}
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="student-notification-dropdown">
              <div className="student-notification-header">
                <h4>Complaint Updates</h4>
              </div>
              <div className="student-notification-list">
                {studentComplaints.length === 0 ? (
                  <div className="student-notification-item empty">
                    No complaints yet
                  </div>
                ) : (
                  studentComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="student-notification-item"
                      onClick={() => handleViewComplaint(complaint.id)}
                    >
                      <div className="student-notification-content">
                        <div className="student-notification-title">
                          <strong>
                            {complaint.title || complaint.courseTitle}
                          </strong>
                        </div>
                        <div className="student-notification-course">
                          {complaint.course} - {complaint.type}
                        </div>
                        <div className="student-notification-status">
                          <span
                            className={`status-badge status-${complaint.status.replace("-", "")}`}
                          >
                            {getStatusText(complaint.status)}
                          </span>
                        </div>
                      </div>
                      <div className="student-notification-time">
                        {new Date(complaint.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE IMAGE */}
        <img src={profile} alt="Profile Picture" className="proffile-img" />

        {/* THEME SWITCH – on the far right */}
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
      </div>
    </div>
  );
}
