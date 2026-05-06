import { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ubalogo from "../assets/ubalogo.png";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  School,
  Settings,
  Menu,
  Sun,
  Moon,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import "./Layout.css";

function Layout() {
  const {
    darkMode,
    toggleDarkMode,
    t,

    logout,
    unreadNotifications,
    setUnreadNotifications,
    complaints,
  } = useContext(AppContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
    setShowNotifications(!showNotifications);
  };

  const handleViewComplaint = (id) => {
    setShowNotifications(false);
    navigate(`/complaints/${id}`);
  };

  // Get recent complaints for notifications
  const recentComplaints = complaints
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .slice(0, 5);

  return (
    <div className={`layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">
            <img src={ubalogo} alt="UBa Logo" className="logo-img" />
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
            <div className="notification-container">
              <button
                className="notification-btn"
                onClick={handleNotificationClick}
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="notification-badge">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Recent Complaints</h4>
                  </div>
                  <div className="notification-list">
                    {recentComplaints.length === 0 ? (
                      <div className="notification-item empty">
                        No recent complaints
                      </div>
                    ) : (
                      recentComplaints.map((complaint) => (
                        <div
                          key={complaint.id}
                          className="notification-item"
                          onClick={() => handleViewComplaint(complaint.id)}
                        >
                          <div className="notification-content">
                            <div className="notification-student">
                              <strong>{complaint.name}</strong>
                              <span className="notification-matricule">
                                {complaint.matricule}
                              </span>
                            </div>
                            <div className="notification-school">
                              {complaint.school}
                            </div>
                            <div className="notification-course">
                              {complaint.course} - {complaint.type}
                            </div>
                            <div className="notification-status">
                              <span
                                className={`status-badge status-${complaint.status}`}
                              >
                                {complaint.status}
                              </span>
                            </div>
                          </div>
                          <div className="notification-time">
                            {new Date(
                              complaint.submittedDate,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
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
                <span className="profile-name">Administrator</span>
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
