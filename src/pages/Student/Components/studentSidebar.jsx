// pages/Student/Components/studentSidebar.jsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import Logo from "../../../assets/ubalogo.png";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import "./studentsidebar.css";
import "../StudentStyle.css";

export default function Sidebar() {
  const { logout, t } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: t("dashboard"), path: "/student", icon: LayoutDashboard },
    { name: t("submit_complaint"), path: "/student/submit", icon: PlusCircle },
    { name: t("my_complaints"), path: "/student/complaints", icon: FileText },
    { name: t("profile"), path: "/student/profile", icon: User },
    { name: t("settings"), path: "/student/settings", icon: Settings },
  ];

  return (
    <div className="student-sidebar">
      {/* LOGO */}
      <div className="student-logo">
        <img
          src={Logo}
          alt="school-logo"
          className="student-logo-image"
        />
        <div className="student-logo-text">
          <p className="student-logo-header">{t("student_portal")}</p>
          <p className="student-logo-paragraph">{t("complaint_system")}</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="student-nav">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/student" &&
              location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/student"}
              className={({ isActive: navActive }) =>
                navActive || isActive
                  ? "student-nav-link active"
                  : "student-nav-link"
              }
            >
              <Icon className="student-icon" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="student-sidebar-footer">
        <div className="student-sidebar-logout-btn" onClick={handleLogout}>
          <LogOut className="student-logout-icon" />
          <p>{t("logout")}</p>
        </div>
        <p className="student-sidebar-footer-text">
          © 2026 {t("student_system")}
        </p>
      </div>
    </div>
  );
}