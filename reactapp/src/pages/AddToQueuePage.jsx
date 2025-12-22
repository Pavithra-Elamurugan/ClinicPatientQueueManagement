import React, { useState } from "react";
import "./FormStyles.css";

export default function AddToQueuePage({
  patients = [],
  doctors = [],
  addToQueue
}) {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addToQueue({ patientId, doctorId, priority });
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Add Patient To Queue</h2>

        <form onSubmit={handleSubmit} className="form-fields">
          <label>Patient selection</label>
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.patientName}</option>
            ))}
          </select>

          <label>Doctor selection</label>
          <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>{d.doctorName}</option>
            ))}
          </select>

          <label>Priority selection</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <button type="submit" className="form-btn">Add to Queue</button>
        </form>
      </div>
    </div>
  );
}
