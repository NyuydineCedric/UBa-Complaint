// pages/Student/Components/StatCard.jsx
import "./Card.css";
import "../StudentStyle.css";

function StatCard({ title, value, icon: Icon, color, variant }) {
  const getCardClass = () => {
    switch (variant) {
      case "total":
        return "stat-card-total";
      case "pending":
        return "stat-card-pending";
      case "progress":
        return "stat-card-progress";
      case "resolved":
        return "stat-card-resolved";
      case "rejected":
        return "stat-card-rejected";
      default:
        return "";
    }
  };

  return (
    <div className={`student-stat-card ${getCardClass()}`}>
      <div className="student-stat-icon" style={{ backgroundColor: color }}>
        <Icon />
      </div>
      <div className="student-stat-info">
        <p className="student-stat-title">{title}</p>
        <h2 className="student-stat-value">{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;
