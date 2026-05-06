// pages/Student/Components/Toast.jsx
import { useEffect } from "react";
import "./toast.css";
import { X } from "lucide-react";

export default function ToastContainer({ toasts, onRemove }) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onRemove(toasts[0].id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onRemove]);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.message}</span>
          <button 
            className="toast-close" 
            onClick={() => onRemove(t.id)}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}