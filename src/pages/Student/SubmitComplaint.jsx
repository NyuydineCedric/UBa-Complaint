// pages/Student/SubmitComplaint.jsx
import { useState, useContext, useEffect } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";
import { AppContext } from "../../context/AppContext";
import { Upload, X, Paperclip } from "lucide-react";

export default function Submit() {
  const { user, addComplaint, showToast } = useContext(AppContext);

  const initialForm = {
    course: "",
    type: "",
    priority: "Medium",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Load draft
  useEffect(() => {
    const draft = localStorage.getItem("complaint_draft");
    if (draft) {
      const parsed = JSON.parse(draft);
      setForm(parsed.form || initialForm);
      setFiles(parsed.files || []);
    }
  }, []);

  // Auto save draft
  useEffect(() => {
    localStorage.setItem(
      "complaint_draft",
      JSON.stringify({ form, files })
    );
  }, [form, files]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File conversion
  const convertFiles = (fileList) => {
    const arr = Array.from(fileList);
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFile = (e) => {
    convertFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    convertFiles(e.dataTransfer.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Duplicate check
  const isDuplicate = () => {
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    return complaints.some(
      (c) =>
        c.course === form.course &&
        c.type === form.type &&
        c.userId === user?.matricule
    );
  };

  // Submit - CLEAN VERSION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.course || !form.type || !form.description) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (isDuplicate()) {
      showToast("Duplicate complaint detected!", "error");
      return;
    }

    // Get current user data fresh from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    
    // Create complaint with ALL user data
    const newComplaint = {
      userId: currentUser.matricule || user?.matricule,
      name: currentUser.name || user?.name || "Unknown",
      email: currentUser.email || user?.email || "N/A",
      department: currentUser.department || user?.department || "N/A",
      school: currentUser.school || user?.school || "N/A",
      level: currentUser.level || user?.level || "N/A",
      phoneNumber: currentUser.phoneNumber || user?.phoneNumber || "N/A",
      title: `${form.type} - ${form.course}`,
      ...form,
      files,
    };

    addComplaint(newComplaint);
    showToast("Complaint submitted successfully!", "success");

    // Reset
    setForm(initialForm);
    setFiles([]);
    localStorage.removeItem("complaint_draft");
  };

  return (
    <div className="student-submit-page">
      <h2 className="student-page-title">Submit Complaint</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        {/* COURSE */}
        <div className="student-form-group">
          <label>Course</label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Enter course name/code"
            className="student-input"
            required
          />
        </div>

        {/* TYPE */}
        <div className="student-form-group">
          <label>Complaint Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">Select Type</option>
            <option value="CA Mark">CA Mark</option>
            <option value="Exam Mark">Exam Mark</option>
            <option value="Missing Mark">Missing Mark</option>
            <option value="Lecture Materials">Lecture Materials</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Schedule Conflict">Schedule Conflict</option>
            <option value="Other">Other</option>
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
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="student-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your issue in detail..."
            className="student-textarea"
            required
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="student-form-group">
          <label>Attachments (Optional)</label>
          <div
            className={`upload-box ${dragActive ? "active" : ""}`}
            onDragOver={handleDrag}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <Paperclip size={24} />
            <p>Drag & drop files here or click to upload</p>
            <input
              type="file"
              multiple
              onChange={handleFile}
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* FILE PREVIEW */}
        {files.length > 0 && (
          <div className="file-preview">
            {files.map((f, i) => (
              <div key={i} className="file-item">
                <span className="file-name">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="file-remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <button type="submit" className="student-submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}