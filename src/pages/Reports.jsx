import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Download } from "lucide-react";
import "./Reports.css";

function Reports() {
  const { complaints, t } = useContext(AppContext);
  const [selectedPeriod, setSelectedPeriod] = useState("semester");

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in-progress",
  ).length;
  const rejected = complaints.filter((c) => c.status === "rejected").length;

  const semesterData = {
    "Semester 1": complaints.filter((c) => c.semester === "1").length,
    "Semester 2": complaints.filter((c) => c.semester === "2").length,
    "Resit Semester": complaints.filter((c) => c.semester === "3").length,
  };

  const currentYear = new Date().getFullYear();
  const yearData = [];
  for (let year = currentYear - 9; year <= currentYear; year++) {
    yearData.push({
      year,
      count: complaints.filter((c) => c.year === year).length || 0,
    });
  }
  const maxYearCount = Math.max(...yearData.map((d) => d.count), 1);
  const getPercent = (count, total) => (total > 0 ? (count / total) * 100 : 0);

  return (
    <div className="reports-page">
      <div className="page-heading">
        <div>
          <h1>{t("reports_title")}</h1>
          <p>{t("reports_subtitle")}</p>
        </div>
        <button className="primary-button">
          <Download size={16} style={{ marginRight: "8px" }} />
          {t("export_report")}
        </button>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h2>{t("complaints_trend")}</h2>
          <div className="period-selector">
            <button
              className={selectedPeriod === "semester" ? "active" : ""}
              onClick={() => setSelectedPeriod("semester")}
            >
              {t("by_semester")}
            </button>
            <button
              className={selectedPeriod === "year" ? "active" : ""}
              onClick={() => setSelectedPeriod("year")}
            >
              {t("by_year")}
            </button>
          </div>
          <div className="report-chip">
            {selectedPeriod === "semester"
              ? t("current_academic_year")
              : t("last_10_years")}
          </div>
        </div>
        <div className=" stats-card">
          <div className="stat-item">
            <span>{t("total")}</span>
            <strong>{total}</strong>
          </div>
          <div className="stat-item">
            <span>{t("resolved_short")}</span>
            <strong>{resolved}</strong>
          </div>
          <div className="stat-item">
            <span>{t("pending_short")}</span>
            <strong>{pending}</strong>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2>{t("complaints_by_status")}</h2>
          <div className="pie-chart-wrapper">
            <svg className="animated-pie-chart" viewBox="0 0 200 200">
              {(() => {
                let cum = 0;
                const segs = [
                  {
                    value: resolved,
                    color: "#10B981",
                    label: t("resolved_short"),
                  },
                  {
                    value: inProgress,
                    color: "#3B82F6",
                    label: t("in_progress"),
                  },
                  { value: pending, color: "#F59E0B", label: t("pending") },
                  { value: rejected, color: "#EF4444", label: t("rejected") },
                ].filter((s) => s.value > 0);
                return segs.map((seg, idx) => {
                  const start = (cum / total) * 360;
                  const end = ((cum + seg.value) / total) * 360;
                  cum += seg.value;
                  const x1 = 100 + 80 * Math.cos((start * Math.PI) / 180);
                  const y1 = 100 + 80 * Math.sin((start * Math.PI) / 180);
                  const x2 = 100 + 80 * Math.cos((end * Math.PI) / 180);
                  const y2 = 100 + 80 * Math.sin((end * Math.PI) / 180);
                  const large = end - start > 180 ? 1 : 0;
                  return (
                    <path
                      key={idx}
                      d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${large} 1 ${x2} ${y2} Z`}
                      fill={seg.color}
                      className="pie-segment"
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    />
                  );
                });
              })()}
              <circle cx="100" cy="100" r="45" fill="white" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#111827"
              >
                {total}
              </text>
              <text
                x="100"
                y="112"
                textAnchor="middle"
                fontSize="11"
                fill="#6B7280"
              >
                {t("total_complaints_short")}
              </text>
            </svg>
            <div className="chart-legend">
              {[
                {
                  label: t("resolved_short"),
                  color: "#10B981",
                  count: resolved,
                },
                {
                  label: t("in_progress"),
                  color: "#3B82F6",
                  count: inProgress,
                },
                { label: t("pending"), color: "#F59E0B", count: pending },
                { label: t("rejected"), color: "#EF4444", count: rejected },
              ]
                .filter((i) => i.count > 0)
                .map((item, idx) => (
                  <div key={idx} className="legend-item">
                    <span
                      className="legend-color"
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

        <div className="chart-container">
          <h2>
            {selectedPeriod === "semester"
              ? t("complaints_by_semester")
              : t("complaints_by_year")}
          </h2>
          <div className="bar-chart-wrapper">
            {selectedPeriod === "semester"
              ? Object.entries(semesterData).map(([sem, count], idx) => {
                  const p = getPercent(count, total);
                  const colors = ["#3B82F6", "#10B981", "#F59E0B"];
                  return (
                    <div
                      key={sem}
                      className="bar-item"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="bar-label">{sem}</div>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${p}%`,
                            backgroundColor: colors[idx % colors.length],
                          }}
                        ></div>
                      </div>
                      <div className="bar-value">{count}</div>
                    </div>
                  );
                })
              : yearData.map((data, idx) => {
                  const p = (data.count / maxYearCount) * 100;
                  return (
                    <div
                      key={data.year}
                      className="bar-item"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="bar-label">{data.year}</div>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{ width: `${p}%`, backgroundColor: "#6366F1" }}
                        ></div>
                      </div>
                      <div className="bar-value">{data.count}</div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
