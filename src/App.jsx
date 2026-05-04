import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext, AppProvider } from "./context/AppContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AllComplaints from "./pages/AllComplaints";
import Reports from "./pages/Reports";
import Schools from "./pages/Schools";
import ComplaintDetail from "./pages/ComplaintDetail";
import Settings from "./pages/Settings";

// ✅ STUDENT IMPORTS
import StudentLayout from "./pages/Student/Components/StudentLayout";
import StudentDashboard from "./pages/Student/StudentDashbaord";
import Complaints from "./pages/Student/Complaint";
import SubmitComplaint from "./pages/Student/SubmitComplaint";
import StudentProfile from "./pages/Student/Profile";
import StudentSettings from "./pages/Student/StudentSetting";
import StudentComplaintDetail from "./pages/Student/StudentComplaintDetail";

import "./App.css";

function AppRoutes() {
  const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/"
        element={currentUser ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="complaints" element={<AllComplaints />} />
        <Route path="reports" element={<Reports />} />
        <Route path="schools" element={<Schools />} />
        <Route path="complaints/:id" element={<ComplaintDetail />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ✅ STUDENT ROUTES (your addition) */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="submit" element={<SubmitComplaint />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="complaints/:id" element={<StudentComplaintDetail />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
