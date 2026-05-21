import { useState, useContext, useEffect } from "react";
import "./submitcomplaint.css";
import "./StudentStyle.css";
import { AppContext } from "../../context/AppContext";
import { X, Paperclip } from "lucide-react";
import { SCHOOLS_DATA } from "../../utils/schoolData";

export default function Submit() {
  const { user, addComplaint, showToast, complaints, t } =
    useContext(AppContext);

  const [complaintType, setComplaintType] = useState("departmental");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({
    semester: "",
    year: "",
    type: "",
    description: "",
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const draft = localStorage.getItem("complaint_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setComplaintType(parsed.complaintType || "departmental");
        setSelectedCourse(parsed.selectedCourse || null);
        setForm(
          parsed.form || { semester: "", year: "", type: "", description: "" },
        );
        setFiles(parsed.files || []);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "complaint_draft",
      JSON.stringify({ complaintType, selectedCourse, form, files }),
    );
  }, [complaintType, selectedCourse, form, files]);

  useEffect(() => {
    if (!user) return;
    const studentDept = user.department;
    const studentSchool = user.school;
    let courses = [];

    if (complaintType === "departmental") {
      const schoolObj = SCHOOLS_DATA.find((s) => s.id === studentSchool);
      const deptObj = schoolObj?.departments.find(
        (d) => d.name === studentDept || d.id === studentDept,
      );
      if (deptObj) {
        courses = deptObj.courses.map((c) => ({
          code: c.code,
          name: c.name,
          offeredBy: studentSchool,
        }));
      }
    } else if (complaintType === "wide") {
      const wideDepartments = ["GNS", "UBALAC"];
      for (const school of SCHOOLS_DATA) {
        for (const dept of school.departments) {
          if (wideDepartments.includes(dept.id)) {
            dept.courses.forEach((c) => {
              courses.push({
                code: c.code,
                name: c.name,
                offeredBy: "UNIVERSITY_WIDE",
              });
            });
          }
        }
      }
    } else if (complaintType === "elective") {
      const schoolObj = SCHOOLS_DATA.find((s) => s.id === studentSchool);
      if (schoolObj) {
        for (const dept of schoolObj.departments) {
          if (dept.name !== studentDept && dept.id !== studentDept) {
            dept.courses.forEach((c) => {
              courses.push({
                code: c.code,
                name: c.name,
                offeredBy: studentSchool,
              });
            });
          }
        }
      }
    }

    setAvailableCourses(courses);
    setSelectedCourse(null);
  }, [complaintType, user]);

  const handleComplaintTypeChange = (e) => setComplaintType(e.target.value);
  const handleCourseChange = (e) => {
    const course = availableCourses.find((c) => c.code === e.target.value);
    setSelectedCourse(course);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const convertFiles = (fileList) => {
    Array.from(fileList).forEach((file) => {
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
  const handleFile = (e) => convertFiles(e.target.files);
  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const isDuplicate = () => {
    if (!selectedCourse) return false;
    return complaints.some(
      (c) =>
        c.course === selectedCourse.code &&
        c.type === form.type &&
        c.userId === user?.matricule,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      showToast("Please select a course", "error");
      return;
    }
    if (!form.semester || !form.year || !form.type || !form.description) {
      showToast(t("required_field"), "error");
      return;
    }
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
    const schoolToStore =
      complaintType === "wide" ? "UNIVERSITY_WIDE" : selectedCourse.offeredBy;
    const responsibleSchool =
      complaintType === "wide" ? "UNIVERSITY_WIDE" : selectedCourse.offeredBy;

    const newComplaint = {
      userId: currentUser.matricule,
      student: currentUser.name || "Unknown",
      studentId: currentUser.matricule,
      name: currentUser.name,
      email: currentUser.email,
      department: currentUser.department,
      school: schoolToStore,
      studentSchool: currentUser.school, // ✅ always the student's real school for display
      level: currentUser.level,
      phoneNumber: currentUser.phoneNumber,
      program: currentUser.program || currentUser.department,
      title: `${form.type} - ${selectedCourse.code}`,
      course: selectedCourse.code,
      courseTitle: selectedCourse.name,
      semester: form.semester,
      year: form.year,
      type: form.type,
      description: form.description,
      details: form.description,
      files,
      complaintType,
      responsibleSchool,
    };

    await addComplaint(newComplaint);
    setComplaintType("departmental");
    setSelectedCourse(null);
    setForm({ semester: "", year: "", type: "", description: "" });
    setFiles([]);
    localStorage.removeItem("complaint_draft");
  };

  return (
    <div className="student-submit-page">
      <h2 className="student-page-title">{t("submit_complaint_title")}</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="student-form-group">
          <label>Complaint Type</label>
          <select
            value={complaintType}
            onChange={handleComplaintTypeChange}
            className="student-select"
            required
          >
            <option value="departmental">Departmental Course</option>
            <option value="wide">University‑wide Course</option>
            <option value="elective">Elective Course (borrowed)</option>
          </select>
        </div>

        <div className="student-form-group">
          <label>Course</label>
          <select
            value={selectedCourse?.code || ""}
            onChange={handleCourseChange}
            className="student-select"
            required
          >
            <option value="">Select a course</option>
            {availableCourses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} – {course.name}
              </option>
            ))}
          </select>
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
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Resit Semester</option>
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

        <button type="submit" className="student-submit-btn">
          {t("submit_complaint")}
        </button>
      </form>
    </div>
  );
}
