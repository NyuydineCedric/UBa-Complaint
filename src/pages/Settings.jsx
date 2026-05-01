import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./Settings.css";

function Settings() {
  const { settings, setSettings, toggleDarkMode, darkMode, t } =
    useContext(AppContext);
  const [localSettings, setLocalSettings] = useState(settings);
  const [message, setMessage] = useState("");

  const handleSettingChange = (key, value) =>
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  const handleSave = () => {
    setSettings(localSettings);
    setMessage(t("settings_saved"));
    setTimeout(() => setMessage(""), 3000);
  };
  const handleDarkModeToggle = () => {
    toggleDarkMode();
    setMessage(darkMode ? t("switched_to_light") : t("switched_to_dark"));
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="settings-page">
      <div className="page-heading">
        <div>
          <h1>{t("settings_title")}</h1>
          <p>{t("settings_subtitle")}</p>
        </div>
        <button className="primary-button" onClick={handleSave}>
          {t("save_changes")}
        </button>
      </div>
      {message && (
        <div
          className="settings-message"
          style={{
            background: message.includes(t("settings_saved"))
              ? "#DCFCE7"
              : "#DBEAFE",
            color: message.includes(t("settings_saved"))
              ? "#166534"
              : "#1E40AF",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}
      <div className="settings-grid">
        <div className="settings-card">
          <h2>{t("system_information")}</h2>
          <label>
            {t("system_name")}
            <input
              type="text"
              value="UBa Complaint Management System"
              readOnly
            />
          </label>
          <label>
            {t("admin_email")}
            <input type="email" value="admin@uba.edu" readOnly />
          </label>
          <label>
            {t("language")}
            <select
              value={localSettings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
            >
              <option value="English">{t("english")}</option>
              <option value="French">{t("french")}</option>
            </select>
          </label>
        </div>
        <div className="settings-card">
          <h2>{t("appearance")}</h2>
          <label>
            {t("theme")}
            <select
              value={darkMode ? "Dark" : "Light"}
              onChange={handleDarkModeToggle}
            >
              <option value="Light">{t("light")}</option>
              <option value="Dark">{t("dark")}</option>
            </select>
          </label>
          <label className="toggle-row">
            <span>{t("enable_notifications")}</span>
            <input
              type="checkbox"
              checked={localSettings.notifications}
              onChange={(e) =>
                handleSettingChange("notifications", e.target.checked)
              }
            />
          </label>
          <label className="toggle-row">
            <span>{t("browser_notifications")}</span>
            <input
              type="checkbox"
              checked={localSettings.browserNotifications}
              onChange={(e) =>
                handleSettingChange("browserNotifications", e.target.checked)
              }
            />
          </label>
        </div>
      </div>
      <div className="settings-card full-width">
        <h2>{t("other_settings")}</h2>
        <div className="grid-two-columns">
          <label>
            {t("items_per_page")}
            <input
              type="number"
              value={localSettings.itemsPerPage}
              onChange={(e) =>
                handleSettingChange("itemsPerPage", parseInt(e.target.value))
              }
              min="5"
              max="100"
            />
          </label>
          <label>
            {t("default_date_range")}
            <select
              value={localSettings.defaultDateRange}
              onChange={(e) =>
                handleSettingChange("defaultDateRange", e.target.value)
              }
            >
              <option value="Last 30 Days">{t("last_30_days")}</option>
              <option value="Last 7 Days">{t("last_7_days")}</option>
              <option value="Last 90 Days">{t("last_90_days")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </label>
        </div>
      </div>
      <div className="settings-card full-width">
        <h2>{t("system_status")}</h2>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-indicator online"></div>
            <div>
              <strong>{t("database")}</strong>
              <p>{t("database_status")}</p>
            </div>
          </div>
          <div className="status-item">
            <div className="status-indicator online"></div>
            <div>
              <strong>{t("email_service")}</strong>
              <p>{t("email_status")}</p>
            </div>
          </div>
          <div className="status-item">
            <div className="status-indicator online"></div>
            <div>
              <strong>{t("file_storage")}</strong>
              <p>{t("storage_status")}</p>
            </div>
          </div>
          <div className="status-item">
            <div className="status-indicator maintenance"></div>
            <div>
              <strong>{t("backup_system")}</strong>
              <p>{t("backup_status")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
