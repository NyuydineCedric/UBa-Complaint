// pages/Student/StudentSetting.jsx
import { useState, useContext } from "react";
import { LogOut, Moon, Sun, Bell, User, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import "./studentsetting.css";
import "./StudentStyle.css";

export default function Settings() {
  const { theme, toggleTheme, logout, settings, setSettings, t } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    setSettings({ ...settings, language: e.target.value });
    localStorage.setItem("language", e.target.value);
  };

  return (
    <div className="student-settings-page">
      <h2 className="student-page-title">{t("settings")}</h2>

      <div className="student-settings-card">
        {/* THEME TOGGLE */}
        <div className="student-setting-item">
          <div>
            <h4>
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "dark" ? ` ${t("dark_mode")}` : ` ${t("light_mode")}`}
            </h4>
            <p>{t("switch_theme")}</p>
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
            <h4>
              <Bell size={18} /> {t("notifications")}
            </h4>
            <p>{t("enable_disable_notifications")}</p>
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
            <h4>
              <User size={18} /> {t("account")}
            </h4>
            <p>{t("manage_account")}</p>
          </div>

          <button
            className="student-action-btn"
            onClick={() => navigate("/student/profile")}
          >
            {t("update_info")}
          </button>
        </div>

        {/* LANGUAGE SELECTOR */}
        <div className="student-setting-item">
          <div>
            <h4>
              <Globe size={18} /> {t("language")}
            </h4>
            <p>{t("select_language")}</p>
          </div>

          <select
            className="student-language-select"
            value={settings.language || "en"}
            onChange={handleLanguageChange}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--student-border-card)",
              background: "var(--student-bg-card)",
              color: "var(--student-text-main)",
              cursor: "pointer",
            }}
          >
            <option value="en">{t("english")}</option>
            <option value="fr">{t("french")}</option>
          </select>
        </div>

        {/* LOGOUT */}
        <div className="student-setting-item">
          <div>
            <h4>
              <LogOut size={18} /> {t("logout")}
            </h4>
            <p>{t("sign_out")}</p>
          </div>

          <div className="student-logout-btn" onClick={handleLogout}>
            <LogOut className="student-logout-icon" />
            <p>{t("logout")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
