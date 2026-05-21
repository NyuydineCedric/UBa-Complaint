import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { School, CheckCircle, Clock, BarChart3, Building2 } from "lucide-react";
import "./Schools.css";

function Schools() {
  const { complaints, currentUser, t } = useContext(AppContext);
  const isSchoolAdmin = currentUser?.role === "school_admin";
  const adminSchool = currentUser?.school;

  // ---------- Helper: Get department stats from complaints ----------
  const getDepartmentStats = (complaintsList) => {
    const deptMap = new Map();
    complaintsList.forEach((c) => {
      const dept = c.department || "Unknown Department";
      deptMap.set(dept, (deptMap.get(dept) || 0) + 1);
    });
    return Array.from(deptMap.entries()).map(([name, count]) => ({
      name,
      count,
      resolved: complaintsList.filter(
        (c) => c.department === name && c.status === "resolved",
      ).length,
      pending: complaintsList.filter(
        (c) => c.department === name && c.status === "pending",
      ).length,
      rate:
        count > 0
          ? Math.round(
              (complaintsList.filter(
                (c) => c.department === name && c.status === "resolved",
              ).length /
                count) *
                100,
            )
          : 0,
    }));
  };

  // ---------- For Super Admin: School-level data ----------
  const availableSchools = [
    ...new Set(complaints.map((c) => c.school).filter(Boolean)),
  ].sort();

  const schoolInfo = {
    FED: { name: "Faculty of Education", students: 1010 },
    FHS: { name: "Faculty of Health Sciences", students: 850 },
    HTTC: { name: "Higher Technical Training College", students: 920 },
    FGA: { name: "Faculty of General Agriculture", students: 780 },
    COLTECH: { name: "College of Technology", students: 650 },
  };

  const schoolData = availableSchools.map((code) => {
    const sc = complaints.filter((c) => c.school === code);
    const total = sc.length;
    const resolved = sc.filter((c) => c.status === "resolved").length;
    const pending = sc.filter((c) => c.status === "pending").length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const info = schoolInfo[code] || { name: `${code} Faculty`, students: 0 };
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

  // ---------- For School Admin: Department-level data ----------
  let departmentData = [];
  if (isSchoolAdmin && adminSchool) {
    const schoolComplaints = complaints.filter((c) => c.school === adminSchool);
    departmentData = getDepartmentStats(schoolComplaints);
  }
  const maxDeptComp = departmentData.length
    ? Math.max(...departmentData.map((d) => d.count), 1)
    : 1;
  const totalDeptComp = departmentData.reduce((a, b) => a + b.count, 0);
  const totalDeptRes = departmentData.reduce((a, b) => a + b.resolved, 0);
  const totalDeptPen = departmentData.reduce((a, b) => a + b.pending, 0);

  // ---------- Render either school view or department view ----------
  if (isSchoolAdmin && adminSchool) {
    // SCHOOL ADMIN VIEW – Departments
    return (
      <div className="schools-page">
        <div className="page-header">
          <div>
            <h1>{t("departments_title") || "Departments"}</h1>
            <p>
              {t("departments_subtitle") ||
                `Complaints by department in ${adminSchool}`}
            </p>
          </div>
          {/* Hide "Add School" button for school admin */}
        </div>

        {/* Stats summary for departments */}
        <div className="stats-summary">
          <div className="summary-card">
            <Building2 size={28} className="summary-icon" />
            <div className="summary-info">
              <div className="summary-value">{departmentData.length}</div>
              <div className="summary-label">
                {t("departments") || "Departments"}
              </div>
            </div>
          </div>
          <div className="summary-card">
            <BarChart3 size={28} className="summary-icon" />
            <div className="summary-info">
              <div className="summary-value">{totalDeptComp}</div>
              <div className="summary-label">{t("complaints_count")}</div>
            </div>
          </div>
          <div className="summary-card">
            <CheckCircle size={28} className="summary-icon" />
            <div className="summary-info">
              <div className="summary-value">{totalDeptRes}</div>
              <div className="summary-label">{t("resolved_short")}</div>
            </div>
          </div>
          <div className="summary-card">
            <Clock size={28} className="summary-icon" />
            <div className="summary-info">
              <div className="summary-value">{totalDeptPen}</div>
              <div className="summary-label">{t("pending_short")}</div>
            </div>
          </div>
        </div>

        {/* Department cards */}
        <div className="schools-grid">
          {departmentData.map((dept, idx) => (
            <div
              key={dept.name}
              className="school-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="card-header">
                <div>
                  <span className="school-code">{dept.name}</span>
                </div>
                <div
                  className={`school-status ${dept.rate >= 70 ? "good" : dept.rate >= 40 ? "medium" : "poor"}`}
                >
                  {dept.rate}% {t("resolved_short")}
                </div>
              </div>
              <div className="card-stats-grid">
                <div className="stat-block">
                  <span className="stat-number">{dept.count}</span>
                  <span className="stat-caption">{t("complaints_count")}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-number" style={{ color: "#10B981" }}>
                    {dept.resolved}
                  </span>
                  <span className="stat-caption">{t("resolved_short")}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-number" style={{ color: "#F59E0B" }}>
                    {dept.pending}
                  </span>
                  <span className="stat-caption">{t("pending_short")}</span>
                </div>
              </div>
              <div className="progress-bar-label">
                <span>{t("resolution_progress")}</span>
                <span>{dept.rate}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${dept.rate}%`,
                    backgroundColor:
                      dept.rate >= 70
                        ? "#10B981"
                        : dept.rate >= 40
                          ? "#F59E0B"
                          : "#EF4444",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Department comparison chart */}
        <div className="comparison-chart">
          <h2>{t("complaints_by_department") || "Complaints by Department"}</h2>
          <div className="horizontal-bars">
            {departmentData.map((dept) => (
              <div key={dept.name} className="bar-row">
                <div className="bar-label">{dept.name}</div>
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(dept.count / maxDeptComp) * 100}%`,
                      backgroundColor: "#6366F1",
                    }}
                  ></div>
                </div>
                <div className="bar-value">{dept.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department details table */}
        <div className="school-table-card">
          <h2>
            {t("department_performance_details") ||
              "Department Performance Details"}
          </h2>
          <div className="table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>{t("department") || "Department"}</th>
                  <th>{t("complaints_count")}</th>
                  <th>{t("resolved_short")}</th>
                  <th>{t("pending_short")}</th>
                  <th>{t("resolution_rate")}</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept) => (
                  <tr key={dept.name}>
                    <td>
                      <small>{dept.name}</small>
                    </td>
                    <td>{dept.count}</td>
                    <td style={{ color: "#10B981", fontWeight: "600" }}>
                      {dept.resolved}
                    </td>
                    <td style={{ color: "#F59E0B", fontWeight: "600" }}>
                      {dept.pending}
                    </td>
                    <td>
                      <div
                        className="rate-badge"
                        style={{
                          backgroundColor:
                            dept.rate >= 70
                              ? "#D1FAE5"
                              : dept.rate >= 40
                                ? "#FEF3C7"
                                : "#FEE2E2",
                          color:
                            dept.rate >= 70
                              ? "#059669"
                              : dept.rate >= 40
                                ? "#D97706"
                                : "#DC2626",
                        }}
                      >
                        {dept.rate}%
                      </div>
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

  // ---------- SUPER ADMIN VIEW (original – all schools) ----------
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
          <table className="complaints-table">
            <thead>
              <tr>
                <th>{t("school")}</th>
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
