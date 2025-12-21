import React from "react";
import "./HomePage.css";
import heroImage from "../assets/home-hero.png"; // 👈 IMPORTANT
<img src={heroImage} alt="Clinic Queue System" className="hero-image" />
export default function HomePage({ role }) {
  return (
    <div className="home-hero">
      <img
        src={heroImage}
        alt="Clinic Queue System"
        className="hero-image"
      />
    </div>
  );
}
