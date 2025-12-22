import React, { useState } from "react";
import { createPatient } from "../utils/api";   // ✅ correct API import

export default function AddPatientPage() {

  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.contactNumber || !form.dateOfBirth) {
      setError("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(form.contactNumber)) {
      setError("Contact number must be 10 digits");
      return;
    }

    try {
      await createPatient(form);  // ✅ correct API call

      alert("Patient added successfully ✔");

      // Reset form
      setForm({
        name: "",
        contactNumber: "",
        dateOfBirth: "",
      });

    } catch (err) {
      console.error("Backend error:", err);
      setError("Failed to create patient");
    }
  };

  return (
    <div className="page-center">
      <div className="patient-form-card">
        <h2>Add New Patient</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>

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
  name="contactNumber"
  value={form.contactNumber}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only digits & max 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setForm({ ...form, contactNumber: value });
    }
  }}
  placeholder="9876543210"
  maxLength="10"
/>


          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}
