import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { School, CheckCircle, Clock, BarChart3 } from "lucide-react";
import "./Schools.css";

function Schools() {
  const { complaints, t } = useContext(AppContext);

  // Get unique schools from complaints data
  const availableSchools = [
    ...new Set(complaints.map((c) => c.school).filter(Boolean)),
  ].sort();

  // Create school info mapping for known schools
  const schoolInfo = {
    FED: {
      name: "Faculty of Education",
      head: "Dr. Jane Smith",
      students: 1010,
      response: "3.1 days",
    },
    FHS: {
      name: "Faculty of Health Sciences",
      head: "Dr. Sarah Johnson",
      students: 850,
      response: "2.8 days",
    },
    HTTC: {
      name: "Higher Technical Training College",
      head: "Dr. Michael Chen",
      students: 920,
      response: "2.9 days",
    },
    FGA: {
      name: "Faculty of General Agriculture",
      head: "Dr. Emily Davis",
      students: 780,
      response: "3.2 days",
    },
    COLTECH: {
      name: "College of Technology",
      head: "Dr. Robert Wilson",
      students: 650,
      response: "2.5 days",
    },
  };

  const schoolData = availableSchools.map((code) => {
    const sc = complaints.filter((c) => c.school === code);
    const total = sc.length;
    const resolved = sc.filter((c) => c.status === "resolved").length;
    const pending = sc.filter((c) => c.status === "pending").length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const info = schoolInfo[code] || {
      name: `${code} Faculty`,
      head: "TBD",
      students: 0,
      response: "TBD",
    };
    return {
      code,
      ...info,
      complaints: total,
      resolved,
      pending,
      resolutionRate: rate,
    };
  });
  const maxComp = Math.max(...schoolData.map((s) => s.complaints), 1);
  const totalComp = schoolData.reduce((a, b) => a + b.complaints, 0);
  const totalRes = schoolData.reduce((a, b) => a + b.resolved, 0);
  const totalPen = schoolData.reduce((a, b) => a + b.pending, 0);

  return (
    <div className="schools-page">
      <div className="page-header">
        <div>
          <h1>{t("schools_title")}</h1>
          <p>{t("schools_subtitle")}</p>
        </div>
        <button className="primary-button">+ {t("add_school")}</button>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <School size={28} className="summary-icon" />
          <div className="summary-info">
            <div className="summary-value">{schoolData.length}</div>
            <div className="summary-label">{t("schools")}</div>
          </div>
        </div>
        <div className="summary-card">
          <BarChart3 size={28} className="summary-icon" />
          <div className="summary-info">
            <div className="summary-value">{totalComp}</div>
            <div className="summary-label">{t("complaints_count")}</div>
          </div>
        </div>
        <div className="summary-card">
          <CheckCircle size={28} className="summary-icon" />
          <div className="summary-info">
            <div className="summary-value">{totalRes}</div>
            <div className="summary-label">{t("resolved_short")}</div>
          </div>
        </div>
        <div className="summary-card">
          <Clock size={28} className="summary-icon" />
          <div className="summary-info">
            <div className="summary-value">{totalPen}</div>
            <div className="summary-label">{t("pending_short")}</div>
          </div>
        </div>
      </div>

      <div className="schools-grid">
        {schoolData.map((s, idx) => (
          <div
            key={s.code}
            className="school-card"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="card-header">
              <div>
                <span className="school-code">{s.code}</span>
              </div>
              <div
                className={`school-status ${s.resolutionRate >= 70 ? "good" : s.resolutionRate >= 40 ? "medium" : "poor"}`}
              >
                {s.resolutionRate}% {t("resolved_short")}
              </div>
            </div>
            <div className="card-stats-grid">
              <div className="stat-block">
                <span className="stat-number">{s.complaints}</span>
                <span className="stat-caption">{t("complaints_count")}</span>
              </div>
              <div className="stat-block">
                <span className="stat-number" style={{ color: "#10B981" }}>
                  {s.resolved}
                </span>
                <span className="stat-caption">{t("resolved_short")}</span>
              </div>
              <div className="stat-block">
                <span className="stat-number" style={{ color: "#F59E0B" }}>
                  {s.pending}
                </span>
                <span className="stat-caption">{t("pending_short")}</span>
              </div>
              <div className="stat-block">
                <span className="stat-number">
                  {s.students.toLocaleString()}
                </span>
                <span className="stat-caption">{t("students_count")}</span>
              </div>
            </div>
            <div className="progress-bar-label">
              <span>{t("resolution_progress")}</span>
              <span>{s.resolutionRate}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${s.resolutionRate}%`,
                  backgroundColor:
                    s.resolutionRate >= 70
                      ? "#10B981"
                      : s.resolutionRate >= 40
                        ? "#F59E0B"
                        : "#EF4444",
                }}
              ></div>
            </div>
            <div className="card-footer">
              <div>
                <span>{t("head")}:</span> {s.head}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-chart">
        <h2>{t("complaints_by_school")}</h2>
        <div className="horizontal-bars">
          {schoolData.map((s) => (
            <div key={s.code} className="bar-row">
              <div className="bar-label">{s.code}</div>
              <div className="bar-bg">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(s.complaints / maxComp) * 100}%`,
                    backgroundColor: "#6366F1",
                  }}
                ></div>
              </div>
              <div className="bar-value">{s.complaints}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="school-table-card">
        <h2>{t("school_performance_details")}</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t("school")}</th>
                <th>{t("head")}</th>
                <th>{t("students_count")}</th>
                <th>{t("complaints_count")}</th>
                <th>{t("resolved_short")}</th>
                <th>{t("pending_short")}</th>
                <th>{t("resolution_rate")}</th>

                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {schoolData.map((s) => (
                <tr key={s.code}>
                  <td>
                    <small>{s.code}</small>
                  </td>
                  <td>{s.head}</td>
                  <td>{s.students.toLocaleString()}</td>
                  <td>{s.complaints}</td>
                  <td style={{ color: "#10B981", fontWeight: "600" }}>
                    {s.resolved}
                  </td>
                  <td style={{ color: "#F59E0B", fontWeight: "600" }}>
                    {s.pending}
                  </td>
                  <td>
                    <div
                      className="rate-badge"
                      style={{
                        backgroundColor:
                          s.resolutionRate >= 70
                            ? "#D1FAE5"
                            : s.resolutionRate >= 40
                              ? "#FEF3C7"
                              : "#FEE2E2",
                        color:
                          s.resolutionRate >= 70
                            ? "#059669"
                            : s.resolutionRate >= 40
                              ? "#D97706"
                              : "#DC2626",
                      }}
                    >
                      {s.resolutionRate}%
                    </div>
                  </td>

                  <td>
                    <button className="icon-button">{t("details")}</button>
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

export default Schools;
