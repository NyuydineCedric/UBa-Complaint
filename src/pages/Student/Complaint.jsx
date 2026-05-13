// pages/Student/Complaint.jsx
import "./complaint.css";
import "./StudentStyle.css";

import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ComplaintModal from "./Components/ComplaintModal";
import { Search } from "lucide-react";

export default function Complaints() {
  const { user, complaints, t } = useContext(AppContext);

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter user complaints
  const myComplaints = complaints.filter((c) => c.userId === user?.matricule);

  // Counts - ALL STATUSES INCLUDED
  const counts = {
    all: myComplaints.length,
    pending: myComplaints.filter((c) => c.status === "pending").length,
    "in-progress": myComplaints.filter((c) => c.status === "in-progress")
      .length,
    resolved: myComplaints.filter((c) => c.status === "resolved").length,
    rejected: myComplaints.filter((c) => c.status === "rejected").length,
  };

  // Filtered complaints
  const filtered = myComplaints.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        c.title?.toLowerCase().includes(search) ||
        c.type?.toLowerCase().includes(search) ||
        c.course?.toLowerCase().includes(search) ||
        c.description?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Helper to translate status
  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return t("pending_status");
      case "in-progress":
        return t("in_progress_status");
      case "resolved":
        return t("resolved_status");
      case "rejected":
        return t("rejected_status");
      default:
        return status;
    }
  };

  return (
    <div className="student-complaints-page">
      <h2 className="student-page-title">{t("my_complaints")}</h2>

      {/* FILTER BAR */}
      <div className="student-filter-bar">
        <button
          className={`student-filter ${filter === "all" ? "student-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("all")} ({counts.all})
        </button>
        <button
          className={`student-filter ${filter === "pending" ? "student-active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          {t("pending")} ({counts.pending})
        </button>
        <button
          className={`student-filter ${filter === "in-progress" ? "student-active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          {t("in_progress")} ({counts["in-progress"]})
        </button>
        <button
          className={`student-filter ${filter === "resolved" ? "student-active" : ""}`}
          onClick={() => setFilter("resolved")}
        >
          {t("resolved")} ({counts.resolved})
        </button>
        <button
          className={`student-filter ${filter === "rejected" ? "student-active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          {t("rejected")} ({counts.rejected})
        </button>
      </div>

      {/* SEARCH BAR - Fixed */}
      <div className="student-search-bar">
        <Search size={20} className="student-search-icon" />
        <input
          type="text"
          placeholder={t("search_complaints")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="student-table-container">
        {filtered.length === 0 ? (
          <div className="no-complaints">
            <p>{t("no_complaints_found")}</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>{t("course_code")}</th>
                <th>{t("course_name")}</th>
                <th>{t("status")}</th>
                <th>{t("date")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, index) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="clickable-row"
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{c.course}</td>
                  <td>{c.courseTitle || c.title}</td>
                  <td>
                    <span className={`student-status student-${c.status}`}>
                      {translateStatus(c.status)}
                    </span>
                  </td>
                  <td>
                    {c.date || new Date(c.submittedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <ComplaintModal
          complaint={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}