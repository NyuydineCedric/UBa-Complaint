import StatCard from "./Components/StatCard";
import {
  FileArchive,
  Hourglass,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

import "./studentdashboard.css";
import "./StudentStyle.css";

export default function Dashboard() {
  return (
    <div className="student-dashboard">
      {/* ===== TOP CARDS ===== */}
      <div className="student-cards">
        <StatCard
          title="Total Complaints"
          value="12"
          icon={FileArchive}
          color="#4F46E5"
          bgcolor="var(--student-bg-card)"
          className="student-complaints"
        />

        <StatCard
          title="Pending"
          value="5"
          icon={Hourglass}
          color="#f59e0b"
          bgcolor="var(--student-bg-card)"
          className="student-pending"
        />
        <StatCard
          title="In-Progress"
          value="12"
          icon={RefreshCw}
          color="#b2c3faff"
          bgcolor="var(--student-bg-card)"
          className="student-progress"
        />

        <StatCard
          title="Resolved"
          value="7"
          icon={CheckCircle}
          color="#10b981"
          bgcolor="var(--student-bg-card)"
          className="student-resolved"
        />
        <StatCard
          title="Reject"
          value="7"
          icon={XCircle}
          color="red"
          bgcolor="var(--student-bg-card)"
          className="student-reject"
        />
      </div>

      <div className="student-dashboard-grid">
        {/* RECENT COMPLAINTS */}
        <div className="student-card-box">
          <h3>Recent Complaints</h3>

          <div className="student-complaint">
            <p>Late grade submission</p>
            <span className="student-status pending">Pending</span>
          </div>

          <div className="student-complaint">
            <p>Course registration issue</p>
            <span className="student-status resolved">Resolved</span>
          </div>

          <div className="student-complaint">
            <p>Network problem in lab</p>
            <span className="student-status pending">Pending</span>
          </div>
        </div>

        {/* ACTIVITY PANEL */}
        <div className="student-card-box">
          <h3>Recent Activity</h3>

          <div className="student-activity">
            <p>Your complaint was received</p>
            <span>2 hours ago</span>
          </div>

          <div className="student-activity">
            <p>Admin responded to your complaint</p>
            <span>Yesterday</span>
          </div>

          <div className="student-activity">
            <p>Complaint resolved</p>
            <span>2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
