// pages/Login.jsx
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";

import ubalogo from "../assets/ubalogo.png";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login, register, showToast, darkMode } = useContext(AppContext);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setStudentId("");
    setEmail("");
    setPassword("");
    setError("");
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

      // ADMIN LOGIN
      if (role === "admin") {
        if (
          studentId === "ADM001" &&
          email === "admin@unibamenda.cm" &&
          password === "admin123"
        ) {
          try {
            await register({
              matricule: "ADM001",
              email: "admin@unibamenda.cm",
              password: "admin123",
              name: "Administrator",
              role: "admin",
              department: "Administration",
              school: "University of Bamenda",
              createdAt: new Date().toISOString(),
            });
          } catch (err) {
            // Admin may already exist, that's okay.
          }

          const success = await login(email, password, studentId);
          if (success) {
            showToast("Welcome back, Admin!", "success");
            navigate("/");
            return;
          }
        }

        setError("Invalid admin credentials");
        setIsLoading(false);
        return;
      }

      // STUDENT LOGIN
      if (role === "student") {
        // Login using the context login function
        const success = await login(email, password, studentId);
        if (success) {
          showToast("Welcome back, Student!", "success");
          navigate("/student");
          return;
        } else {
          setError("Invalid student credentials");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <div className="role-selection">
          <label>Login as</label>
          <div className="role-buttons">
            <button
              type="button"
              className={`role-btn ${role === "student" ? "active" : ""}`}
              onClick={() => handleRoleChange("student")}
            >
              <User size={16} /> Student
            </button>
            <button
              type="button"
              className={`role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => handleRoleChange("admin")}
            >
              <Lock size={16} /> Admin
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>{role === "student" ? "Matricule" : "Admin ID"}</label>
            <div className="input-icon-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                placeholder={
                  role === "student" ? "Enter your matricule" : "Enter admin ID"
                }
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign In"}
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
