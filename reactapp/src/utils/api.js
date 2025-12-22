const BASE_URL = "http://localhost:8080/api";  
// Make sure your Spring Boot is running on 8080

// Helper → safely parse JSON or text
const parseResponse = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};

/* ----------------------- GET PATIENTS ----------------------- */
export const fetchAllPatients = async () => {
  const res = await fetch(`${BASE_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
};

/* ----------------------- GET DOCTORS ----------------------- */
export const fetchAllDoctors = async () => {
  const res = await fetch(`${BASE_URL}/doctors`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

/* ----------------------- GET QUEUE ----------------------- */
export const fetchQueue = async () => {
  const res = await fetch(`${BASE_URL}/queue`);
  if (!res.ok) throw new Error("Failed to fetch queue");
  return res.json();
};

/* ----------------------- ADD TO QUEUE ----------------------- */
export const addPatientToQueue = async (data) => {
  const res = await fetch(`${BASE_URL}/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await parseResponse(res);

  if (!res.ok) {
    console.error("Queue Add Error:", responseBody);
    throw new Error(responseBody || "Failed to add patient to queue");
  }

  return responseBody;
};

/* ----------------------- UPDATE QUEUE STATUS ----------------------- */
export const updateQueueEntryStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/queue/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const responseBody = await parseResponse(res);

  if (!res.ok) {
    console.error("Update Status Error:", responseBody);
    throw new Error(responseBody || "Failed to update status");
  }

  return responseBody;
};

/* ----------------------- CREATE DOCTOR ----------------------- */
export const createDoctor = async (payload) => {
  const res = await fetch(`${BASE_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const responseBody = await parseResponse(res);

  if (!res.ok) {
    console.error("Create Doctor Error:", responseBody);
    throw new Error(responseBody || "Failed to create doctor");
  }

  return responseBody;
};

/* ----------------------- CREATE PATIENT ----------------------- */
export const createPatient = async (payload) => {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const responseBody = await parseResponse(res);

  if (!res.ok) {
    console.error("Create Patient Error:", responseBody);
    throw new Error(responseBody || "Failed to create patient");
  }

  return responseBody;
};
