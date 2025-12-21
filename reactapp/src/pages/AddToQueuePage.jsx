import React from "react";
import AddPatientToQueueForm from "../components/AddPatientToQueueForm";

export default function AddToQueuePage({
  patients,
  doctors,
  addToQueue,
  loading,
  error,
}) {
  return (
    <div className="page-center">
      <div className="form-card">
        <h1 className="page-title">Add Patient to Queue</h1>
        <p className="page-subtitle">
          Select a patient, doctor and priority to add them to the queue.
        </p>

        <AddPatientToQueueForm
          patients={patients}
          doctors={doctors}
          onSubmit={addToQueue}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
