import React, { useState } from "react";
import { createDoctor } from "../utils/api";  

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    averageConsultationTime: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.specialization || !form.averageConsultationTime) {
      setError("All fields are required");
      return;
    }

    if (form.averageConsultationTime < 1) {
      setError("Consultation time must be greater than 0");
      return;
    }

    try {
      await createDoctor({
        name: form.name,
        specialization: form.specialization,
        averageConsultationTime: Number(form.averageConsultationTime),
      });

      alert("Doctor added successfully ✔");
      setForm({ name: "", specialization: "", averageConsultationTime: "" });

    } catch (err) {
      console.error("Backend doctor error:", err);
      setError("Failed to create doctor");
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Add New Doctor</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-fields">

          <label>Doctor Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Dr. Jane Smith"
          />

          <label>Specialization</label>
          <input
            type="text"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Cardiology"
          />

          <label>Average Consultation Time (minutes)</label>
          <input
            type="number"
            name="averageConsultationTime"
            value={form.averageConsultationTime}
            onChange={handleChange}
            placeholder="15"
            min="1"
          />

          <button type="submit" className="form-btn">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}
