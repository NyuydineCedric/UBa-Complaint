// pages/Student/Components/StudentLayout.jsx
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Sidebar from "./studentSidebar";
import Topbar from "./studentTopbar";
import ToastContainer from "./Toast";
import "./studentlayout.css";
import "../StudentStyle.css";

import { AppContext } from "../../../context/AppContext";
import { 
  Home, 
  FileText, 
  PlusCircle, 
  User, 
  Settings,
  LayoutDashboard
} from "lucide-react";

function Layout() {
  const { toasts, removeToast, darkMode } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Bottom Navigation Items
  const mobileNavItems = [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "Complaints", path: "/student/complaints", icon: FileText },
    { name: "Submit", path: "/student/submit", icon: PlusCircle },
    { name: "Profile", path: "/student/profile", icon: User },
    { name: "Settings", path: "/student/settings", icon: Settings },
  ];

  return (
    <div className="student-layout">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}
      
      <div className="student-layout-right">
        <Topbar />
        <div className="student-layout-content">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="student-mobile-bottom-nav">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                            (item.path !== "/student" && location.pathname.startsWith(item.path));
            
            return (
              <button
                key={item.path}
                className={`student-mobile-nav-item ${isActive ? "active" : ""}`}
                onClick={() => navigate(item.path)}
              >
                <Icon />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default Layout;