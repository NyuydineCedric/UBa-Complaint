import { useState } from "react";
import "./profile.css";
import "./StudentStyle.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    matricule: "COL12345",
    email: "john@example.com",
    department: "Computer Engineering",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(user); // later connect to backend
  };

  return (
    <div className="student-profile-page">
      <h2 className="student-page-title">My Profile</h2>

      <div className="student-profile-card">

        {/* LEFT SIDE (AVATAR) */}
        <div className="student-profile-left">
          <div className="student-avatar">JD</div>
          <button className="student-change-btn">Change Photo</button>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <form className="student-profile-form" onSubmit={handleSave}>

          <div className="student-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>

          <div className="student-form-group">
            <label>Matricule</label>
            <input
              type="text"
              name="matricule"
              value={user.matricule}
              onChange={handleChange}
              placeholder="Your Matricule"
            />
          </div>

          <div className="student-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </div>

          <div className="student-form-group">
            <label>School</label>
            <input
              type="text"
              name="department"
              value={user.school}
              onChange={handleChange}
              placeholder="Your School"
            />
          </div>

          <div className="student-form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={user.department}
              onChange={handleChange}
              placeholder="Your Department"
            />
          </div>

          <button className="student-save-btn">Save Changes</button>

        </form>
      </div>
    </div>
  );
}