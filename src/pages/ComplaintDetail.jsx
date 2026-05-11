import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Edit,
  Save,
  User,
  BookOpen,
  Calendar,
  Tag,
  MessageSquare,
  Image,
  Paperclip,
} from "lucide-react";
import "./ComplaintDetail.css";

function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, updateComplaint, t } = useContext(AppContext);
  const complaint = complaints.find((c) => c.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(complaint?.status || "");
  const [adminNote, setAdminNote] = useState("");
  const [notes, setNotes] = useState(complaint?.adminNotes || []);

  if (!complaint) {
    return (
      <div className="detail-container">
        <div className="detail-card">
          <h2>{t("complaint_not_found")}</h2>
          <button onClick={() => navigate("/complaints")} className="back-btn">
            <ArrowLeft size={16} /> {t("back_to_complaints")}
          </button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    updateComplaint(complaint.id, { status: editedStatus });
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (adminNote.trim()) {
      const newNote = {
        id: Date.now(),
        text: adminNote,
        author: t("admin"),
        date: new Date().toLocaleString(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      updateComplaint(complaint.id, { adminNotes: updatedNotes });
      setAdminNote("");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle size={20} />;
      case "in-progress":
        return <Clock size={20} />;
      case "pending":
        return <AlertCircle size={20} />;
      case "rejected":
        return <XCircle size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-in-progress";
      case "resolved":
        return "status-resolved";
      case "rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return t("pending_status");
      case "in-progress":
        return t("in_progress_status");
      case "resolved":
        return t("resolved_status");
      case "rejected":
        return t("rejected_status");
      default:
        return status;
    }
  };

  const getPriorityText = (priority) => {
    if (!priority) return t("low");
    const p = priority.toLowerCase();
    if (p === "low") return t("low");
    if (p === "medium") return t("medium");
    if (p === "high") return t("high");
    return priority;
  };

  const getSemesterText = (semester) => {
    if (semester === "1") return t("semester_1");
    if (semester === "2") return t("semester_2");
    if (semester === "3") return t("resit_semester");
    return semester || t("na");
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-header">
          <button onClick={() => navigate("/complaints")} className="back-btn">
            <ArrowLeft size={18} /> {t("back")}
          </button>
          <div className="complaint-badge">
            {getStatusIcon(complaint.status)}
            <span
              className={`status-badge ${getStatusClass(complaint.status)}`}
            >
              {getStatusText(complaint.status)}
            </span>
          </div>
        </div>

        <h1 className="detail-title">
          {t("complaint_id_label")}: {complaint.id}
        </h1>

        <div className="detail-grid">
          <div className="detail-section">
            <h3>
              <User size={18} /> {t("student_information")}
            </h3>
            <div className="info-row">
              <span className="info-label">{t("student_name")}: </span>
              <span>{complaint.student || complaint.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("student_id_label")}: </span>
              <span>
                {complaint.studentId || complaint.userId || complaint.name}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("department")}: </span>
              <span>{complaint.department || t("na")}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <BookOpen size={18} /> {t("course_information")}
            </h3>
            <div className="info-row">
              <span className="info-label">{t("course_code")}: </span>
              <span>{complaint.course}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("course_title")}: </span>
              <span>{complaint.courseTitle || t("na")}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("complaint_type")}: </span>
              <span>{complaint.type}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("school_label")}: </span>
              <span>{complaint.school}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <Calendar size={18} /> {t("date_information")}
            </h3>
            <div className="info-row">
              <span className="info-label">{t("submitted_label")}: </span>
              <span>{complaint.submitted}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("last_update")}: </span>
              <span>{complaint.lastUpdate || complaint.submitted}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("semester")}: </span>
              <span>{getSemesterText(complaint.semester)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("academic_year")}: </span>
              <span>{complaint.year || t("na")}</span>
            </div>
          </div>

          <div className="detail-section full-width">
            <h3>
              <MessageSquare size={18} /> {t("complaint_details")}
            </h3>
            <div className="complaint-details-text">
              <p>{complaint.details}</p>
            </div>
          </div>

          {/* Image attachment – for CA Mark complaints */}
          {complaint.attachment && (
            <div className="detail-section full-width">
              <h3>
                <Image size={18} /> {t("proof_attachment")}
              </h3>
              <div className="attachment-container">
                <img
                  src={complaint.attachment}
                  alt="Attachment"
                  className="attachment-img"
                />
                <p>{complaint.attachmentName || t("screenshot")}</p>
              </div>
            </div>
          )}

          {/* Images from files array */}
          {complaint.files && complaint.files.length > 0 && (
            <div className="detail-section full-width">
              <h3>
                <Image size={18} /> {t("attached_files")} (
                {complaint.files.length})
              </h3>
              <div className="files-gallery">
                {complaint.files.map((file, idx) => (
                  <div key={idx} className="file-card">
                    {file.type.startsWith("image/") ? (
                      <>
                        <img
                          src={file.data}
                          alt={file.name}
                          className="file-preview-img"
                        />
                        <p className="file-name">{file.name}</p>
                        <span className="file-size">
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="file-icon-placeholder">
                          <Paperclip size={32} />
                        </div>
                        <p className="file-name">{file.name}</p>
                        <span className="file-size">
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <h3>
              <Tag size={18} /> {t("status_and_priority")}
            </h3>
            <div className="info-row">
              <span className="info-label">{t("priority")}: </span>
              <span
                className={`priority-${complaint.priority?.toLowerCase() || "low"}`}
              >
                {getPriorityText(complaint.priority)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">{t("status_label")}: </span>
              {isEditing ? (
                <div className="status-edit">
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">{t("pending_status")}</option>
                    <option value="in-progress">
                      {t("in_progress_status")}
                    </option>
                    <option value="resolved">{t("resolved_status")}</option>
                    <option value="rejected">{t("rejected_status")}</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="save-status-btn"
                  >
                    <Save size={14} /> {t("save")}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    {t("cancel")}
                  </button>
                </div>
              ) : (
                <div className="status-display">
                  <span
                    className={`status-badge ${getStatusClass(complaint.status)}`}
                  >
                    {getStatusText(complaint.status)}
                  </span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-status-btn"
                  >
                    <Edit size={14} /> {t("edit")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Notes Section */}
        <div className="detail-section full-width">
          <h3>{t("admin_notes")}</h3>
          <div className="notes-list">
            {notes.length === 0 && <p className="no-notes">{t("no_notes")}</p>}
            {notes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-header">
                  <strong>{note.author}</strong>
                  <span className="note-date">{note.date}</span>
                </div>
                <p className="note-text">{note.text}</p>
              </div>
            ))}
          </div>
          <div className="add-note">
            <textarea
              placeholder={t("add_note_placeholder")}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows="3"
            />
            <button onClick={handleAddNote} className="add-note-btn">
              {t("add_note")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;
