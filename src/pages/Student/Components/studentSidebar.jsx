import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "../../../assets/logo.jpg"
import "./studentsidebar.css";
import "../StudentStyle.css";

const navItems = [
  { name: "Dashboard", path: "/Student", icon: LayoutDashboard },
  { name: "Submit Complaint", path: "/Student/submit", icon: PlusCircle },
  { name: "My Complaints", path: "/Student/complaints", icon: FileText },
  { name: "Profile", path: "/Student/profile", icon: User },
  { name: "Settings", path: "/Student/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="student-sidebar">

      <div className="student-logo">
        <img src={Logo} alt="school-logo" className="student-logo-image" />
        <div className="student-logo-text">
           <p className="student-logo-header">Student Portal</p>
           <p className="student-logo-paragraph">Complaint System</p>
        </div>
        </div>
      
      <nav className="student-nav">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "student-nav-link active" : "student-nav-link"
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
        <div className="student-sidebar-logout-btn">
            <LogOut className="student-logout-icon" />
            <p>Logout</p>
          </div>
        © 2026 Student System
      </div>
    </div>
  );
}