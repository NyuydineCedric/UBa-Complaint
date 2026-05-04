// src/components/Layout.js
import { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  School,
  Users,
  Settings,
  Menu,
  Sun,
  Moon,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import "./Layout.css";
import ubalogo from "../assets/ubalogo.png";

function Layout() {
  const {
    darkMode,
    toggleDarkMode,
    t,
    currentUser,
    logout,
    notifications,
    markNotificationRead,
    unreadCount,
  } = useContext(AppContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleNotificationClick = (id) => {
    markNotificationRead(id);
    setShowNotifications(false);
    // optionally navigate to the related complaint
  };

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
            <LayoutDashboard size={20} className="nav-icon" />
            {!sidebarCollapsed && (
              <span className="nav-text">{t("dashboard")}</span>
            )}
          </Link>
          <Link to="/complaints" className="nav-item">
            <FileText size={20} className="nav-icon" />
            {!sidebarCollapsed && (
              <span className="nav-text">{t("complaints")}</span>
            )}
          </Link>
          <Link to="/reports" className="nav-item">
            <BarChart3 size={20} className="nav-icon" />
            {!sidebarCollapsed && (
              <span className="nav-text">{t("reports")}</span>
            )}
          </Link>
          <Link to="/schools" className="nav-item">
            <School size={20} className="nav-icon" />
            {!sidebarCollapsed && (
              <span className="nav-text">{t("schools")}</span>
            )}
          </Link>
          {currentUser?.role === "super_admin" && (
            <Link to="/users" className="nav-item">
              <Users size={20} className="nav-icon" />
              {!sidebarCollapsed && (
                <span className="nav-text">{t("users")}</span>
              )}
            </Link>
          )}
          <Link to="/settings" className="nav-item">
            <Settings size={20} className="nav-icon" />
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
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <input type="text" placeholder={t("search_placeholder")} />
              <Search size={16} className="search-icon" />
            </div>
          </div>
          <div className="header-right">
            <div className="notification-wrapper">
              <button
                className="notification-btn"
                onClick={toggleNotifications}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    Notifications ({unreadCount} unread)
                  </div>
                  {notifications.length === 0 ? (
                    <div className="dropdown-empty">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`dropdown-item ${notif.unread ? "unread" : ""}`}
                        onClick={() => handleNotificationClick(notif.id)}
                      >
                        <div className="notification-title">{notif.title}</div>
                        <div className="notification-desc">
                          {notif.description}
                        </div>
                        <div className="notification-time">{notif.time}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button className="theme-toggle-header" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span style={{ marginLeft: "8px" }}>
                {darkMode ? "Light" : "Dark"}
              </span>
            </button>
            <div className="user-profile">
              <img src={ubalogo} alt="User" className="profile-img" />
              <div className="user-info-header">
                <span className="profile-name">
                  {currentUser?.name || "Administrator"}
                </span>
              </div>
              <button className="logout-btn-header" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
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
