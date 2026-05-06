// pages/Student/StudentDashbaord.jsx
import StatCard from "./Components/StatCard";
import {
  FileArchive,
  Hourglass,
  RefreshCw,
  CheckCircle,
  XCircle,
  Plus,
  AlertCircle,
} from "lucide-react";

import "./studentdashboard.css";
import "./StudentStyle.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { user, complaints } = useContext(AppContext);
  const navigate = useNavigate();

  // Filter user complaints
  const myComplaints = complaints.filter((c) => c.userId === user?.matricule);

  // Counts - ALL STATUSES INCLUDED
  const counts = {
    total: myComplaints.length,
    pending: myComplaints.filter((c) => c.status === "pending").length,
    inProgress: myComplaints.filter((c) => c.status === "in-progress").length,
    resolved: myComplaints.filter((c) => c.status === "resolved").length,
    rejected: myComplaints.filter((c) => c.status === "rejected").length,
  };

  // Recent complaints (last 5)
  const recent = myComplaints.slice(0, 5);

  return (
    <div className="student-dashboard">
      {/* HEADER */}
      <div>
        <h1
          className="student-page-title"
          style={{
            fontSize: "1.7rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #0f172a, #3b82f6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: "1.3",
            display: "inline-block",
          }}
        >
          Welcome back, {user?.name || "User"}!
        </h1>
        <p style={{ color: "var(--student-text-secondary)", fontSize: "16px" }}>
          Here's what's happening with your complaints.
        </p>
      </div>

      {/* STATS CARDS - ALL 5 STATUSES */}
      <div className="student-cards">
        <StatCard
          title="Total Complaints"
          value={counts.total}
          icon={FileArchive}
          color="#4F46E5"
          variant="total"
        />
        <StatCard
          title="Pending"
          value={counts.pending}
          icon={Hourglass}
          color="#f59e0b"
          variant="pending"
        />
        <StatCard
          title="In Progress"
          value={counts.inProgress}
          icon={RefreshCw}
          color="#3b82f6"
          variant="progress"
        />
        <StatCard
          title="Resolved"
          value={counts.resolved}
          icon={CheckCircle}
          color="#10b981"
          variant="resolved"
        />
        <StatCard
          title="Rejected"
          value={counts.rejected}
          icon={XCircle}
          color="#ef4444"
          variant="rejected"
        />
      </div>

      {/* MAIN GRID */}
      <div className="student-dashboard-grid">
        {/* RECENT COMPLAINTS */}
        <div className="student-card-box">
          <div className="card-header-flex">
            <h3>My Recent Complaints</h3>
            <span
              onClick={() => navigate("/student/complaints")}
              className="view-all-link"
            >
              View All
            </span>
          </div>

          {recent.length === 0 ? (
            <div className="no-data">
              <AlertCircle
                size={24}
                style={{ margin: "0 auto 10px", opacity: 0.5 }}
              />
              <p>No complaints yet</p>
            </div>
          ) : (
            <div className="complaint-list">
              {recent.map((c) => (
                <div
                  key={c.id}
                  className="student-complaint"
                  onClick={() => navigate("/student/complaints")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="complaint-info">
                    <p className="complaint-course">{c.course}</p>
                    <p className="complaint-type">{c.type}</p>
                  </div>
                  <span className={`student-status student-${c.status}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="student-card-box">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <div
              className="quick-action-item"
              onClick={() => navigate("/student/submit")}
              style={{ cursor: "pointer" }}
            >
              <Plus size={18} style={{ color: "var(--student-primary)" }} />
              <span>Submit New Complaint</span>
            </div>
            <div
              className="quick-action-item"
              onClick={() => navigate("/student/complaints")}
              style={{ cursor: "pointer" }}
            >
              <FileArchive
                size={18}
                style={{ color: "var(--student-primary)" }}
              />
              <span>View My Complaints</span>
            </div>
            <div
              className="quick-action-item"
              onClick={() => navigate("/student/profile")}
              style={{ cursor: "pointer" }}
            >
              <CheckCircle
                size={18}
                style={{ color: "var(--student-primary)" }}
              />
              <span>Update Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* COMPLAINT BANNER */}
      <div className="complaint-banner">
        <div className="complaint-banner-content">
          <div className="complaint-banner-icon">
            <FileArchive size={24} />
          </div>
          <div className="complaint-banner-text">
            <h4>Have a new issue to report?</h4>
            <p>
              Submit a complaint and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <button
          className="complaint-banner-btn"
          onClick={() => navigate("/student/submit")}
        >
          <Plus size={18} />
          Submit Complaint
        </button>
      </div>
    </div>
  );
}
