import React, { useState } from "react";

function AddPatientForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    // allow only digits, max 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setForm({ ...form, contactNumber: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, contactNumber, dateOfBirth } = form;

    if (!name || !contactNumber || !dateOfBirth) {
      setError("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setError("Contact number must be 10 digits");
      return;
    }

    try {
      await onSubmit(form);
      setForm({ name: "", contactNumber: "", dateOfBirth: "" });
    } catch (err) {
      setError(err?.message || "Failed to add patient");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={loading}
        />

        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleContactChange}
          placeholder="9876543210"
          maxLength="10"
          disabled={loading}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          disabled={loading}
        />

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </>
  );
}

export default AddPatientForm;
