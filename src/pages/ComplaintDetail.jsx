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
  Building,
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
          <h2>Complaint not found</h2>
          <button onClick={() => navigate("/complaints")} className="back-btn">
            <ArrowLeft size={16} /> Back to complaints
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
        author: "Admin",
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

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-header">
          <button onClick={() => navigate("/complaints")} className="back-btn">
            <ArrowLeft size={18} /> Back
          </button>
          <div className="complaint-badge">
            {getStatusIcon(complaint.status)}
            <span
              className={`status-badge ${getStatusClass(complaint.status)}`}
            >
              {complaint.status === "pending"
                ? "Pending"
                : complaint.status === "in-progress"
                  ? "In Progress"
                  : complaint.status === "resolved"
                    ? "Resolved"
                    : "Rejected"}
            </span>
          </div>
        </div>

        <h1 className="detail-title">Complaint #{complaint.id}</h1>

        <div className="detail-grid">
          <div className="detail-section">
            <h3>
              <User size={18} /> Student Information
            </h3>
            <div className="info-row">
              <span className="info-label">Student Name:</span>
              <span>{complaint.student || complaint.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Student ID:</span>
              <span>
                {complaint.studentId || complaint.userId || complaint.name}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Department:</span>
              <span>{complaint.department || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Program:</span>
              <span>{complaint.program || "N/A"}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <BookOpen size={18} /> Course Information
            </h3>
            <div className="info-row">
              <span className="info-label">Course Code:</span>
              <span>{complaint.course}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Course Title:</span>
              <span>{complaint.courseTitle || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Complaint Type:</span>
              <span>{complaint.type}</span>
            </div>
            <div className="info-row">
              <span className="info-label">School:</span>
              <span>{complaint.school}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <Calendar size={18} /> Date Information
            </h3>
            <div className="info-row">
              <span className="info-label">Submitted:</span>
              <span>{complaint.submitted}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Update:</span>
              <span>{complaint.lastUpdate || complaint.submitted}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Semester:</span>
              <span>
                {complaint.semester === "1"
                  ? "Semester 1"
                  : complaint.semester === "2"
                    ? "Semester 2"
                    : complaint.semester === "3"
                      ? "Resit Semester"
                      : complaint.semester || "N/A"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Year:</span>
              <span>{complaint.year || "N/A"}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <Tag size={18} /> Status & Priority
            </h3>
            <div className="info-row">
              <span className="info-label">Priority:</span>
              <span
                className={`priority-${complaint.priority?.toLowerCase() || "low"}`}
              >
                {complaint.priority || "Low"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              {isEditing ? (
                <div className="status-edit">
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="save-status-btn"
                  >
                    <Save size={14} /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="status-display">
                  <span
                    className={`status-badge ${getStatusClass(complaint.status)}`}
                  >
                    {complaint.status === "pending"
                      ? "Pending"
                      : complaint.status === "in-progress"
                        ? "In Progress"
                        : complaint.status === "resolved"
                          ? "Resolved"
                          : "Rejected"}
                  </span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-status-btn"
                  >
                    <Edit size={14} /> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="detail-section full-width">
          <h3>
            <MessageSquare size={18} /> Complaint Details
          </h3>
          <div className="complaint-details-text">
            <p>{complaint.details}</p>
          </div>
        </div>

        {/* Image attachment – for CA Mark complaints */}
        {complaint.attachment && (
          <div className="detail-section full-width">
            <h3>
              <Image size={18} /> Proof Attachment
            </h3>
            <div className="attachment-container">
              <img
                src={complaint.attachment}
                alt="Attachment"
                className="attachment-img"
              />
              <p>{complaint.attachmentName || "Screenshot"}</p>
            </div>
          </div>
        )}

        {/* Images from files array */}
        {complaint.files && complaint.files.length > 0 && (
          <div className="detail-section full-width">
            <h3>
              <Image size={18} /> Attached Files ({complaint.files.length})
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

        <div className="detail-section full-width">
          <h3>Admin Notes</h3>
          <div className="notes-list">
            {notes.length === 0 && <p className="no-notes">No notes yet.</p>}
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
              placeholder="Add a note about this complaint..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows="3"
            />
            <button onClick={handleAddNote} className="add-note-btn">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;
