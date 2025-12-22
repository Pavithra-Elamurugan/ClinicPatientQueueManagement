// src/pages/QueueDisplayPage.jsx
import React from "react";
import PatientQueueDisplay from "../components/PatientQueueDisplay";

export default function QueueDisplayPage({ queueEntries, loading, error }) {
  return (
    <div
      className="page-center"
      style={{
        width: "100%",
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="queue-display"
        style={{
          width: "90%",
          maxWidth: "1100px",
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
        }}
      >
        <PatientQueueDisplay
          queueEntries={queueEntries}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
