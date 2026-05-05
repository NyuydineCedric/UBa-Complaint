// pages/Student/Components/StudentLayout.jsx
import { Outlet } from "react-router-dom";
import { useContext } from "react";

import Sidebar from "./studentSidebar";
import Topbar from "./studentTopbar";
import ToastContainer from "./Toast";
import "./studentlayout.css";
import "../StudentStyle.css";

import { AppContext } from "../../../context/AppContext";

function Layout() {
  const { toasts, removeToast } = useContext(AppContext);

  return (
    <div className="student-layout">
      <Sidebar />
      <div className="student-layout-right">
        <Topbar />
        <div className="student-layout-content">
          <Outlet />
        </div>
      </div>
      {/* Toast appears only once here */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default Layout;
