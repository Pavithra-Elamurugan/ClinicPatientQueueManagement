// src/pages/QueueDisplayPage.jsx
import React from "react";
import PatientQueueDisplay from "../components/PatientQueueDisplay";

export default function QueueDisplayPage({ queueEntries, loading, error }) {
  return (
    <div className="page-center">
      <PatientQueueDisplay
        queueEntries={queueEntries}
        loading={loading}
        error={error}
      />
    </div>
  );
}
