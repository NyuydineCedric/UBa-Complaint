// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import uba from "../assets/uba.jpg";
import ubalogo from "../assets/ubalogo.png";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Demo admin credentials
  const demoCredentials = {
    admin: {
      studentId: "ADM001",
      email: "admin@unibamenda.cm",
      password: "admin123",
      name: "Administrator",
      department: "Administration",
    },
  };

  const getRegisteredUsers = () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
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

      // Admin demo login
      if (role === "admin" && studentId === demoCredentials.admin.studentId) {
        if (
          email === demoCredentials.admin.email &&
          password === demoCredentials.admin.password
        ) {
          const user = {
            id: studentId,
            name: demoCredentials.admin.name,
            email: email,
            studentId: studentId,
            role: "admin",
            department: demoCredentials.admin.department,
          };
          login(user);
          navigate("/admin-dashboard");
          setIsLoading(false);
          return;
        }
      }

      // Registered users
      const registeredUsers = getRegisteredUsers();
      const foundUser = registeredUsers.find(
        (u) => u.studentId === studentId && u.role === role,
      );

      if (!foundUser) {
        setError(`Invalid ${role === "student" ? "Student" : "Admin"} ID`);
        setIsLoading(false);
        return;
      }

      if (foundUser.email !== email || foundUser.password !== password) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      const user = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        studentId: foundUser.studentId,
        role: foundUser.role,
        department: foundUser.department,
        courseCode: foundUser.courseCode,
      };

      login(user);
      navigate(role === "student" ? "/student-dashboard" : "/admin-dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundImageUrl = uba;

  const pageContainerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    padding: isMobile ? "1rem" : "2rem",
  };

  const loginCardStyle = {
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.15)",
    padding: isMobile ? "1.5rem" : "2rem",
    width: "100%",
    maxWidth: isMobile ? "100%" : "28rem",
    margin: "0 auto",
  };

  const loginHeaderStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const loginHeaderTitleStyle = {
    fontSize: isMobile ? "1.5rem" : "1.875rem",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 0.5rem 0",
  };

  const loginHeaderTextStyle = {
    color: "#6b7280",
    margin: "0.5rem 0 0 0",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#374151",
  };

  const roleButtonsContainerStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  };

  const roleButtonStyle = (isActive) => ({
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: isActive ? "#0f3a7d" : "#e5e7eb",
    color: isActive ? "white" : "#374151",
    width: "100%",
  });

  const inputWrapperStyle = {
    position: "relative",
  };

  const inputIconStyle = {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    pointerEvents: "none",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontFamily: "inherit",
    backgroundColor: "white",
    color: "#111827",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  };

  const inputNoIconStyle = {
    ...inputStyle,
    paddingLeft: "0.75rem",
  };

  const passwordToggleStyle = {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "0.5rem",
  };

  const errorMessageStyle = {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    border: "1px solid #fecaca",
    textAlign: "center",
    marginBottom: "1rem",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(135deg, #0f3a7d 0%, #1e5a9e 100%)",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "0.5rem",
  };

  const registerLinkStyle = {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.875rem",
    color: "#6b7280",
  };

  const linkStyle = {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  };

  return (
    <div style={pageContainerStyle}>
      <div style={loginCardStyle}>
        {/* Header */}
        <div style={loginHeaderStyle}>
          <img
            src={ubalogo}
            alt="UBa Logo"
            style={{ width: "200px", marginTop: "70px" }}
          />
          <h1 style={loginHeaderTitleStyle}>UBa Complaint System</h1>
          <p style={loginHeaderTextStyle}>University of Bamenda</p>
          <p
            style={{
              ...loginHeaderTextStyle,
              marginTop: "0.25rem",
              fontSize: "0.875rem",
            }}
          >
            Student Complaint Management Platform
          </p>
        </div>

        {/* Role selection */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Login As</label>
          <div style={roleButtonsContainerStyle}>
            <button
              type="button"
              onClick={() => setRole("student")}
              style={roleButtonStyle(role === "student")}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              style={roleButtonStyle(role === "admin")}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Student/Admin ID */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>
              {role === "student" ? "Student ID" : "Admin ID"}
            </label>
            <div style={inputWrapperStyle}>
              <FaUser style={inputIconStyle} />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder={
                  role === "student" ? "e.g., UBa24NC001" : "e.g., ADM001"
                }
                style={inputStyle}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              style={inputNoIconStyle}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <FaLock style={inputIconStyle} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={inputStyle}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={passwordToggleStyle}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div style={errorMessageStyle}>{error}</div>}

          <button type="submit" disabled={isLoading} style={submitButtonStyle}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <div style={registerLinkStyle}>
          Don't have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
