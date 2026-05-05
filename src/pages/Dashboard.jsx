import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Dashboard.css";

function Dashboard() {
  const { complaints, t } = useContext(AppContext);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    rejected: complaints.filter((c) => c.status === "rejected").length,
  };

  const schoolStats = ["FED", "FHS", "HTTC", "FGA"].map((school) => ({
    label: school,
    value: complaints.filter((c) => c.school === school).length,
    color:
      school === "FED"
        ? "#6366F1"
        : school === "FHS"
          ? "#3B82F6"
          : school === "HTTC"
            ? "#10B981"
            : "#F59E0B",
  }));

  const totalComplaints = stats.total;

  const semesterCounts = {
    First: complaints.filter((c) => c.semester === "First").length,
    Second: complaints.filter((c) => c.semester === "Second").length,
    Resit: complaints.filter((c) => c.semester === "Resit").length,
  };
  const maxCount = Math.max(
    semesterCounts.First,
    semesterCounts.Second,
    semesterCounts.Resit,
    1,
  );

  const barHeights = {
    First: (semesterCounts.First / maxCount) * 100,
    Second: (semesterCounts.Second / maxCount) * 100,
    Resit: (semesterCounts.Resit / maxCount) * 100,
  };

  const formatPercent = (val) =>
    stats.total ? Math.round((val / stats.total) * 100) : 0;
  const formatDate = () =>
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>{t("dashboard")}</h1>
          <p>{t("welcome_back")}</p>
        </div>
        <div className="date-range">{formatDate()}</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">{t("total_complaints")}</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-badge-new">
            +
            {
              complaints.filter(
                (c) =>
                  new Date(c.submittedDate) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              ).length
            }{" "}
            {t("this_week")}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">{t("pending")}</div>
          <div className="stat-value" style={{ color: "#F59E0B" }}>
            {stats.pending}
          </div>
          <div className="stat-percentage">{formatPercent(stats.pending)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">{t("in_progress")}</div>
          <div className="stat-value" style={{ color: "#3B82F6" }}>
            {stats.inProgress}
          </div>
          <div className="stat-percentage">
            {formatPercent(stats.inProgress)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">{t("resolved")}</div>
          <div className="stat-value" style={{ color: "#10B981" }}>
            {stats.resolved}
          </div>
          <div className="stat-percentage">
            {formatPercent(stats.resolved)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">{t("rejected")}</div>
          <div className="stat-value" style={{ color: "#EF4444" }}>
            {stats.rejected}
          </div>
          <div className="stat-percentage">
            {formatPercent(stats.rejected)}%
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <h2>{t("complaints_by_school")}</h2>
          <div className="pie-chart-container">
            <div className="pie-chart-wrapper">
              <svg className="pie-chart" viewBox="0 0 100 100">
                {(() => {
                  let cumulative = 0;
                  return schoolStats.map((stat, idx) => {
                    if (stat.value === 0) return null;
                    const start = (cumulative / totalComplaints) * 360;
                    const end =
                      ((cumulative + stat.value) / totalComplaints) * 360;
                    cumulative += stat.value;
                    const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180);
                    const y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
                    const x2 = 50 + 45 * Math.cos((end * Math.PI) / 180);
                    const y2 = 50 + 45 * Math.sin((end * Math.PI) / 180);
                    const largeArc = end - start > 180 ? 1 : 0;
                    return (
                      <path
                        key={stat.label}
                        d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={stat.color}
                        className="pie-slice"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="pie-center">
                <div className="pie-value">{totalComplaints}</div>
                <div className="pie-label">{t("total_complaints_short")}</div>
              </div>
            </div>
            <div className="chart-legend">
              {schoolStats
                .filter((s) => s.value > 0)
                .map((stat) => (
                  <div key={stat.label} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: stat.color }}
                    ></span>
                    <div className="legend-info">
                      <div className="legend-label">{stat.label}</div>
                      <div className="legend-count">{stat.value}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="complaints-overview">
          <h2>{t("complaints_overview")}</h2>
          <div className="bar-chart">
            <div className="bars-container">
              {["First", "Second", "Resit"].map((semester, idx) => {
                const count = semesterCounts[semester];
                const barHeight = barHeights[semester];
                const colors = ["#3B82F6", "#10B981", "#F59E0B"];
                return (
                  <div key={semester} className="bar-wrapper">
                    <div className="bar-value-top">{count}</div>
                    <div
                      className="bar"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: colors[idx],
                      }}
                    ></div>
                    <div className="x-label">{semester}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="recent-complaints">
        <div className="section-header">
          <h2>{t("recent_complaints")}</h2>
          <a href="/complaints" className="view-all">
            {t("view_all")} →
          </a>
        </div>
        <div className="complaints-table">
          <table>
            <thead>
              <tr>
                <th>{t("complaint_id")}</th>
                <th>{t("student_name")}</th>
                <th>{t("course_code")}</th>
                <th>{t("complaint_type")}</th>
                <th>{t("status")}</th>

                <th>{t("submitted")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice(0, 3).map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.student || c.name}</td>
                  <td>{c.courseTitle || c.course}</td>
                  <td>{c.type}</td>
                  <td>
                    <span
                      className={`status-badge ${c.status.replace("-", "")}`}
                    >
                      {c.status === "pending"
                        ? t("pending_status")
                        : c.status === "in-progress"
                          ? t("in_progress_status")
                          : c.status === "resolved"
                            ? t("resolved_status")
                            : t("rejected_status")}
                    </span>
                  </td>

                  <td>{c.submitted}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        (window.location.href = `/complaints/${c.id}`)
                      }
                    >
                      {t("view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
