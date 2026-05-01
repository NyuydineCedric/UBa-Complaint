import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AllComplaints from "./pages/AllComplaints";

import Reports from "./pages/Reports";
import Schools from "./pages/Schools";

import Users from "./pages/Users";
import Settings from "./pages/Settings";
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
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
