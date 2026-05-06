// pages/Register.jsx
import { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { SCHOOLS_DATA } from "../utils/schoolData";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  IdCard,
  GraduationCap,
  School,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import ubalogo from "../assets/ubalogo.png";
import "./Register.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, login, showToast, darkMode } = useContext(AppContext);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    matricule: "",
    email: "",
    phoneNumber: "",
    school: "",
    level: "",
    department: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "school") {
      setFormData((prev) => ({
        ...prev,
        school: value,
        department: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const departmentOptions = useMemo(() => {
    const school = SCHOOLS_DATA.find((item) => item.id === formData.school);
    return school ? school.departments : [];
  }, [formData.school]);

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.matricule ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.school ||
      !formData.department
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        matricule: formData.matricule,
        phoneNumber: formData.phoneNumber || "",
        school: formData.school || "",
        level: formData.level || "",
        department: formData.department || "",
        role: "student",
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      await register(newUser);
      const success = await login(
        formData.email,
        formData.password,
        formData.matricule,
      );

      if (!success) {
        throw new Error("Registration succeeded but login failed.");
      }

      setRegistrationSuccess(true);
      showToast("Account created successfully! Redirecting...", "success");

      setTimeout(() => {
        navigate("/student");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="register-container">
        <div className="register-card success-card">
          <CheckCircle size={56} color="#10b981" />
          <h1>Registration Successful! 🎉</h1>
          <p>Your account has been created successfully.</p>
          <p>You will be redirected to your dashboard shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          {/* HEADER */}
          <div className="register-header">
            <img src={ubalogo} alt="UBa Logo" className="register-logo" />
            <h1>Create Account</h1>
            <p>Join the UBa Complaint System</p>
            <p className="register-subtitle">
              Fill in your details to get started
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="error-message" style={{ marginBottom: "20px" }}>
              <AlertCircle
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="section-title">Personal Information</div>

            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Matricule *</label>
              <div className="input-wrapper">
                <IdCard className="input-icon" size={18} />
                <input
                  type="text"
                  name="matricule"
                  className="input-field"
                  placeholder="Enter your matricule"
                  value={formData.matricule}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  name="phoneNumber"
                  className="input-field"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Academic Information - REORDERED: School, Level, Department */}
            <div className="section-title">Academic Information</div>

            <div className="form-group">
              <label>School</label>
              <div className="input-wrapper">
                <School className="input-icon" size={18} />
                <select
                  name="school"
                  className="input-field"
                  value={formData.school}
                  onChange={handleChange}
                >
                  <option value="">Select School</option>
                  {SCHOOLS_DATA.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name} ({school.shortName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Level</label>
              <div className="input-wrapper">
                <GraduationCap className="input-icon" size={18} />
                <select
                  name="level"
                  className="input-field"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Level 4">Level 4</option>
                  <option value="Level 5">Level 5</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <div className="input-wrapper">
                <GraduationCap className="input-icon" size={18} />
                <select
                  name="department"
                  className="input-field"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!formData.school}
                >
                  <option value="">
                    {formData.school
                      ? "Select Department"
                      : "Select school first"}
                  </option>
                  {departmentOptions.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Security */}
            <div className="section-title">Security</div>

            <div className="form-group">
              <label>Password *</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input-field"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="form-group">
              <label>Confirm Password *</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            {/* SUBMIT */}
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="login-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="register-info-box">
          <h2>📋 Registration Guide</h2>
          <div style={{ marginTop: "10px" }}>
            <p>
              <strong>Step 1:</strong> Fill in your personal details
            </p>
            <p>
              <strong>Step 2:</strong> Provide your academic information
            </p>
            <p>
              <strong>Step 3:</strong> Create a secure password
            </p>
            <p>
              <strong>Step 4:</strong> Accept the terms and submit
            </p>
          </div>
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "rgba(99, 102, 241, 0.1)",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#4F46E5" }}>
              <strong>Note:</strong> Use your university email and valid
              matricule for registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
