import StatCard from "./Components/StatCard";
import {
  FileArchive,
  Hourglass,
  RefreshCw,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import "./studentdashboard.css";
import "./StudentStyle.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { user, complaints, t } = useContext(AppContext);
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
      <div className="student-dashboard-header">
        <h1
          className="student-page-title"
          style={{
            fontSize: "1.7rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #0f172a, #3b82f6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          {t("welcome_back_student").replace("{{name}}", user?.name || "User")}
        </h1>
        <p style={{ color: "var(--student-text-secondary)", fontSize: "16px",  }}>
          {t("heres_whats_happening")}
        </p>
      </div>

      {/* STATS CARDS - ALL 5 STATUSES */}
      <div className="student-cards">
        <StatCard
          title={t("total_complaints")}
          value={counts.total}
          icon={FileArchive}
          color="#4F46E5"
          variant="total"
        />
        <StatCard
          title={t("pending")}
          value={counts.pending}
          icon={Hourglass}
          color="#f59e0b"
          variant="pending"
        />
        <StatCard
          title={t("in_progress")}
          value={counts.inProgress}
          icon={RefreshCw}
          color="#3b82f6"
          variant="progress"
        />
        <StatCard
          title={t("resolved")}
          value={counts.resolved}
          icon={CheckCircle}
          color="#10b981"
          variant="resolved"
        />
        <StatCard
          title={t("rejected")}
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
            <h3>{t("my_recent_complaints")}</h3>
            <span
              onClick={() => navigate("/student/complaints")}
              className="view-all-link"
            >
              {t("view_all")}
              <ArrowRight size={14} style={{ marginLeft: "4px" }} />
            </span>
          </div>

          {recent.length === 0 ? (
            <div className="no-data">
              <AlertCircle
                size={24}
                style={{ margin: "0 auto 10px", opacity: 0.5 }}
              />
              <p>{t("no_complaints_yet")}</p>
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
                    {t(`${c.status}_status`)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="student-card-box">
          <h3>{t("quick_actions")}</h3>
          <div className="quick-actions">
            <div
              className="quick-action-item"
              onClick={() => navigate("/student/submit")}
              style={{ cursor: "pointer" }}
            >
              <Plus size={18} style={{ color: "var(--student-primary)" }} />
              <span>{t("submit_new_complaint")}</span>
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
              <span>{t("view_my_complaints")}</span>
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
              <span>{t("update_profile")}</span>
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
            <h4>{t("have_new_issue")}</h4>
            <p>{t("submit_complaint_banner")}</p>
          </div>
        </div>
        <button
          className="complaint-banner-btn"
          onClick={() => navigate("/student/submit")}
        >
          <Plus size={18} />
          {t("submit_complaint")}
        </button>
      </div>
    </div>
  );
}
