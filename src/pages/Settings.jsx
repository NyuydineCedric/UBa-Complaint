import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Save, Moon, Sun, Info, Palette, CheckCircle } from "lucide-react";
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
    localStorage.setItem("language", localSettings.language);
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
          <Save size={16} style={{ marginRight: "8px" }} />
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
          }}
        >
          {message.includes(t("settings_saved")) ? (
            <CheckCircle
              size={16}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
          ) : null}
          {message}
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-card">
          <h2>
            <Info
              size={18}
              style={{
                marginRight: "8px",
                verticalAlign: "middle",
                textAlign: "center",
              }}
            />
            {t("system_information")}
          </h2>
          <label style={{ display: "flex", gap: "80px" }}>
            {t("system_name")}
            <input
              type="text"
              value="UBa Complaint Management System"
              readOnly
            />
          </label>
          <label style={{ display: "flex", gap: "80px" }}>
            {t("admin_email")}
            <input type="email" value="admin@uniba.cm" readOnly />
          </label>
        </div>

        <div className="settings-card">
          <h2>
            <Palette
              size={18}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            {t("appearance")}
          </h2>
          <label style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {darkMode ? (
              <Moon
                size={14}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
            ) : (
              <Sun
                size={14}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
            )}
            {t("theme")}
            <select
              value={darkMode ? "Dark" : "Light"}
              onChange={handleDarkModeToggle}
            >
              <option value="Light">{t("light")}</option>
              <option value="Dark">{t("dark")}</option>
            </select>
          </label>
          <label
            style={{
              display: "flex",
              gap: "35px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {t("language")}
            <select
              value={localSettings.language}
              onChange={(e) => {
                handleSettingChange("language", e.target.value);
                localStorage.setItem("language", e.target.value);
              }}
            >
              <option value="en">{t("english")}</option>
              <option value="fr">{t("french")}</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
