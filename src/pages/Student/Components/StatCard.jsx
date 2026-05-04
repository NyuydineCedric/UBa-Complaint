import "./Card.css";
import "../StudentStyle.css";

function StatCard({ title, value, text, icon: Icon, color, bgcolor }) {
  return (
    <div className="student-stat-card" style={{ backgroundColor: bgcolor }}>
      <div className="student-stat-icon" style={{ backgroundColor: color }}>
        <Icon />
      </div>

      <div className="student-stat-info">
        <p className="student-stat-title">{title}</p>
        <h2 className="student-stat-value">{value}</h2>
        <p className="student-stat-text">{text}</p>
      </div>
    </div>
  );
}
export default StatCard;
