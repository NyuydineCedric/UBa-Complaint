import { Bell, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import "./studenttopbar.css";
import "../StudentStyle.css";

export default function Topbar() {
  const [isDarkMode, setIsDarkMode]=useState(false);
   useEffect(()=>{
    const theme= isDarkMode?'dark':'light';
    document.documentElement.setAttribute('data-theme', theme)
   },[isDarkMode])
  return (
    <div className="student-topbar">
      <div className="student-title">
        <h3 className="student-title-one">Welcome Back, John!</h3>
        <p className="student-title-paragraph">Here's what's happening with your complaints</p>
      </div>
      <div className="student-topbar-right">
        <div className="student-theme-toggle-container">
          <button className={`student-toggle-btn ${!isDarkMode?'active':''}`}
          onClick={()=>setIsDarkMode(false)}>
            <Sun size={18}/>
          </button>
          <button className={`student-toggle-btn ${isDarkMode?'active':''}`}
          onClick={()=>setIsDarkMode(true)}>
            <Moon size={18}/>
          </button>
        </div>

        <div className="student-notification">
          <Bell className="student-icon" />
          <span className="student-badge">3</span>
        </div>
      </div>
    </div>
  );
}
