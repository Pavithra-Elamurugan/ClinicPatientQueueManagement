import React from "react";

const DoctorView = ({
  doctors,
  selectedDoctorId,
  setSelectedDoctorId,
  queueEntries,
  onAction,
  loading,
  error,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filtered = queueEntries.filter(
    (q) => String(q.doctor.id) === String(selectedDoctorId)
  );

  return (
    <div>
      <h2>Doctor View</h2>

      <label htmlFor="doctor-view-select">Select doctor</label>
      <select
        id="doctor-view-select"
        data-testid="doctor-view-select"
        value={selectedDoctorId}
        onChange={(e) => setSelectedDoctorId(e.target.value)}
      >
        <option value="">Select doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {selectedDoctorId && filtered.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id}>
                <td>{q.patient.name}</td>
                <td>{q.status}</td>
                <td>
                  {q.status === "WAITING" && (
                    <button
                      data-testid={`start-btn-${q.id}`}
                      onClick={() => onAction(q.id, "IN_PROGRESS")}
                    >
                      Start
                    </button>
                  )}
                  {q.status === "IN_PROGRESS" && (
                    <>
                      <button
                        data-testid={`complete-btn-${q.id}`}
                        onClick={() => onAction(q.id, "COMPLETED")}
                      >
                        Complete
                      </button>
                      <button
                        data-testid={`cancel-btn-${q.id}`}
                        onClick={() => onAction(q.id, "CANCELLED")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedDoctorId && <p>No queue entries for selected doctor.</p>
      )}
    </div>
  );
};

export default DoctorView;
