import { useState, useEffect } from "react";
import "./profile.css";
import "./StudentStyle.css";

export default function Profile() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  const [preview, setPreview] = useState(user.avatar || null);

  // ===== HANDLE TEXT INPUTS =====
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ===== HANDLE IMAGE UPLOAD =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setPreview(imageData);
      setUser((prev) => ({
        ...prev,
        avatar: imageData,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ===== SAVE PROFILE =====
  const handleSave = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.matricule === user.matricule ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated successfully!");
  };

  return (
    <div className="student-profile-page">

      <h2 className="student-page-title">My Profile</h2>

      <div className="student-profile-card">

        {/* LEFT SIDE */}
        <div className="student-profile-left">

          <div className="student-avatar-wrapper">

            <img
              src={
                preview ||
                user.avatar ||
                "https://via.placeholder.com/120"
              }
              alt="profile"
              className="student-avatar-img"
            />

          </div>

          <label className="student-upload-btn">
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

          <input
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="matricule"
            value={user.matricule || ""}
            onChange={handleChange}
            placeholder="Matricule"
          />

          <input
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="department"
            value={user.department || ""}
            onChange={handleChange}
            placeholder="Department"
          />

          <button type="submit" className="student-save-btn">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}