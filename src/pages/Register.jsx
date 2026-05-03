import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
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
} from "lucide-react";
import ubalogo from "../assets/ubalogo.png";
import "./Register.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    phoneNumber: "",
    department: "",
    level: "",
    school: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Full schools data (as in original TypeScript)
  const schools = [
    {
      name: "College of Technology - COLTECH",
      departments: [
        { code: "ABT", name: "Agribusiness Technology" },
        { code: "AEE", name: "Agricultural and environmental Engineering" },
        { code: "APT", name: "Animal Production Technology" },
        { code: "CE", name: "Civil Engineering" },
        { code: "CEN", name: "Computer Engineering" },
        { code: "CPT", name: "Crop Production Technology" },
        { code: "EEEP", name: "Electrical and Electronic Engineering" },
        { code: "ET", name: "Engineering and Technology" },
        { code: "FWT", name: "Forestry and Wildlife Technology" },
        { code: "HESW", name: "Home Economics and Social Work" },
        { code: "NFBT", name: "Nutrition, Food and Bioresource Technology" },
        { code: "REEP", name: "Renewable Energy Technology" },
      ],
    },
    {
      name: "Faculty of Arts - FA",
      departments: [
        { code: "CDS", name: "Communication and Developement Studies" },
        { code: "ED", name: "Education" },
        { code: "ENG", name: "English" },
        { code: "ELDIC", name: "English, Literature and Digital Cultures" },
        { code: "GP", name: "Geography and Planning" },
        { code: "HISA", name: "History, Heritage and International Studies" },
        { code: "LAL", name: "Linguistics and African Languages" },
        { code: "PVA", name: "Performing and Visual Arts" },
        { code: "PHI", name: "Philosophy" },
        { code: "PY", name: "Psychology" },
        { code: "UBALAC", name: "University of Bamenda Language Center" },
      ],
    },
    {
      name: "Faculty of Economics and Management Sciences - FEMS",
      departments: [
        { code: "ACC", name: "Accounting" },
        { code: "BNF", name: "Banking and Finance" },
        { code: "BF", name: "Business and Finance" },
        { code: "ECN", name: "Economics" },
        { code: "MGT", name: "Management and Marketing" },
      ],
    },
    {
      name: "Faculty of Education - FED",
      departments: [
        { code: "BRC", name: "BEREAVEMENT COUNSELING" },
        { code: "CPY", name: "COUNSELING PSYCHOLOGY" },
        { code: "CUP", name: "CURRICULUM AND PEDAGOGY" },
        { code: "DED", name: "DISTANCE EDUCATION" },
        { code: "EFA", name: "Educational Foundation" },
        { code: "EDL", name: "EDUCATIONAL LEADERSHIP" },
        { code: "EPY", name: "EDUCATIONAL PSYCHOLOGY" },
        { code: "IPY", name: "INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY" },
        { code: "PEA", name: "PHYSICAL EDUCATION AND ANIMATION" },
        { code: "SCC", name: "SCHOOL COUNSELING" },
        { code: "SPTS", name: "SPORTS" },
        { code: "TED", name: "TEACHER EDUCATION" },
      ],
    },
    {
      name: "Faculty of Health Sciences - FHS",
      departments: [
        { code: "BMS", name: "Biomedical Science" },
        { code: "CLS", name: "Clinical Science" },
        { code: "MD", name: "GENERAL MEDICINE" },
        { code: "MBMS", name: "Medical and BioMedical Sciences" },
        { code: "MLS", name: "Medical Laboratory Science" },
        { code: "NMW", name: "Nursing/Midwifery" },
        { code: "PHAM", name: "PHARMACY" },
        { code: "PH", name: "Public Health" },
      ],
    },
    {
      name: "Faculty of Law and Political Science - FLPS",
      departments: [
        { code: "CAPA", name: "Capacité en Droit" },
        { code: "EPL", name: "English Private Law" },
        { code: "FPL", name: "French Private Law" },
        { code: "POS", name: "Political Science" },
        { code: "PUL", name: "Public Law" },
      ],
    },
    {
      name: "Faculty of Science - FS",
      departments: [
        { code: "ZOO", name: "ZOOLOGY" },
        { code: "BCH", name: "Biochemistry" },
        { code: "BS", name: "Biological Science" },
        { code: "CHM", name: "Chemistry" },
        { code: "GMES", name: "Geology, Mining and Environmental Science" },
        { code: "MCS", name: "Mathematics and Computer Science" },
        { code: "MICP", name: "MICROBIOLOGY AND PARASITOLOGY" },
        { code: "PHY", name: "Physics" },
        { code: "BOT", name: "PLANT SCIENCES (BOTANY)" },
        { code: "TEE", name: "Thermal and Energy Engineering" },
      ],
    },
    {
      name: "Higher Institute of Commerce and Management - HICM",
      departments: [
        {
          code: "IMC",
          name: "INFORMATION AND COMMUNICATION MANAGEMENT SYSTEMS",
        },
        { code: "AFN", name: "Accounting and Finance" },
        { code: "INS", name: "Insurance" },
        { code: "MGTC", name: "Management and Entrepreneurship" },
        { code: "MKT", name: "Marketing" },
        { code: "MAB", name: "Money and Banking" },
        { code: "OGS", name: "ORGANIZATIONAL SCIENCES" },
      ],
    },
    {
      name: "Higher Institute of Transport and Logistics - HITL",
      departments: [
        { code: "ATR", name: "Air Transport" },
        { code: "CUS", name: "Customs" },
        { code: "GNS", name: "General Studies" },
        { code: "LTP", name: "Land Transport" },
        { code: "MTT", name: "Maritime Transport" },
        { code: "TM", name: "Tourism and Hospitality Management" },
        { code: "TLG", name: "Transit and Logistics" },
      ],
    },
    {
      name: "Higher Teacher Training College - HTTC",
      departments: [
        { code: "BIL", name: "Bilingual Letters" },
        { code: "BIO", name: "Biology" },
        { code: "CHM", name: "Chemistry" },
        { code: "CSC", name: "Computer Science" },
        { code: "ECONS", name: "Economics" },
        { code: "EML", name: "English Modern Letters" },
        { code: "FML", name: "French Modern Letters" },
        { code: "GEO", name: "Geography" },
        { code: "GELG", name: "Geology" },
        { code: "GNC", name: "Guidance and Counseling" },
        { code: "HIS", name: "History" },
        { code: "MAT", name: "Mathematics" },
        { code: "PHI", name: "Philosophy" },
        { code: "PHY", name: "Physics" },
        { code: "SED", name: "Science of Education" },
      ],
    },
    {
      name: "Higher Technical Teacher Training College - HTTTC",
      departments: [
        { code: "ADT", name: "Administrative Techniques" },
        { code: "CEFT", name: "Civil Engineering and Forestry Techniques" },
        { code: "CSC", name: "Computer Science" },
        { code: "ECS", name: "Economic Science" },
        { code: "EPE", name: "Electrical and Power Engineering" },
        { code: "EELEC", name: "Electronics and Electricity" },
        { code: "FS", name: "Fundamental Science" },
        { code: "LAW", name: "Law" },
        { code: "MEN", name: "Mechanical Engineering" },
        { code: "REEN", name: "Renewable Energy" },
        { code: "SED", name: "Science of Education" },
        { code: "SFM", name: "Social Economy and Family Management" },
      ],
    },
    {
      name: "HND/HPD/B.TECH ACADEMIC ORGAN - HND",
      departments: [
        { code: "AFSH", name: "Agriculture and Food Sciences" },
        { code: "BFM", name: "Business, Finance and Management" },
        { code: "CVEN", name: "Civil Engineering" },
        { code: "CME", name: "Computer Engineering (X)" },
        { code: "ED", name: "Education" },
        { code: "EEEH", name: "Electrical and Electronic Engineering" },
        { code: "FWT", name: "Forestry and Wildlife Technology" },
        { code: "HESW", name: "Home Economics and Social Work HND/BTECH" },
        { code: "JMH", name: "Journalism and Media" },
        { code: "LL", name: "Law" },
        { code: "MANH", name: "Management" },
        { code: "ME", name: "MECHANICAL ENGINEERING" },
        { code: "MBSH", name: "Medical and Biomedical Sciences" },
        { code: "TEE", name: "Thermal and Energy Engineering" },
        { code: "TM", name: "Tourism Management" },
        { code: "TMS", name: "Transport and Maritime Studies" },
        { code: "WWH", name: "Woodworks" },
      ],
    },
    {
      name: "National Higher Polytechnic Institute - NAHPI",
      departments: [
        {
          code: "CMC",
          name: "Centre for Cybersecurity and Mathematical Cryptology",
        },
        { code: "CBE", name: "Chemical and Biological Engineering" },
        { code: "CVL", name: "Civil Engineering and Architecture" },
        { code: "COM", name: "Computer Engineering" },
        { code: "EEEE", name: "Electrical and Electronic Engineering" },
        { code: "MEC", name: "Mechanical and Industrial Engineering" },
        { code: "MIN", name: "Mining and Mineral Engineering" },
        { code: "PET", name: "Petroleum Engineering" },
      ],
    },
  ];

  const getDepartmentsForSchool = (schoolName) => {
    const school = schools.find((s) => s.name === schoolName);
    return school ? school.departments : [];
  };

  const levels = [
    "Level 100",
    "Level 200",
    "Level 300",
    "Level 400",
    "Level 500",
    "Level 600",
    "Postgraduate",
  ];

  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;
    if (password.length >= 8) score += 1;
    else feedback.push("At least 8 characters");
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("At least one uppercase letter");
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("At least one lowercase letter");
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("At least one number");
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push("At least one special character");
    return { score, feedback };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name required";
    else if (formData.name.trim().length < 3)
      newErrors.name = "At least 3 characters";
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone required";
    else if (!/^(6|2)\d{8}$/.test(formData.phoneNumber.replace(/\s/g, "")))
      newErrors.phoneNumber = "Invalid phone (e.g., 612345678)";
    if (!formData.school) newErrors.school = "Select school";
    if (!formData.department) newErrors.department = "Select department";
    if (!formData.level) newErrors.level = "Select level";
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 8)
      newErrors.password = "Min 8 characters";
    else if (passwordStrength.score < 3)
      newErrors.password = "Password too weak";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Accept terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSchoolChange = (e) => {
    const newSchool = e.target.value;
    setFormData((prev) => ({ ...prev, school: newSchool, department: "" }));
    if (errors.school) setErrors((prev) => ({ ...prev, school: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const existing = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]",
      );
      if (existing.some((u) => u.studentId === formData.studentId))
        throw new Error("Student ID already registered");
      if (existing.some((u) => u.email === formData.email))
        throw new Error("Email already registered");
      const newUser = {
        id: formData.studentId,
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        role: "student",
        department: formData.department,
        phoneNumber: formData.phoneNumber,
        level: formData.level,
        school: formData.school,
        password: formData.password,
        registeredAt: new Date().toISOString(),
      };
      existing.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existing));
      login({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId,
        role: "student",
        department: newUser.department,
      });
      setRegistrationSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErrors({ general: err.message });
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="register-container">
        <div className="register-card success-card">
          <CheckCircle
            size={48}
            style={{ color: "#10b981", marginBottom: "1rem" }}
          />
          <h1>Registration Successful!</h1>
          <p>Your account has been created successfully</p>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-header">
            <img src={ubalogo} alt="UBa Logo" className="register-logo" />
            <h1>Create Student Account</h1>
            <p>University of Bamenda</p>
            <p className="register-subtitle">
              Register to access the complaint management system
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div>
              <h3 className="section-title">Personal Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>Matricule</label>
                <div className="input-wrapper">
                  <IdCard size={18} className="input-icon" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g., UBa..."
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                {errors.studentId && (
                  <p className="error-text">{errors.studentId}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="612345678"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="error-text">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="section-title">Academic Information</h3>
              <div className="form-group">
                <label>School</label>
                <div className="input-wrapper">
                  <School size={18} className="input-icon" />
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleSchoolChange}
                    className="input-field"
                    disabled={isLoading}
                  >
                    <option value="">Select your school</option>
                    {schools.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.school && <p className="error-text">{errors.school}</p>}
              </div>

              <div className="form-group">
                <label>Department</label>
                <div className="input-wrapper">
                  <GraduationCap size={18} className="input-icon" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-field"
                    disabled={isLoading || !formData.school}
                  >
                    <option value="">
                      {formData.school
                        ? "Select your department"
                        : "First select a school"}
                    </option>
                    {formData.school &&
                      getDepartmentsForSchool(formData.school).map((d) => (
                        <option key={d.code} value={`${d.code} - ${d.name}`}>
                          {d.code} - {d.name}
                        </option>
                      ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="error-text">{errors.department}</p>
                )}
              </div>

              <div className="form-group">
                <label>Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="input-field"
                  disabled={isLoading}
                >
                  <option value="">Select your level</option>
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.level && <p className="error-text">{errors.level}</p>}
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="section-title">Security</h3>
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="input-field"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className="strength-bar"
                          style={{
                            backgroundColor:
                              level <= passwordStrength.score
                                ? level <= 2
                                  ? "#ef4444"
                                  : level <= 3
                                    ? "#f59e0b"
                                    : "#10b981"
                                : "#e5e7eb",
                          }}
                        ></div>
                      ))}
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="strength-feedback">
                        Password requirements:
                        <ul>
                          {passwordStrength.feedback.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input-field"
                    disabled={isLoading}
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
                {errors.confirmPassword && (
                  <p className="error-text">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span>
                  I agree to the <Link to="/terms">Terms and Conditions</Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="error-text">{errors.agreeToTerms}</p>
              )}
            </div>

            {errors.general && <p className="error-text">{errors.general}</p>}

            <button type="submit" disabled={isLoading} className="register-btn">
              {isLoading ? "Creating Account..." : "Register"}
            </button>

            <div className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>

        {/* Info box */}
        <div className="register-info-box">
          <h3>Why Register?</h3>
          <p>✓ Submit and track complaints online</p>
          <p>✓ Get real-time updates on your complaints</p>
          <p>✓ Communicate directly with administrators</p>
          <p>✓ Access your complaint history anytime</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
