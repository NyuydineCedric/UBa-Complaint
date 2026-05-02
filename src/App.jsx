import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AllComplaints from "./pages/AllComplaints";

import Reports from "./pages/Reports";
import Schools from "./pages/Schools";

import Users from "./pages/Users";
import Settings from "./pages/Settings";

import StudentLayout from "./pages/Student/Components/StudentLayout";
import StudentDashboard from "./pages/Student/StudentDashbaord";
import Complaints from "./pages/Student/Complaint";
import SubmitComplaint from "./pages/Student/SubmitComplaint";
import StudentProfile from "./pages/Student/Profile";
import StudentSettings from "./pages/Student/StudentSetting";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/complaints" element={<AllComplaints />} />

            <Route path="/reports" element={<Reports />} />
            <Route path="/schools" element={<Schools />} />

            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* STUDENT ROUTES */}
          <Route path="/Student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="submit" element={<SubmitComplaint />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
