import { useState, useContext, useEffect } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";
import { AppContext } from "../../context/AppContext";
import { X, Paperclip } from "lucide-react";

export default function Submit() {
  const { user, addComplaint, showToast, complaints, t } =
    useContext(AppContext);

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

  // Submit
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
      showToast(t("required_field"), "error");
      return;
    }

    // Check if file is required for CA Mark
    if (form.type === "CA Mark" && files.length === 0) {
      showToast(t("attach_proof"), "error");
      return;
    }

    if (form.description.length < 10) {
      showToast(t("description_too_short"), "error");
      return;
    }

    if (isDuplicate()) {
      showToast(t("duplicate_complaint"), "error");
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
      <h2 className="student-page-title">{t("submit_complaint_title")}</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="student-form-group">
          <label>{t("course_name_label")}</label>
          <input
            type="text"
            name="courseTitle"
            value={form.courseTitle}
            onChange={handleChange}
            className="student-input"
            placeholder={t("course_name_label")}
            required
          />
        </div>
        <div className="student-form-group">
          <label>{t("course_code_label")}</label>
          <input
            type="text"
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
            className="student-input"
            placeholder={t("course_code_label")}
            required
          />
        </div>

        <div className="student-form-group">
          <label>{t("semester")}</label>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">{t("semester")}</option>
            <option value="1">{t("semester")} 1</option>
            <option value="2">{t("semester")} 2</option>
            <option value="3">Resit {t("semester")}</option>
          </select>
        </div>

        <div className="student-form-group">
          <label>{t("year")}</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">{t("year")}</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        <div className="student-form-group">
          <label>{t("complaint_type")}</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="student-select"
            required
          >
            <option value="">{t("complaint_type")}</option>
            <option value="CA Mark">{t("ca_mark")}</option>
            <option value="Exam Mark">{t("exam_mark")}</option>
          </select>
        </div>

        {form.type === "CA Mark" && (
          <div className="student-form-group">
            <label>{t("evidence")}</label>
            <div className="file-upload-wrapper">
              <label htmlFor="evidence-upload" className="file-upload-label">
                <Paperclip size={18} style={{ marginRight: 8 }} />
                {t("upload_evidence")}
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
          <label>{t("description_label")}</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t("describe_issue")}
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
          {t("submit_complaint")}
        </button>
      </form>
    </div>
  );
}
