import React from "react";
import DoctorView from "../components/DoctorView";

export default function DoctorDashboardPage({
  doctors,
  queueEntries,
  onStatusChange,
  selectedDoctorId,
  setSelectedDoctorId,
  loading,
  error,
}) {
  return (
    <div className="page-center">
      <div className="card doctor-view-container">
        <DoctorView
          doctors={doctors}
          queueEntries={queueEntries}
          onAction={onStatusChange}
          selectedDoctorId={selectedDoctorId}
          setSelectedDoctorId={setSelectedDoctorId}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
