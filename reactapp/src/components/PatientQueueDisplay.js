import React, { useState, useEffect } from "react";

const STATUS_COLORS = {
  WAITING: "#3b82f6",
  COMPLETED: "#9ca3af",
  "IN PROGRESS": "#22c55e",
  IN_PROGRESS: "#22c55e",
};

const PAGE_SIZE = 10; // Show 10 records per page

const PatientQueueDisplay = ({ queueEntries = [], loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const hasData = queueEntries && queueEntries.length > 0;
  const sortedQueue = hasData
    ? [...queueEntries].sort((a, b) => a.priority - b.priority)
    : [];
  const totalPages = hasData ? Math.ceil(sortedQueue.length / PAGE_SIZE) : 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!hasData) return <p>No patients</p>;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItems = sortedQueue.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="queue-display">
      <h2>Current Patient Queue</h2>

      <div className="queue-wrapper">
        <table role="table">
          <thead>
            <tr>
              <th>Queue No</th>
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
                  <td>{entry.queueNumber}</td>
                  <td>{entry.patient?.name}</td>
                  <td>{entry.doctor?.name}</td>
                  <td style={{ color: STATUS_COLORS[statusText] }}>
                    {statusText}
                  </td>
                  <td>{entry.estimatedWaitTime} min</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls: Prev  [current/total]  Next */}
      {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="pagination">
    <button
      type="button"
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ‹ Prev
    </button>

    <span className="page-info">
      {currentPage} / {totalPages}
    </span>

    <button
      type="button"
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next ›
    </button>
  </div>
)}

    </div>
  );
};

export default PatientQueueDisplay;
