// pages/Student/SubmitComplaint.jsx
import { useState, useContext, useEffect, useMemo } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";
import { AppContext } from "../../context/AppContext";
import { X, Paperclip } from "lucide-react";
import { getCoursesForDepartment } from "../../utils/courses";

export default function Submit() {
  const { user, addComplaint, showToast, complaints } = useContext(AppContext);

  const initialForm = {
    courseCode: "",
    courseTitle: "",
    type: "",
    priority: "Medium",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const availableCourses = useMemo(() => {
    const departmentKey =
      user?.department || user?.program || user?.school || "";
    return getCoursesForDepartment(departmentKey);
  }, [user?.department, user?.program, user?.school]);

  // Load draft
  useEffect(() => {
    const draft = localStorage.getItem("complaint_draft");
    if (draft) {
      const parsed = JSON.parse(draft);
      const storedForm = parsed.form || initialForm;
      const [courseCode, courseTitle] = (storedForm.course || "").split(" - ");
      setForm({
        ...initialForm,
        ...storedForm,
        courseCode: storedForm.courseCode || courseCode || "",
        courseTitle: storedForm.courseTitle || courseTitle || "",
      });
      setFiles(parsed.files || []);
    }
  }, []); // initialForm is constant, no need to include

  // Auto save draft
  useEffect(() => {
    localStorage.setItem("complaint_draft", JSON.stringify({ form, files }));
  }, [form, files]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "course") {
      setForm({
        ...form,
        courseCode: value,
        courseTitle: value,
      });
      return;
    }
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
      type: form.type,
      priority: form.priority,
      description: form.description,
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
        {/* COURSE */}
        <div className="student-form-group">
          <label>Course</label>
          <select
            name="course"
            value={
              form.courseCode ? `${form.courseCode}|${form.courseTitle}` : ""
            }
            onChange={handleChange}
            className="student-input"
            required
          >
            <option value="">
              {availableCourses.length > 0
                ? "Select a course"
                : "No courses available for your department"}
            </option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
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

        {/* FILE UPLOAD - Only for CA Mark */}
        {form.type === "CA Mark" && (
          <div className="student-form-group">
            <label>Attachments (Required for CA Mark)</label>
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
        )}

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
