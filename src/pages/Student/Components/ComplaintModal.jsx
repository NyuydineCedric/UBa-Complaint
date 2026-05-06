// pages/Student/Components/ComplaintModal.jsx
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import "./complaintModal.css";
import { X, Edit, Save, Trash2, User, Mail, School, MapPin, BookOpen } from "lucide-react";

export default function ComplaintModal({ complaint, onClose }) {
  const {
    user,
    updateComplaint,
    updateComplaintStatus,
    deleteComplaint
  } = useContext(AppContext);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(complaint);

  const isOwner = user?.matricule === complaint.userId;
  const isAdmin = user?.role === "admin";

  const handleSave = () => {
    updateComplaint(complaint.id, form);
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this complaint?")) {
      deleteComplaint(complaint.id);
      onClose();
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending": return "student-pending";
      case "in-progress": return "student-in-progress";
      case "resolved": return "student-resolved";
      case "rejected": return "student-rejected";
      default: return "student-pending";
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Complaint Details</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        {/* STUDENT INFO SECTION */}
        <div className="section">
          <h4>
            <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Student Information
          </h4>
          <div className="student-info-grid">
            <div className="info-item">
              <strong>Name:</strong> {complaint.name || "N/A"}
            </div>
            <div className="info-item">
              <strong>Matricule:</strong> {complaint.userId || "N/A"}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {complaint.email || "N/A"}
            </div>
            <div className="info-item">
              <strong>Department:</strong> {complaint.department || "N/A"}
            </div>
            <div className="info-item">
              <strong>School:</strong> {complaint.school || "N/A"}
            </div>
            <div className="info-item">
              <strong>Level:</strong> {complaint.level || "N/A"}
            </div>
            <div className="info-item">
              <strong>Phone:</strong> {complaint.phoneNumber || "N/A"}
            </div>
          </div>
        </div>

        {/* COMPLAINT DETAILS SECTION */}
        <div className="section">
          <h4>
            <BookOpen size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Complaint Details
          </h4>
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Course</label>
                <input
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-textarea"
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <div className="complaint-details">
              <div className="detail-row">
                <strong>Course:</strong> {complaint.course || "N/A"}
              </div>
              <div className="detail-row">
                <strong>Type:</strong> {complaint.type || "N/A"}
              </div>
              <div className="detail-row">
                <strong>Priority:</strong> 
                <span className={`priority-${(complaint.priority || "low").toLowerCase()}`}>
                  {complaint.priority || "Low"}
                </span>
              </div>
              <div className="detail-row">
                <strong>Description:</strong> 
                <p className="description-text">{complaint.description || "No description provided"}</p>
              </div>
            </div>
          )}

          {/* STATUS SECTION */}
          <div className="status-section">
            <strong>Status:</strong>
            {isAdmin ? (
              <select
                value={complaint.status}
                onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            ) : (
              <span className={`student-status ${getStatusClass(complaint.status)}`}>
                {complaint.status}
              </span>
            )}
          </div>

          {/* FILES SECTION */}
          {complaint.files?.length > 0 && (
            <div className="file-preview-section">
              <h4>Proof / Attachments</h4>
              <div className="file-grid">
                {complaint.files.map((f, i) => (
                  <div key={i} className="file-item">
                    {f.type?.startsWith("image") ? (
                      <img src={f.data} alt="proof" className="file-image" />
                    ) : (
                      <div className="file-icon">📄</div>
                    )}
                    <p className="file-name">{f.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        {isOwner && (
          <div className="modal-actions">
            {editMode ? (
              <button onClick={handleSave} className="save-btn">
                <Save size={16} /> Save
              </button>
            ) : (
              <button onClick={() => setEditMode(true)} className="edit-btn">
                <Edit size={16} /> Edit
              </button>
            )}
            <button onClick={handleDelete} className="delete-btn">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}