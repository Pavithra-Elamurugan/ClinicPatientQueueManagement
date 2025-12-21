import React, { useState } from "react";

const AddPatientToQueueForm = ({
  patients = [],
  doctors = [],
  onSubmit,
  loading,
  error,
}) => {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [priority, setPriority] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <form data-testid="add-queue-form" onSubmit={handleSubmit}>
      <h2>Add Patient To Queue</h2>

      <label htmlFor="patient-select">Patient selection</label>
      <select
        id="patient-select"
        data-testid="patient-select"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <label htmlFor="doctor-select">Doctor selection</label>
      <select
        id="doctor-select"
        data-testid="doctor-select"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      >
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <label htmlFor="priority-select">Priority selection</label>
      <select
        id="priority-select"
        data-testid="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Select Priority</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      {/* Validation error shown first */}
      {validationError && <p>{validationError}</p>}

      {/* API error shown always if provided */}
      {!validationError && error && <p>{error}</p>}

      <button data-testid="add-queue-btn" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add to Queue"}
      </button>
    </form>
  );
};

export default AddPatientToQueueForm;
