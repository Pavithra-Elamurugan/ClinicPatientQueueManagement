import React, { useState } from "react";
import "./FormStyles.css";
import { toast } from "react-toastify";
import AddPatientToQueueForm from "../components/AddPatientToQueueForm";

export default function AddToQueuePage({
  patients = [],
  doctors = [],
  addToQueue,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddToQueue = async (data) => {
    setLoading(true);
    setError("");

    try {
      await addToQueue(data);
      toast.success("Added to queue successfully ✔");
    } catch (err) {
      setError("Failed to add to queue");
      toast.error("Failed to add to queue ❌");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Add Patient To Queue</h2>

        <AddPatientToQueueForm
          patients={patients}
          doctors={doctors}
          onSubmit={handleAddToQueue}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
