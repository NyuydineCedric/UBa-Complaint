import { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Layout.css";

function Layout() {
  const { darkMode, toggleDarkMode, t } = useContext(AppContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className={`layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">
            <span className="logo-text">UBa</span>
          </div>
          {!sidebarCollapsed && <h2>{t("app_name")}</h2>}
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <span className="nav-icon">📊</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("dashboard")}</span>
            )}
          </Link>
          <Link to="/complaints" className="nav-item">
            <span className="nav-icon">📋</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("complaints")}</span>
            )}
          </Link>
          <Link to="/reports" className="nav-item">
            <span className="nav-icon">📈</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("reports")}</span>
            )}
          </Link>
          <Link to="/schools" className="nav-item">
            <span className="nav-icon">🏫</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("schools")}</span>
            )}
          </Link>
          <Link to="/users" className="nav-item">
            <span className="nav-icon">👤</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("users")}</span>
            )}
          </Link>
          <Link to="/settings" className="nav-item">
            <span className="nav-icon">⚙️</span>
            {!sidebarCollapsed && (
              <span className="nav-text">{t("settings")}</span>
            )}
          </Link>
        </nav>
        <div className="sidebar-footer"></div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button className="hamburger-btn" onClick={toggleSidebar}>
              ☰
            </button>
            <div className="search-bar">
              <input type="text" placeholder={t("search_placeholder")} />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-btn">🔔</button>
            <button className="theme-toggle-header" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="profile-img"
              />
              <span className="profile-name">Administrator</span>
            </div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
