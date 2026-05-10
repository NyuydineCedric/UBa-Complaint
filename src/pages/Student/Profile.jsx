// pages/Student/Profile.jsx
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./profile.css";
import "./StudentStyle.css";
import { Camera, User, Mail, Phone, BookOpen, School } from "lucide-react";

export default function Profile() {
  const { user, t } = useContext(AppContext);
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
        u.matricule === profile.matricule ? { ...u, avatar: imageData } : u,
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...profile, avatar: imageData }),
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save profile data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.matricule === profile.matricule ? profile : u,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(profile));
    alert(t("settings_saved")); // "Profile updated successfully!" or equivalent
  };

  return (
    <div className="student-profile-page">
      <h2 className="student-page-title">
        {t("my_complaints") === "My Complaints" ? "My Profile" : t("settings")}
      </h2>
      {/* Alternatively, add a dedicated translation key "my_profile" */}
      {/* For simplicity, using t("my_profile") – ensure you have that key in translations. */}

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
            {t("change_photo")}
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
              <User
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {t("full_name")}
            </label>
            <input
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              placeholder={t("full_name")}
            />
          </div>

          <div className="student-form-group">
            <label>
              <BookOpen
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {t("matricule")}
            </label>
            <input
              name="matricule"
              value={profile.matricule || ""}
              onChange={handleChange}
              placeholder={t("matricule")}
              disabled
            />
          </div>

          <div className="student-form-group">
            <label>
              <Mail
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {t("email")}
            </label>
            <input
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              placeholder={t("email")}
            />
          </div>

          <div className="student-form-group">
            <label>
              <Phone
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {t("phone_number")}
            </label>
            <input
              name="phoneNumber"
              value={profile.phoneNumber || ""}
              onChange={handleChange}
              placeholder={t("phone_number")}
            />
          </div>

          <div className="student-form-group">
            <label>
              <School
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {t("department")}
            </label>
            <input
              name="department"
              value={profile.department || ""}
              onChange={handleChange}
              placeholder={t("department")}
            />
          </div>

          <button type="submit" className="student-save-btn">
            {t("save_changes")}
          </button>
        </form>
      </div>
    </div>
  );
}
