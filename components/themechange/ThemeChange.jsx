import React from "react";

const ThemeChange = ({ className = "" }) => {
  const handleClick = (event) => {
    event.preventDefault();
    const themeMenu = document.getElementById("theme-menu");
    if (themeMenu) {
      themeMenu.classList.toggle("open");
    }
  };

  return (
    <button className={`theme-change ${className}`} onClick={handleClick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { handleClick(e); } }}>
      Theme
    </button>
  );
};

export default ThemeChange;
