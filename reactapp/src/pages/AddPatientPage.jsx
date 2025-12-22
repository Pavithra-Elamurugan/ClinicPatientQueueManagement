import React, { useState } from "react";
import "./FormStyles.css";

export default function AddPatientPage({ addPatient }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.contact || !form.dob) {
      alert("Please fill all fields!");
      return;
    }
    addPatient(form);
  };

  return (
    <div className="page-center">
      <div className="patient-form-card">
        <h2>Add New Patient</h2>

        <label>Patient Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <label>Contact Number</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="9876543210"
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <button className="primary-btn" onClick={handleSubmit}>
          Add Patient
        </button>
      </div>
    </div>
  );
}
