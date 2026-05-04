import { useState } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";

export default function Submit() {
  const [form, setForm] = useState({
    course: "",
    type: "",
    priority: "Medium",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // later send to backend
  };

  return (
    <div className="student-submit-page">
      <h2 className="student-page-title">Submit Complaint</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="student-form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            placeholder="e.g. Data Structures"
            value={form.course}
            onChange={handleChange}
            className="student-input"
          />
        </div>

        <div className="student-form-group">
          <label>Complaint Type</label>
          <select
            name="Grading Issue"
            value={form.priority}
            onChange={handleChange}
            className="student-select"
          >
            <option>CA Mark</option>
            <option>Exam Mark</option>
          </select>
        </div>

        {/* PRIORITY */}
        <div className="student-form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="student-select"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="student-form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your issue clearly..."
            value={form.description}
            onChange={handleChange}
            className="student-textarea"
          />
        </div>

        {/* FILE */}
        <div className="student-form-group">
          <label>Upload Evidence</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="student-input"
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="student-submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
