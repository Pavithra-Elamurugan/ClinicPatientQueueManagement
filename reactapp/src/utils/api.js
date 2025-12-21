const BASE_URL = "http://localhost:8080/api";  // <<--- change to your backend port

// GET all patients
export const fetchAllPatients = async () => {
  const res = await fetch(`${BASE_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
};

// GET all doctors
export const fetchAllDoctors = async () => {
  const res = await fetch(`${BASE_URL}/doctors`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

// GET queue
export const fetchQueue = async () => {
  const res = await fetch(`${BASE_URL}/queue`);
  if (!res.ok) throw new Error("Failed to fetch queue");
  return res.json();
};

// POST add to queue
export const addPatientToQueue = async (data) => {
  const res = await fetch(`${BASE_URL}/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add patient to queue");
  return res.json();
};

// PUT update queue entry
export const updateQueueEntryStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/queue/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

// POST create doctor
export const createDoctor = async (payload) => {
  const res = await fetch(`${BASE_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create doctor");
  return res.json();
};

// POST create patient
export const createPatient = async (payload) => {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
};
