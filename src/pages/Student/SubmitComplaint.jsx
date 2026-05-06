// pages/Student/SubmitComplaint.jsx
import { useState, useContext, useEffect } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";
import { AppContext } from "../../context/AppContext";
import { X, Paperclip } from "lucide-react";

export default function Submit() {
  const { user, addComplaint, showToast, complaints } = useContext(AppContext);

  const initialForm = {
    courseCode: "",
    courseTitle: "",
    semester: "",
    year: "",
    type: "",
    description: "",
  };

  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return initialForm;
    const draft = localStorage.getItem("complaint_draft");
    if (!draft) return initialForm;

    try {
      const parsed = JSON.parse(draft);
      return { ...initialForm, ...parsed.form };
    } catch {
      return initialForm;
    }
  });

  const [files, setFiles] = useState(() => {
    if (typeof window === "undefined") return [];
    const draft = localStorage.getItem("complaint_draft");
    if (!draft) return [];

    try {
      const parsed = JSON.parse(draft);
      return parsed.files || [];
    } catch {
      return [];
    }
  });

  // Auto save draft
  useEffect(() => {
    localStorage.setItem("complaint_draft", JSON.stringify({ form, files }));
  }, [form, files]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Duplicate check
  const isDuplicate = () => {
    return complaints.some(
      (c) =>
        c.course === form.courseCode &&
        c.type === form.type &&
        c.userId === user?.matricule,
    );
  };

  // Submit - CLEAN VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.courseCode ||
      !form.courseTitle ||
      !form.semester ||
      !form.year ||
      !form.type ||
      !form.description
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    // Check if file is required for CA Mark
    if (form.type === "CA Mark" && files.length === 0) {
      showToast("Please attach proof for CA Mark complaints", "error");
      return;
    }

    if (form.description.length < 10) {
      showToast("Description must be at least 10 characters long", "error");
      return;
    }

    if (isDuplicate()) {
      showToast("Duplicate complaint detected!", "error");
      return;
    }

    const currentUser = user || {};

    const newComplaint = {
      userId: currentUser.matricule || user?.matricule,
      student: currentUser.name || "Unknown",
      studentId: currentUser.matricule || "N/A",
      name: currentUser.name || "Unknown",
      email: currentUser.email || "N/A",
      department: currentUser.department || "N/A",
      school: currentUser.school || "N/A",
      level: currentUser.level || "N/A",
      phoneNumber: currentUser.phoneNumber || "N/A",
      program: currentUser.program || currentUser.department || "N/A",
      title: `${form.type} - ${form.courseCode}`,
      course: form.courseCode,
      courseTitle: form.courseTitle,
      semester: form.semester,
      year: form.year,
      type: form.type,
      description: form.description,
      details: form.description,
      files,
    };

    await addComplaint(newComplaint);
    setForm(initialForm);
    setFiles([]);
    localStorage.removeItem("complaint_draft");
  };

  return (
    <div className="student-submit-page">
      <h2 className="student-page-title">Submit Complaint</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="student-form-group">
          <label>Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
            className="student-input"
            placeholder="Enter course code"
            required
          />
        </div>

        <div className="student-form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="courseTitle"
            value={form.courseTitle}
            onChange={handleChange}
            className="student-input"
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="student-form-group">
          <label>Semester</label>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Resit Semester</option>
          </select>
        </div>

        <div className="student-form-group">
          <label>Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">Select Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

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
          </select>
        </div>

        {form.type === "CA Mark" && (
          <div className="student-form-group">
            <label>Evidence (image required for CA Mark)</label>
            <div className="file-upload-wrapper">
              <label htmlFor="evidence-upload" className="file-upload-label">
                <Paperclip size={18} style={{ marginRight: 8 }} />
                Upload Evidence
              </label>
              <input
                id="evidence-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFile}
                className="file-upload-input"
              />
            </div>
            {files.length > 0 && (
              <div className="file-preview-list">
                {files.map((file, index) => (
                  <div key={index} className="file-preview-item">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
