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

const navItems = [
  { name: "Dashboard", path: "/student", icon: LayoutDashboard },
  { name: "Submit Complaint", path: "/student/submit", icon: PlusCircle },
  { name: "My Complaints", path: "/student/complaints", icon: FileText },
  { name: "Profile", path: "/student/profile", icon: User },
  { name: "Settings", path: "/student/settings", icon: Settings },
];

export default function Sidebar() {
  const { logout } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="student-sidebar">
      {/* LOGO */}
      <div className="student-logo">
        <img
          src={Logo}
          alt="school-logo"
          className="student-logo-image"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="student-logo-text">
          <p className="student-logo-header">Student Portal</p>
          <p className="student-logo-paragraph">Complaint System</p>
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
          <p>Logout</p>
        </div>
        <p style={{ fontSize: "11px", color: "var(--student-text-secondary)" }}>
          © 2026 Student System
        </p>
      </div>
    </div>
  );
}
