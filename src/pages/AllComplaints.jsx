import "./AllComplaints.css";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { SCHOOLS_DATA } from "../utils/schoolData";

function AllComplaints() {
  const {
    complaints,
    searchQuery,
    setSearchQuery,
    t,
    currentUser,
    updateComplaint,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    school: "",
    category: "",
    type: "",
    department: "",
  });
  const [quickFilter, setQuickFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isSuperAdmin = currentUser?.role === "admin";
  const isSchoolAdmin = currentUser?.role === "school_admin";
  const isHOD = currentUser?.role === "hod";
  const canApprove = isHOD || isSchoolAdmin || isSuperAdmin;
  const defaultFilterApplied = useRef(false);

  const simplifyType = (type) => {
    if (!type) return "CA Mark";
    return type.toLowerCase().includes("ca") ? "CA Mark" : "Exam Mark";
  };

  const getDepartmentStats = (arr) => {
    const map = new Map();
    arr.forEach((c) => {
      const dept = c.department || "Unknown";
      map.set(dept, (map.get(dept) || 0) + 1);
    });
    return Array.from(map.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  };

  const getSchoolStats = (arr) => {
    const map = new Map();
    arr.forEach((c) => {
      // Always use studentSchool for display grouping
      const label = c.studentSchool || c.school || "Unknown";
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  };

  const getDepartmentListForSchoolAdmin = () => {
    if (!isSchoolAdmin || !currentUser?.school) return [];
    const school = SCHOOLS_DATA.find((s) => s.id === currentUser.school);
    if (!school) return [];
    return [...new Set(school.departments.map((d) => d.name))];
  };
  const departmentOptions = getDepartmentListForSchoolAdmin();
  const allSchools = SCHOOLS_DATA.map((s) => ({ id: s.id, name: s.shortName }));

  // Default: super admin sees wide complaints on load
  useEffect(() => {
    if (isSuperAdmin && !defaultFilterApplied.current) {
      setFilters((prev) => ({ ...prev, category: "wide" }));
      defaultFilterApplied.current = true;
    }
  }, [isSuperAdmin]);

  useEffect(() => {
    let f = [...complaints];

    // School admin: only their school, never wide
    if (isSchoolAdmin && currentUser?.school) {
      f = f.filter((c) => {
        if (
          c.complaintType === "wide" ||
          c.school === "UNIVERSITY_WIDE" ||
          c.responsibleSchool === "UNIVERSITY_WIDE"
        )
          return false;
        const target = c.responsibleSchool || c.school;
        return target === currentUser.school;
      });
    }

    // HOD filter
    if (isHOD && currentUser?.department) {
      f = f.filter((c) => c.department === currentUser.department);
    }

    // Search
    if (searchQuery) {
      f = f.filter(
        (c) =>
          c.student?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.course?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.courseTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.school?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Status filter
    if (filters.status) f = f.filter((c) => c.status === filters.status);

    // CA/Exam type filter
    if (filters.type)
      f = f.filter((c) => simplifyType(c.type) === filters.type);

    // Super admin: school filter
    // ✅ Uses studentSchool so wide complaints are matched by the student's real school
    if (isSuperAdmin && filters.school) {
      f = f.filter((c) => {
        const school = c.studentSchool || c.school;
        return school === filters.school;
      });
    }

    // Super admin: category filter — applied after school filter
    // so "NAHPI + wide" = only NAHPI students' wide complaints
    if (isSuperAdmin && filters.category) {
      if (filters.category === "wide") {
        f = f.filter(
          (c) => c.complaintType === "wide" || c.school === "UNIVERSITY_WIDE",
        );
      } else if (filters.category === "departmental") {
        f = f.filter((c) => c.complaintType === "departmental");
      } else if (filters.category === "elective") {
        f = f.filter((c) => c.complaintType === "elective");
      }
    }

    // School admin: department filter
    if (isSchoolAdmin && filters.department) {
      f = f.filter((c) => c.department === filters.department);
    }

    // Quick filter
    if (quickFilter !== "All") {
      const map = {
        Pending: "pending",
        "In Progress": "in-progress",
        Resolved: "resolved",
        Rejected: "rejected",
      };
      const target = map[quickFilter];
      if (target) f = f.filter((c) => c.status === target);
    }

    f.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    setFiltered(f);
    setCurrentPage(1);
  }, [complaints, searchQuery, filters, quickFilter, currentUser, isHOD]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = {
    total: filtered.length,
    pending: filtered.filter((c) => c.status === "pending").length,
    inProgress: filtered.filter((c) => c.status === "in-progress").length,
    resolved: filtered.filter((c) => c.status === "resolved").length,
    rejected: filtered.filter((c) => c.status === "rejected").length,
  };

  const chartData = isSchoolAdmin
    ? getDepartmentStats(filtered)
    : getSchoolStats(filtered);
  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const chartTitle = isSchoolAdmin
    ? "Complaints by Department"
    : t("complaints_by_school");

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
  };
  const handleQuickFilter = (status) => {
    setQuickFilter(status);
    setFilters((p) => ({ ...p, status: "" }));
  };
  const handleView = (id) => navigate(`/complaints/${id}`);

  const getStatusClass = (s) => {
    switch (s) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-in-progress";
      case "resolved":
        return "status-resolved";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const getStatusText = (s) => {
    switch (s) {
      case "pending":
        return t("pending_status");
      case "in-progress":
        return t("in_progress_status");
      case "resolved":
        return t("resolved_status");
      case "rejected":
        return t("rejected_status");
      default:
        return s;
    }
  };

  // Always show student's real school
  const getSchoolLabel = (c) => c.studentSchool || c.school || "N/A";

  const handleApprovalChange = async (id, newValue) => {
    try {
      await updateComplaint(id, { hodApproved: newValue });
    } catch (err) {
      console.error(err);
      alert("Failed to update approval status.");
    }
  };

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

          {isSuperAdmin && (
            <select
              className="filter-select"
              value={filters.school}
              onChange={(e) => handleFilterChange("school", e.target.value)}
            >
              <option value="">All Schools</option>
              {allSchools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          {isSuperAdmin && (
            <select
              className="filter-select"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="wide">University Wide</option>
              <option value="departmental">Departmental</option>
              <option value="elective">Elective</option>
            </select>
          )}

          <select
            className="filter-select"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">{t("all_types")}</option>
            <option value="CA Mark">CA Mark</option>
            <option value="Exam Mark">Exam Mark</option>
          </select>

          {isSchoolAdmin && departmentOptions.length > 0 && (
            <select
              className="filter-select"
              value={filters.department}
              onChange={(e) => handleFilterChange("department", e.target.value)}
            >
              <option value="">All Departments</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          )}
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
          <h3>{chartTitle}</h3>
          <div className="horizontal-bar-list">
            {chartData.map((item) => (
              <div key={item.label} className="horizontal-bar-item">
                <div className="school-label">{item.label}</div>
                <div className="bar-bg">
                  <div
                    className="bar-fill-horizontal"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: "#6366F1",
                    }}
                  ></div>
                </div>
                <div className="school-count">{item.count}</div>
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
                  const start = (cum / totalComp) * 360,
                    end = ((cum + seg.count) / totalComp) * 360;
                  cum += seg.count;
                  const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180),
                    y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
                  const x2 = 50 + 45 * Math.cos((end * Math.PI) / 180),
                    y2 = 50 + 45 * Math.sin((end * Math.PI) / 180);
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
              <th>{isSchoolAdmin ? "Department" : t("school_label")}</th>
              <th>{t("status_label")}</th>
              <th>{t("submitted_label")}</th>
              <th>{t("actions")}</th>
              {!isSuperAdmin && <th>HOD Approval</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, idx) => (
              <tr key={c.id}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td>
                  <span className="complaint-id">{c.id}</span>
                </td>
                <td>{c.student}</td>
                <td>{c.studentId}</td>
                <td>{c.courseTitle || c.course}</td>
                <td>
                  <span className="type-badge">{simplifyType(c.type)}</span>
                </td>
                <td>{isSchoolAdmin ? c.department : getSchoolLabel(c)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(c.status)}`}>
                    {getStatusText(c.status)}
                  </span>
                </td>
                <td>
                  {c.submittedDate
                    ? new Date(c.submittedDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button className="btn-view" onClick={() => handleView(c.id)}>
                    <Eye size={14} style={{ marginRight: "4px" }} /> {t("view")}
                  </button>
                </td>
                {!isSuperAdmin && (
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={c.hodApproved === true}
                      onChange={(e) =>
                        handleApprovalChange(c.id, e.target.checked)
                      }
                      disabled={!canApprove}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft size={14} /> {t("previous")}
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          {t("next")} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default AllComplaints;
