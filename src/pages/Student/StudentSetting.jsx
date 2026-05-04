// pages/Student/StudentSetting.jsx
import { useState, useContext } from "react";
import { LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import "./studentsetting.css";
import "./StudentStyle.css";

export default function Settings() {
  const { theme, toggleTheme, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="student-settings-page">
      <h2 className="student-page-title">Settings</h2>

      <div className="student-settings-card">
        {/* THEME TOGGLE */}
        <div className="student-setting-item">
          <div>
            <h4>
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />} 
              {theme === "dark" ? " Dark Mode" : " Light Mode"}
            </h4>
            <p>Switch between light and dark theme</p>
          </div>

          <label className="student-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="student-slider"></span>
          </label>
        </div>

        {/* NOTIFICATIONS */}
        <div className="student-setting-item">
          <div>
            <h4>Notifications</h4>
            <p>Enable or disable notifications</p>
          </div>

          <label className="student-switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="student-slider"></span>
          </label>
        </div>

        {/* ACCOUNT */}
        <div className="student-setting-item">
          <div>
            <h4>Account</h4>
            <p>Manage your account settings</p>
          </div>

          <button className="student-action-btn" onClick={() => navigate("/student/profile")}>
            Update Info
          </button>
        </div>

        {/* LOGOUT */}
        <div className="student-setting-item">
          <div>
            <h4>Logout</h4>
            <p>Sign out of your account</p>
          </div>

          <div className="student-logout-btn" onClick={handleLogout}>
            <LogOut className="student-logout-icon" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}