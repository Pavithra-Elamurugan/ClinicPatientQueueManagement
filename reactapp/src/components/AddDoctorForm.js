import React, { useState } from "react";

function AddDoctorForm({ onSubmit, loading }) {
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

    const { name, specialization, averageConsultationTime } = form;

    if (!name || !specialization || !averageConsultationTime) {
      setError("All fields are required");
      return;
    }

    if (averageConsultationTime <= 0) {
      setError("Consultation time must be positive");
      return;
    }

    try {
      await onSubmit({
        name,
        specialization,
        averageConsultationTime: Number(averageConsultationTime),
      });
      setForm({ name: "", specialization: "", averageConsultationTime: "" });
    } catch (err) {
      setError(err?.message || "Failed to add doctor");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-fields">
        <label>Doctor Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Dr. Jane Smith"
          disabled={loading}
        />

        <label>Specialization</label>
        <input
          type="text"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="Cardiology"
          disabled={loading}
        />

        <label>Average Consultation Time (minutes)</label>
        <input
          type="number"
          name="averageConsultationTime"
          value={form.averageConsultationTime}
          onChange={handleChange}
          placeholder="15"
          min="1"
          disabled={loading}
        />

        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </>
  );
}

export default AddDoctorForm;
