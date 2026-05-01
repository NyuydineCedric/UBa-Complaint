import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./ComplaintDetail.css";

function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, updateComplaint } = useContext(AppContext);
  const complaint = complaints.find((item) => item.id === id);
  const [status, setStatus] = useState(complaint?.status || "pending");
  const [priority, setPriority] = useState(complaint?.priority || "Medium");
  const [staffResponse, setStaffResponse] = useState("");
  const [message, setMessage] = useState("");

  if (!complaint) {
    return (
      <div className="complaint-detail-page">
        <div className="detail-card">
          <h1>Complaint not found</h1>
          <p>The requested complaint does not exist.</p>
          <button
            className="primary-button"
            onClick={() => navigate("/complaints")}
          >
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateComplaint(id, {
      status,
      priority,
      staffResponse,
    });
    setMessage("Complaint status updated successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const getPriorityNote = () => {
    const submittedDate = new Date(complaint.submittedDate);
    const ageDays = Math.floor(
      (Date.now() - submittedDate.getTime()) / 86400000,
    );
    if (ageDays >= 7)
      return "Priority has increased because the complaint is more than one week old.";
    if (ageDays >= 4) return "Priority is rising as the complaint ages.";
    return "Priority is based on time since submission.";
  };

  return (
    <div className="complaint-detail-page">
      <div className="detail-header">
        <div>
          <h1>Complaint Detail</h1>
          <p>Review student information and update complaint status.</p>
        </div>
        <button
          className="secondary-button"
          onClick={() => navigate("/complaints")}
        >
          ← Back to Complaints
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-section">
            <h2>Student Information</h2>
            <div className="detail-row">
              <span>Name</span>
              <strong>{complaint.student}</strong>
            </div>
            <div className="detail-row">
              <span>Matricule</span>
              <strong>{complaint.studentId}</strong>
            </div>
            <div className="detail-row">
              <span>School</span>
              <strong>{complaint.school}</strong>
            </div>
            <div className="detail-row">
              <span>Program</span>
              <strong>{complaint.program}</strong>
            </div>
            <div className="detail-row">
              <span>Department</span>
              <strong>{complaint.department}</strong>
            </div>
          </div>

          <div className="detail-section">
            <h2>Complaint Details</h2>
            <div className="detail-row">
              <span>Complaint ID</span>
              <strong>{complaint.id}</strong>
            </div>
            <div className="detail-row">
              <span>Course</span>
              <strong>
                {complaint.course} - {complaint.courseTitle}
              </strong>
            </div>
            <div className="detail-row">
              <span>Type</span>
              <strong>{complaint.type}</strong>
            </div>
            <div className="detail-row">
              <span>Submitted</span>
              <strong>{complaint.submitted}</strong>
            </div>
            <div className="detail-row">
              <span>Status</span>
              <strong>{complaint.status.replace("-", " ")}</strong>
            </div>
            <div className="detail-row">
              <span>Details</span>
              <p className="detail-text">{complaint.details}</p>
            </div>
          </div>
        </div>

        <div className="detail-card right-panel">
          <h2>Update Complaint</h2>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <label>
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>

          <label>
            Admin Response
            <textarea
              rows="5"
              value={staffResponse}
              onChange={(e) => setStaffResponse(e.target.value)}
              placeholder="Add a note for the student and review team..."
            />
          </label>

          <p className="priority-note">{getPriorityNote()}</p>
          <button className="primary-button" onClick={handleSave}>
            Save Changes
          </button>
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;
