import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";


function About() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // 200ms delay
  
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <p>Coming soon :D</p>
  );
}

export default About;