import "./complaint.css";
import "./StudentStyle.css";

export default function Complaints() {
  const complaints = [
    {
      id: 1,
      title: "Late grade submission",
      course: "Data Structures",
      status: "Pending",
      date: "2026-04-28",
    },
    {
      id: 2,
      title: "Course registration issue",
      course: "Operating Systems",
      status: "Resolved",
      date: "2026-04-20",
    },
    {
      id: 3,
      title: "Network problem in lab",
      course: "Networking",
      status: "In Progress",
      date: "2026-04-18",
    },
    {
      id: 4,
      title: "Control systems",
      course: "Networking",
      status: "Rejected",
      date: "2026-04-18",
    },
  ];

  return (
    <div className="student-complaints-page">
      <h2 className="student-page-title">My Complaints</h2>

      <div className="student-filter-bar">
        <button className="student-filter active">All</button>
        <button className="student-filter student-filter-pending">Pending</button>
        <button className="student-filter student-filter-progress">In Progress</button>
        <button className="student-filter student-filter-resolved">Resolved</button>
        <button className="student-filter student-filter-reject">Rejected</button>
      </div>

      <div className="student-table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.course}</td>

                <td>
                  <span className={`student-status ${c.status.toLowerCase().replace(" ", "-")}`}>
                    {c.status}
                  </span>
                </td>

                <td>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}