import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaIdCard,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaSchool,
} from "react-icons/fa";
import uba from "../assets/uba.jpg";
import ubalogo from "../assets/ubalogo.png";

const RegisterPage = () => {
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

  // Schools data (same as original)
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
    const selectedSchool = schools.find((school) => school.name === schoolName);
    return selectedSchool ? selectedSchool.departments : [];
  };

  const handleSchoolChange = (e) => {
    const newSchool = e.target.value;
    setFormData((prev) => ({
      ...prev,
      school: newSchool,
      department: "",
    }));
    if (errors.school) {
      setErrors((prev) => ({ ...prev, school: undefined }));
    }
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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (!formData.email.toLowerCase().includes("@gmail.com")) {
      newErrors.email = "Please use a valid email (e.g john@gmail.com)";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^(6|2)\d{8}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber =
        "Invalid phone number (e.g., 612345678 or 212345678)";
    }

    if (!formData.school) {
      newErrors.school = "Please select your school";
    }

    if (!formData.department) {
      newErrors.department = "Please select your department";
    }

    if (!formData.level) {
      newErrors.level = "Please select your level";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]",
      );
      if (existingUsers.some((u) => u.studentId === formData.studentId)) {
        setErrors({ general: "Student ID already registered" });
        setIsLoading(false);
        return;
      }
      if (existingUsers.some((u) => u.email === formData.email)) {
        setErrors({ general: "Email already registered" });
        setIsLoading(false);
        return;
      }

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

      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      // Prepare user object for login (same as AppContext expects)
      const userForAuth = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId,
        role: newUser.role,
        department: newUser.department,
      };

      setRegistrationSuccess(true);
      setTimeout(() => {
        login(userForAuth);
        navigate("/student-dashboard");
      }, 2000);
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles (copied from original, no changes)
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    backgroundImage: `url(${uba})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const cardStyle = {
    maxWidth: "700px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    padding: "2rem",
    transition: "all 0.3s ease",
    marginTop: "55rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "1.875rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
  };

  const sectionTitleStyle = {
    color: "#0f3a7d",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "1rem",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "0.5rem",
  };

  const formGroupStyle = { marginBottom: "1.25rem" };
  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
  };
  const inputWrapperStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };
  const iconStyle = {
    position: "absolute",
    left: "0.75rem",
    color: "#9ca3af",
    fontSize: "1rem",
    pointerEvents: "none",
  };
  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.75rem 0.625rem 2.25rem",
    fontSize: "0.875rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    outline: "none",
    transition: "all 0.2s",
    backgroundColor: "#fff",
    color: "#111827",
  };
  const selectStyle = {
    ...inputStyle,
    paddingLeft: "2.25rem",
    cursor: "pointer",
  };
  const toggleButtonStyle = {
    position: "absolute",
    right: "0.75rem",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
    fontSize: "1rem",
  };
  const errorMessageStyle = {
    fontSize: "0.75rem",
    color: "#ef4444",
    marginTop: "0.375rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  };
  const passwordStrengthContainerStyle = { marginTop: "0.5rem" };
  const strengthBarsContainerStyle = {
    display: "flex",
    gap: "0.25rem",
    marginBottom: "0.5rem",
  };
  const strengthBarStyle = (color) => ({
    height: "4px",
    flex: 1,
    borderRadius: "2px",
    backgroundColor: color,
  });
  const feedbackListStyle = {
    marginTop: "0.25rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
  };
  const feedbackItemStyle = {
    color: "#ef4444",
    marginBottom: "0.125rem",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  };
  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    cursor: "pointer",
  };
  const checkboxStyle = { width: "1rem", height: "1rem", cursor: "pointer" };
  const linkStyle = {
    color: "#0f3a7d",
    textDecoration: "underline",
    fontWeight: 500,
  };
  const submitButtonStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#0f3a7d",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "1.5rem",
  };
  const infoBoxStyle = {
    backgroundColor: "#eff6ff",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginTop: "1.5rem",
    border: "1px solid #dbeafe",
    marginLeft: "100px",
  };
  const infoTitleStyle = {
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#0f3a7d",
  };
  const infoTextStyle = {
    fontSize: "0.875rem",
    marginBottom: "0.25rem",
    color: "#374151",
  };

  const successContainerStyle = { ...containerStyle };
  const successCardStyle = {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    padding: "2rem",
    textAlign: "center",
  };

  if (registrationSuccess) {
    return (
      <div style={successContainerStyle}>
        <div style={successCardStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Registration Successful!</h1>
            <p
              style={{
                color: "#10b981",
                fontSize: "1rem",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <FaCheckCircle />
              Your account has been created successfully
            </p>
            <p style={{ color: "#6b7280", marginTop: "1rem" }}>
              Redirecting to your dashboard in 2 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <img src={ubalogo} alt="UBa Logo" style={{ width: "200px" }} />
          <h1 style={titleStyle}>Create Student Account</h1>
          <p style={subtitleStyle}>University of Bamenda</p>
          <p
            style={{
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              color: "#6b7280",
            }}
          >
            Register to access the complaint management system
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={sectionTitleStyle}>Personal Information</h3>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <div style={inputWrapperStyle}>
                <FaUser style={iconStyle} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              {errors.name && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.name}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Matricule</label>
              <div style={inputWrapperStyle}>
                <FaIdCard style={iconStyle} />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g., UBa..."
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              {errors.studentId && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.studentId}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <div style={inputWrapperStyle}>
                <FaEnvelope style={iconStyle} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@gmail.com"
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              {errors.email && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.email}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Phone Number</label>
              <div style={inputWrapperStyle}>
                <FaPhone style={iconStyle} />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g., 612345678"
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              {errors.phoneNumber && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.phoneNumber}
                </div>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={sectionTitleStyle}>Academic Information</h3>

            <div style={formGroupStyle}>
              <label style={labelStyle}>School</label>
              <div style={inputWrapperStyle}>
                <FaSchool style={iconStyle} />
                <select
                  name="school"
                  value={formData.school}
                  onChange={handleSchoolChange}
                  disabled={isLoading}
                  style={{
                    ...selectStyle,
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="">Select your school</option>
                  {schools.map((school) => (
                    <option key={school.name} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.school && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.school}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Department</label>
              <div style={inputWrapperStyle}>
                <FaGraduationCap style={iconStyle} />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={isLoading || !formData.school}
                  style={{
                    ...selectStyle,
                    backgroundColor:
                      isLoading || !formData.school ? "#f9fafb" : "#fff",
                    cursor:
                      isLoading || !formData.school ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="">
                    {formData.school
                      ? "Select your department"
                      : "First select a school"}
                  </option>
                  {formData.school &&
                    getDepartmentsForSchool(formData.school).map((dept) => (
                      <option
                        key={dept.code}
                        value={`${dept.code} - ${dept.name}`}
                      >
                        {dept.code} - {dept.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.department && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.department}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...inputStyle,
                  paddingLeft: "0.75rem",
                  backgroundColor: isLoading ? "#f9fafb" : "#fff",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                <option value="">Select your level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.level && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.level}
                </div>
              )}
            </div>
          </div>

          {/* Security */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={sectionTitleStyle}>Security</h3>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Password</label>
              <div style={inputWrapperStyle}>
                <FaLock style={iconStyle} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    paddingRight: "2.5rem",
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleButtonStyle}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {formData.password && (
                <div style={passwordStrengthContainerStyle}>
                  <div style={strengthBarsContainerStyle}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        style={strengthBarStyle(
                          level <= passwordStrength.score
                            ? level <= 2
                              ? "#ef4444"
                              : level <= 3
                                ? "#f59e0b"
                                : "#10b981"
                            : "#e5e7eb",
                        )}
                      />
                    ))}
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      Password requirements:
                      <ul style={feedbackListStyle}>
                        {passwordStrength.feedback.map((req, idx) => (
                          <li key={idx} style={feedbackItemStyle}>
                            <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {errors.password && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.password}
                </div>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={inputWrapperStyle}>
                <FaLock style={iconStyle} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  style={{
                    ...inputStyle,
                    paddingRight: "2.5rem",
                    backgroundColor: isLoading ? "#f9fafb" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0f3a7d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={toggleButtonStyle}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={errorMessageStyle}>
                  <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading}
                style={checkboxStyle}
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" style={linkStyle}>
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" style={linkStyle}>
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <div style={errorMessageStyle}>
                <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
                {errors.agreeToTerms}
              </div>
            )}
          </div>

          {errors.general && (
            <div style={{ ...errorMessageStyle, marginTop: "1rem" }}>
              <FaTimesCircle style={{ fontSize: "0.625rem" }} />{" "}
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...submitButtonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) =>
              !isLoading && (e.currentTarget.style.backgroundColor = "#1e4a8a")
            }
            onMouseLeave={(e) =>
              !isLoading && (e.currentTarget.style.backgroundColor = "#0f3a7d")
            }
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Already have an account?{" "}
              <Link to="/login" style={linkStyle}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div style={infoBoxStyle}>
        <p style={infoTitleStyle}>Why Register?</p>
        <p style={infoTextStyle}>✓ Submit and track complaints online</p>
        <p style={infoTextStyle}>✓ Get real-time updates on your complaints</p>
        <p style={infoTextStyle}>✓ Communicate directly with administrators</p>
        <p style={infoTextStyle}>✓ Access your complaint history anytime</p>
      </div>
    </div>
  );
};

export default RegisterPage;
