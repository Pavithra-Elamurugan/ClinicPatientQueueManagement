const BASE_URL = "http://localhost:8080/api";

/* ----------------------- HELPER ----------------------- */
const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    console.error("API Error:", data);
    throw new Error(data || "Something went wrong");
  }

  return data;
};

/* ----------------------- PATIENTS ----------------------- */
export const fetchAllPatients = () =>
  request("/patients");

export const createPatient = (payload) =>
  request("/patients", {
    method: "POST",
    body: JSON.stringify(payload),
  });

/* ----------------------- DOCTORS ----------------------- */
export const fetchAllDoctors = () =>
  request("/doctors");

export const createDoctor = (payload) =>
  request("/doctors", {
    method: "POST",
    body: JSON.stringify(payload),
  });

/* ----------------------- QUEUE ----------------------- */
export const fetchQueue = () =>
  request("/queue");

export const addPatientToQueue = (payload) =>
  request("/queue", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateQueueEntryStatus = (id, status) =>
  request(`/queue/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
