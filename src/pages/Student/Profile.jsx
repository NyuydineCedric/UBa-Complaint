// pages/Student/Profile.jsx
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./profile.css";
import "./StudentStyle.css";
import { Camera, User, Mail, Phone, BookOpen, School } from "lucide-react";

export default function Profile() {
  const { user } = useContext(AppContext);
  const [profile, setProfile] = useState(user || {});
  const [preview, setPreview] = useState(user?.avatar || null);

  useEffect(() => {
    setProfile(user || {});
    setPreview(user?.avatar || null);
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setPreview(imageData);
      setProfile((prev) => ({ ...prev, avatar: imageData }));
      
      // Save to localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.matricule === profile.matricule ? { ...u, avatar: imageData } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify({ ...profile, avatar: imageData }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save profile data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.matricule === profile.matricule ? profile : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="student-profile-page">
      <h2 className="student-page-title">My Profile</h2>

      <div className="student-profile-card">
        {/* LEFT SIDE - AVATAR */}
        <div className="student-profile-left">
          <div className="student-avatar-wrapper">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="student-avatar-img"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--student-primary)",
                }}
              />
            ) : (
              <div
                className="student-avatar-placeholder"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "var(--student-primary)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "bold",
                  border: "3px solid var(--student-primary)",
                }}
              >
                {profile.name?.charAt(0) || "U"}
              </div>
            )}
          </div>

          <label className="student-upload-btn">
            <Camera size={16} style={{ marginRight: "6px" }} />
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        </div>

        {/* RIGHT SIDE FORM */}
        <form className="student-profile-form" onSubmit={handleSave}>
          <div className="student-form-group">
            <label>
              <User size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Full Name
            </label>
            <input
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          <div className="student-form-group">
            <label>
              <BookOpen size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Matricule
            </label>
            <input
              name="matricule"
              value={profile.matricule || ""}
              onChange={handleChange}
              placeholder="Matricule"
            />
          </div>

          <div className="student-form-group">
            <label>
              <Mail size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Email
            </label>
            <input
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="student-form-group">
            <label>
              <Phone size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Phone
            </label>
            <input
              name="phoneNumber"
              value={profile.phoneNumber || ""}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>

          <div className="student-form-group">
            <label>
              <School size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Department
            </label>
            <input
              name="department"
              value={profile.department || ""}
              onChange={handleChange}
              placeholder="Department"
            />
          </div>

          <button type="submit" className="student-save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}