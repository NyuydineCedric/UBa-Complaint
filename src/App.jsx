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

function AppRoutes() {
  const { currentUser } = useContext(AppContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
