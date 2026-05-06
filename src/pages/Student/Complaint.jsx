// pages/Student/Complaint.jsx
import "./complaint.css";
import "./StudentStyle.css";

import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ComplaintModal from "./Components/ComplaintModal";
import { Search } from "lucide-react";

export default function Complaints() {
  const { user, complaints } = useContext(AppContext);

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
    // Status filter
    if (filter !== "all" && c.status !== filter) return false;
    // Search filter
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

  return (
    <div className="student-complaints-page">
      {/* TITLE */}
      <h2 className="student-page-title">My Complaints</h2>

      {/* FILTER BAR - ALL STATUSES INCLUDED */}
      <div className="student-filter-bar">
        <button
          className={`student-filter ${filter === "all" ? "student-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({counts.all})
        </button>
        <button
          className={`student-filter ${filter === "pending" ? "student-active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({counts.pending})
        </button>
        <button
          className={`student-filter ${filter === "in-progress" ? "student-active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress ({counts["in-progress"]})
        </button>
        <button
          className={`student-filter ${filter === "resolved" ? "student-active" : ""}`}
          onClick={() => setFilter("resolved")}
        >
          Resolved ({counts.resolved})
        </button>
        <button
          className={`student-filter ${filter === "rejected" ? "student-active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected ({counts.rejected})
        </button>
      </div>

      {/* SEARCH BAR */}
      <div
        className="student-search-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--student-bg-card)",
          border: "1px solid var(--student-border-card)",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <Search
          size={18}
          className="search-icon"
          style={{ color: "var(--student-text-secondary)" }}
        />
        <input
          type="text"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            color: "var(--student-text-main)",
            fontSize: "14px",
          }}
        />
      </div>

      {/* TABLE */}
      <div className="student-table-container">
        {filtered.length === 0 ? (
          <div
            className="no-complaints"
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--student-text-secondary)",
            }}
          >
            <p>No complaints found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Status</th>
                <th>Date</th>
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
                      {c.status}
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
