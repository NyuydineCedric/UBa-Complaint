import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./profile.css";
import "./StudentStyle.css";

export default function Profile() {
  const { user, updateProfile, showToast } = useContext(AppContext);
  const [profile, setProfile] = useState(user || {});
  const [preview, setPreview] = useState(user?.avatar || null);

  useEffect(() => {
    setProfile(user || {});
    setPreview(user?.avatar || null);
  }, [user]);

  // ===== HANDLE TEXT INPUTS =====
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ===== HANDLE IMAGE UPLOAD =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setPreview(imageData);
      setProfile((prev) => ({
        ...prev,
        avatar: imageData,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ===== SAVE PROFILE =====
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(profile.matricule, profile);
      setProfile(updated);
      setPreview(updated.avatar || preview);
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      console.error(err);
      alert(`Profile update failed: ${err.message}`);
    }
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
                preview || profile.avatar || "https://via.placeholder.com/120"
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
            value={profile.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="matricule"
            value={profile.matricule || ""}
            onChange={handleChange}
            placeholder="Matricule"
          />

          <input
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="department"
            value={profile.department || ""}
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
