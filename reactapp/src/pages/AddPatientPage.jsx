import React, { useState } from "react";
import { createPatient } from "../utils/api";
import { toast } from "react-toastify";
import AddPatientForm from "../components/AddPatientForm";

export default function AddPatientPage() {
  const [loading, setLoading] = useState(false);

  const handleAddPatient = async (data) => {
    setLoading(true);
    try {
      await createPatient(data);
      toast.success("Patient added successfully ✔");
    } catch (err) {
      console.error("Backend error:", err);
      toast.error("Failed to create patient ❌");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="patient-form-card">
        <h2>Add New Patient</h2>

        <AddPatientForm
          onSubmit={handleAddPatient}
          loading={loading}
        />
      </div>
    </div>
  );
}
