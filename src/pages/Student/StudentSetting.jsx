import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import "./studentsetting.css";
import "./StudentStyle.css";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [darkMode]);
  return (
    <div className="student-settings-page">
      <h2 className="student-page-title">Settings</h2>

      <div className="student-settings-card">
        {/* THEME */}
        <div className="student-setting-item">
          <div>
            <h4>Dark Mode</h4>
            <p>Switch between light and dark theme</p>
          </div>

          <label className="student-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
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

          <button className="student-action-btn">Update Info</button>
        </div>

        {/* LOGOUT */}
        <div className="student-setting-item">
          <div>
            <h4>Logout</h4>
            <p>Sign out of your account</p>
          </div>

          <div className="student-logout-btn">
            <LogOut className="student-logout-icon" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
