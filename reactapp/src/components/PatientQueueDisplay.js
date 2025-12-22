import React, { useState, useEffect } from "react";

const STATUS_COLORS = {
  WAITING: "#2563eb",
  COMPLETED: "#9ca3af",
  "IN PROGRESS": "#22c55e",
  IN_PROGRESS: "#22c55e",
};

const PAGE_SIZE = 10;

export default function PatientQueueDisplay({ queueEntries = [], loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  // Doctor List
  const doctorList = Array.isArray(queueEntries)
    ? [...new Set(queueEntries.map((e) => e.doctor?.name).filter(Boolean))]
    : [];

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, doctorFilter]);

  // Filtering Logic
  const filtered = Array.isArray(queueEntries)
    ? queueEntries.filter((entry) => {
        const statusText =
          entry.status === "IN_PROGRESS" ? "IN PROGRESS" : entry.status;

        const search = searchText.toLowerCase();
        const matchSearch =
          entry.patient?.name?.toLowerCase().includes(search) ||
          entry.doctor?.name?.toLowerCase().includes(search) ||
          statusText.toLowerCase().includes(search);

        const matchStatus = !statusFilter || statusText === statusFilter;
        const matchDoctor = !doctorFilter || entry.doctor?.name === doctorFilter;

        return matchSearch && matchStatus && matchDoctor;
      })
    : [];

  const sorted = [...filtered].sort((a, b) => a.priority - b.priority);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentItems = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(queueEntries) || queueEntries.length === 0)
    return <p>No patients</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Current Patient Queue</h2>

      {/* --- COMPACT FILTER BAR (All in one row) --- */}
{/* --- EQUAL WIDTH FILTER BAR --- */}
<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    width: "100%",
  }}
>
  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search patient, doctor, status..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{
      flex: 1,
      height: "42px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #d4d4d4",
      fontSize: "15px",
      background: "#fff",
    }}
  />

  {/* STATUS */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{
      flex: 1,
      height: "42px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #d4d4d4",
      fontSize: "15px",
      background: "#fff",
    }}
  >
    <option value="">All Status</option>
    <option value="WAITING">Waiting</option>
    <option value="IN PROGRESS">In Progress</option>
    <option value="COMPLETED">Completed</option>
  </select>

  {/* DOCTORS */}
  <select
    value={doctorFilter}
    onChange={(e) => setDoctorFilter(e.target.value)}
    style={{
      flex: 1,
      height: "42px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #d4d4d4",
      fontSize: "15px",
      background: "#fff",
    }}
  >
    <option value="">All Doctors</option>
    {doctorList.map((doc) => (
      <option key={doc} value={doc}>
        {doc}
      </option>
    ))}
  </select>
</div>



      {/* --- TABLE --- */}
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e0e7ff" }}>
              <th style={{ padding: "12px" }}>Queue No</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Estimated Time</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((entry) => {
              const statusText =
                entry.status === "IN_PROGRESS" ? "IN PROGRESS" : entry.status;

              return (
                <tr key={entry.id}>
                  <td style={{ padding: "10px" }}>{entry.queueNumber}</td>
                  <td>{entry.patient?.name}</td>
                  <td>{entry.doctor?.name}</td>
                  <td
                    style={{
                      color: STATUS_COLORS[statusText],
                      fontWeight: 500,
                    }}
                  >
                    {statusText}
                  </td>
                  <td>{entry.estimatedWaitTime} min</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION --- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>

          <span className="page-info">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
