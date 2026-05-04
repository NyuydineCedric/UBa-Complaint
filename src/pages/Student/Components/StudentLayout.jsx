import { Outlet } from "react-router-dom";
import Sidebar from "./studentSidebar";
import Topbar from "./studentTopbar";
import "./studentlayout.css";
import "../StudentStyle.css";
function Layout() {
  return (
    <div className="student-layout">
      <Sidebar />
      <div className="student-layout-right">
        <Topbar />
        <div className="student-layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
