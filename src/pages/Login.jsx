import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import ubalogo from "../assets/ubalogo.png";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [role, setRole] = useState("admin");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo admin credentials (single admin)
  const demoAdmin = {
    studentId: "ADM001",
    email: "admin@unibamenda.cm",
    password: "admin123",
    name: "Administrator",
    department: "Administration",
    role: "admin", // simplified: just "admin"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!studentId || !email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // Admin login (single admin)
      if (role === "admin" && studentId === demoAdmin.studentId) {
        if (email === demoAdmin.email && password === demoAdmin.password) {
          const user = {
            id: demoAdmin.studentId,
            name: demoAdmin.name,
            email: demoAdmin.email,
            studentId: demoAdmin.studentId,
            role: "admin",
            department: demoAdmin.department,
          };
          login(user);
          navigate("/");
          setIsLoading(false);
          return;
        } else {
          setError("Invalid admin credentials");
          setIsLoading(false);
          return;
        }
      }

      // Student login (registered users)
      if (role === "student") {
        const registeredUsers = JSON.parse(
          localStorage.getItem("registeredUsers") || "[]",
        );
        const foundUser = registeredUsers.find(
          (u) =>
            u.studentId === studentId &&
            u.email === email &&
            u.password === password,
        );
        if (foundUser) {
          const user = {
            id: foundUser.studentId,
            name: foundUser.name,
            email: foundUser.email,
            studentId: foundUser.studentId,
            role: "student",
            department: foundUser.department,
            school: foundUser.school,
          };
          login(user);
          navigate("/");
          setIsLoading(false);
          return;
        } else {
          setError("Invalid student credentials or not registered");
          setIsLoading(false);
          return;
        }
      }

      setError("Invalid login attempt");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={ubalogo} alt="UBa Logo" className="login-logo" />
          <h1>UBa Complaint System</h1>
          <p>University of Bamenda</p>
          <p className="login-subtitle">
            Student Complaint Management Platform
          </p>
        </div>

        <div className="role-selection">
          <label>Login As</label>
          <div className="role-buttons">
            <button
              type="button"
              className={`role-btn ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>{role === "student" ? "Student ID" : "Admin ID"}</label>
            <div className="input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder={
                  role === "student" ? "e.g., UBa24NC001" : "e.g., ADM001"
                }
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
