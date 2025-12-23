import React, { useState } from "react";

const AddPatientToQueueForm = ({
  patients = [],
  doctors = [],
  onSubmit,
  loading,
  error,
}) => {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    priority: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { patientId, doctorId, priority } = form;

    if (!patientId || !doctorId || !priority) {
      setValidationError("All fields are required");
      return;
    }

    setValidationError("");

    onSubmit({
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      priority: Number(priority),
    });

    // reset after success
    setForm({ patientId: "", doctorId: "", priority: "" });
  };

  return (
    <>
      <form data-testid="add-queue-form" onSubmit={handleSubmit} className="form-fields">

        <label>Patient selection</label>
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Doctor selection</label>
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <label>Priority selection</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Validation first */}
        {validationError && <p>{validationError}</p>}

        {/* API error */}
        {!validationError && error && <p>{error}</p>}

        <button
          data-testid="add-queue-btn"
          type="submit"
          className="form-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Queue"}
        </button>
      </form>
    </>
  );
};

export default AddPatientToQueueForm;
