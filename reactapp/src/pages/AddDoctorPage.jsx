import React, { useState } from "react";
import { createDoctor } from "../utils/api";
import { toast } from "react-toastify";
import AddDoctorForm from "../components/AddDoctorForm";

export default function AddDoctorPage() {
  const [loading, setLoading] = useState(false);

  const handleAddDoctor = async (data) => {
    setLoading(true);
    try {
      await createDoctor(data);
      toast.success("Doctor added successfully ✔");
    } catch (err) {
      toast.error("Failed to create doctor ❌");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Add New Doctor</h2>

        <AddDoctorForm
          onSubmit={handleAddDoctor}
          loading={loading}
        />
      </div>
    </div>
  );
}
