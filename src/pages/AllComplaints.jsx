import "./AllComplaints.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

function AllComplaints() {
  const { complaints, searchQuery, setSearchQuery, t } = useContext(AppContext);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ status: "", school: "", type: "" });
  const [quickFilter, setQuickFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const simplifyType = (type) => {
    if (!type) return "CA Mark";
    return type.toLowerCase().includes("ca") ? "CA Mark" : "Exam Mark";
  };

  // Get unique schools from complaints data
  const availableSchools = [
    ...new Set(complaints.map((c) => c.school).filter(Boolean)),
  ].sort();

  useEffect(() => {
    const sorted = [...complaints].sort(
      (a, b) => new Date(b.submittedDate) - new Date(a.submittedDate),
    );
    setFiltered(sorted);
  }, [complaints]);

  useEffect(() => {
    let f = [...complaints];
    if (searchQuery) {
      f = f.filter(
        (c) =>
          c.student?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.course?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.courseTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.school?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (filters.status) f = f.filter((c) => c.status === filters.status);
    if (filters.school) f = f.filter((c) => c.school === filters.school);
    if (filters.type)
      f = f.filter((c) => simplifyType(c.type) === filters.type);
    if (quickFilter !== "All")
      f = f.filter(
        (c) => c.status === quickFilter.toLowerCase().replace(" ", "-"),
      );
    f.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    setFiltered(f);
  }, [complaints, searchQuery, filters, quickFilter]);

  const stats = {
    total: filtered.length,
    pending: filtered.filter((c) => c.status === "pending").length,
    inProgress: filtered.filter((c) => c.status === "in-progress").length,
    resolved: filtered.filter((c) => c.status === "resolved").length,
    rejected: filtered.filter((c) => c.status === "rejected").length,
  };

  const schools = availableSchools;
  const schoolStats = schools.map((s) => ({
    label: s,
    count: filtered.filter((c) => c.school === s).length,
  }));
  const maxSchool = Math.max(...schoolStats.map((s) => s.count), 1);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const statusData = [
    { label: t("resolved_short"), count: stats.resolved, color: "#10B981" },
    { label: t("in_progress"), count: stats.inProgress, color: "#3B82F6" },
    { label: t("pending"), count: stats.pending, color: "#F59E0B" },
    { label: t("rejected"), count: stats.rejected, color: "#EF4444" },
  ].filter((d) => d.count > 0);
  const totalComp = stats.total;

  const handleFilterChange = (type, value) => {
    setFilters((p) => ({ ...p, [type]: value }));
    setQuickFilter("All");
    setCurrentPage(1); // Reset to first page when filters change
  };
  const handleQuickFilter = (status) => {
    setQuickFilter(status);
    setFilters((p) => ({ ...p, status: "" }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  const handleView = (id) => navigate(`/complaints/${id}`);
  const getStatusClass = (s) =>
    s === "pending"
      ? "status-pending"
      : s === "in-progress"
        ? "status-in-progress"
        : s === "resolved"
          ? "status-resolved"
          : "status-rejected";
  const getStatusText = (s) =>
    s === "pending"
      ? t("pending_status")
      : s === "in-progress"
        ? t("in_progress_status")
        : s === "resolved"
          ? t("resolved_status")
          : t("rejected_status");

  return (
    <div className="complaints-page">
      <div className="page-header">
        <div>
          <h1>{t("complaints")}</h1>
          <p>{t("manage_complaints")}</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder={t("search_by")}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">{t("all_status")}</option>
            <option value="pending">{t("pending_cap")}</option>
            <option value="in-progress">{t("in_progress_cap")}</option>
            <option value="resolved">{t("resolved_cap")}</option>
            <option value="rejected">{t("rejected_cap")}</option>
          </select>
          <select
            className="filter-select"
            value={filters.school}
            onChange={(e) => handleFilterChange("school", e.target.value)}
          >
            <option value="">{t("all_schools")}</option>
            {schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">{t("all_types")}</option>
            <option value="CA Mark">CA Mark</option>
            <option value="Exam Mark">Exam Mark</option>
          </select>
        </div>
      </div>

      <div className="quick-filter-section">
        <span className="quick-filter-label">{t("quick_filter")}:</span>
        <div className="quick-filter-buttons">
          {[
            t("all"),
            t("pending_cap"),
            t("in_progress_cap"),
            t("resolved_cap"),
            t("rejected_cap"),
          ].map((status, idx) => {
            const key =
              status === t("all")
                ? "All"
                : status === t("pending_cap")
                  ? "Pending"
                  : status === t("in_progress_cap")
                    ? "In Progress"
                    : status === t("resolved_cap")
                      ? "Resolved"
                      : "Rejected";
            return (
              <button
                key={idx}
                className={`quick-filter-btn ${quickFilter === key ? "active" : ""}`}
                onClick={() => handleQuickFilter(key)}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      <div className="complaints-stats">
        <div className="stat-box">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">{t("total")}</div>
        </div>
        <div className="stat-box pending-box">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">{t("pending_cap")}</div>
        </div>
        <div className="stat-box progress-box">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">{t("in_progress_cap")}</div>
        </div>
        <div className="stat-box resolved-box">
          <div className="stat-number">{stats.resolved}</div>
          <div className="stat-label">{t("resolved_cap")}</div>
        </div>
        <div className="stat-box rejected-box">
          <div className="stat-number">{stats.rejected}</div>
          <div className="stat-label">{t("rejected_cap")}</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>{t("complaints_by_school")}</h3>
          <div className="horizontal-bar-list">
            {schoolStats.map((s) => (
              <div key={s.label} className="horizontal-bar-item">
                <div className="school-label">{s.label}</div>
                <div className="bar-bg">
                  <div
                    className="bar-fill-horizontal"
                    style={{
                      width: `${(s.count / maxSchool) * 100}%`,
                      backgroundColor: "#6366F1",
                    }}
                  ></div>
                </div>
                <div className="school-count">{s.count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h3>{t("complaints_by_status")}</h3>
          <div className="mini-pie-container">
            <svg className="mini-pie-chart" viewBox="0 0 100 100">
              {(() => {
                let cum = 0;
                return statusData.map((seg, idx) => {
                  const start = (cum / totalComp) * 360;
                  const end = ((cum + seg.count) / totalComp) * 360;
                  cum += seg.count;
                  const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180);
                  const y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
                  const x2 = 50 + 45 * Math.cos((end * Math.PI) / 180);
                  const y2 = 50 + 45 * Math.sin((end * Math.PI) / 180);
                  const large = end - start > 180 ? 1 : 0;
                  return (
                    <path
                      key={idx}
                      d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${large} 1 ${x2} ${y2} Z`}
                      fill={seg.color}
                      className="pie-segment"
                    />
                  );
                });
              })()}
              <circle cx="50" cy="50" r="25" fill="white" />
              <text
                x="50"
                y="48"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#111827"
              >
                {totalComp}
              </text>
              <text
                x="50"
                y="58"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                {t("total")}
              </text>
            </svg>
            <div className="mini-legend">
              {statusData.map((item) => (
                <div key={item.label} className="legend-dot-item">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="legend-text">
                    {item.label}: {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("complaint_id")}</th>
              <th>{t("student_name")}</th>
              <th>{t("student_id_label")}</th>
              <th>{t("course")}</th>
              <th>{t("type_label")}</th>
              <th>{t("school_label")}</th>
              <th>{t("status_label")}</th>
              <th>{t("submitted_label")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((c, idx) => (
              <tr key={c.id}>
                <td>{startIndex + idx + 1}</td>
                <td>
                  <span className="complaint-id">{c.id}</span>
                </td>
                <td>{c.student || c.name}</td>
                <td>{c.studentId || c.userId || c.name}</td>
                <td>{c.courseTitle || c.course}</td>
                <td>
                  <span className="type-badge">{simplifyType(c.type)}</span>
                </td>
                <td>{c.school}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(c.status)}`}>
                    {getStatusText(c.status)}
                  </span>
                </td>
                <td>
                  {c.submittedDate
                    ? new Date(c.submittedDate).toLocaleDateString()
                    : c.date}
                </td>
                <td>
                  <button className="btn-view" onClick={() => handleView(c.id)}>
                    <Eye size={14} style={{ marginRight: "4px" }} />
                    {t("view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft size={14} /> {t("previous")}
        </button>
        <span className="pagination-info">
          Page {currentPage} / {totalPages || 1}
        </span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {t("next")} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default AllComplaints;
