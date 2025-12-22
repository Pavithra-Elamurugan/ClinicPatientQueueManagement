import React, { useState } from "react";
import "./FormStyles.css";

export default function AddDoctorPage({ addDoctor }) {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [avgTime, setAvgTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor({
      doctorName,
      specialization,
      averageConsultationTime: avgTime,
    });
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Add New Doctor</h2>

        <form onSubmit={handleSubmit} className="form-fields">
          <label>Doctor Name</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Dr. Jane Smith"
          />

          <label>Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Cardiology"
          />

          <label>Average Consultation Time (minutes)</label>
          <input
            type="number"
            value={avgTime}
            onChange={(e) => setAvgTime(e.target.value)}
            placeholder="15"
          />

          <button type="submit" className="form-btn">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}
