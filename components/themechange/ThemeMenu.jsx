import React, { useEffect } from "react";
import './ThemeMenu.css';

const ThemeMenu = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  }, []);

  const handleClick = (event) => {
    if (event.target.classList.contains("theme-menu")) {
      event.target.classList.remove("open");
    }
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  };

  const handleThemeChange = (event) => {
    const theme = event.target.getAttribute("data-theme");
    if (theme) {
      applyTheme(theme);
      document.getElementById("theme-menu")?.classList.remove("open");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleThemeChange(event);
    }
  };

  return (
    <div id="theme-menu" className="theme-menu" onClick={handleClick}>
      <ul className="theme-list">
        <li className="theme">
          <button 
            className="theme-button" 
            data-theme="light" 
            tabIndex={0} 
            onClick={handleThemeChange} 
            onKeyDown={handleKeyDown}
          >
            Light
          </button>
        </li>
        <li className="theme">
          <button 
            className="theme-button" 
            data-theme="dark" 
            tabIndex={0} 
            onClick={handleThemeChange} 
            onKeyDown={handleKeyDown}
          >
            Dark
          </button>
        </li>
        {/* <li className="theme">
          <button 
            className="theme-button" 
            data-theme="forest" 
            tabIndex={0} 
            onClick={handleThemeChange} 
            onKeyDown={handleKeyDown}
          >
            Forest
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default ThemeMenu;
