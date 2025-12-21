import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./layout/Navigation";
import HomePage from "./pages/HomePage";

import DoctorDashboardPage from "./pages/DoctorViewPage";
import AddToQueuePage from "./pages/AddToQueuePage";
import QueueDisplayPage from "./pages/QueueDisplayPage";
import LoginPage from "./pages/LoginPage";
import AddDoctorPage from "./pages/AddDoctorPage";
import AddPatientPage from "./pages/AddPatientPage";


import {
  fetchAllPatients,
  fetchAllDoctors,
  fetchQueue,
  addPatientToQueue,
  updateQueueEntryStatus,
  createDoctor,
  createPatient,
} from "./utils/api";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queueEntries, setQueueEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  // NEW: current logged-in role: "ADMIN" | "DOCTOR" | "PATIENT" | null
  const [role, setRole] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [queue, pats, docs] = await Promise.all([
        fetchQueue(),
        fetchAllPatients(),
        fetchAllDoctors(),
      ]);

      setQueueEntries(queue || []);
      setPatients(pats || []);
      setDoctors(docs || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load data");
    }
  };

  const addToQueue = async (entry) => {
    setLoading(true);
    setError("");
    try {
      await addPatientToQueue(entry);
      const updated = await fetchQueue();
      setQueueEntries(updated || []);
    } catch (err) {
      setError(err.message || "Failed to add to queue");
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (id, status) => {
    setLoading(true);
    setError("");
    try {
      await updateQueueEntryStatus(id, status);
      const updated = await fetchQueue();
      setQueueEntries(updated || []);
    } catch (err) {
      setError(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (data) => {
    setLoading(true);
    try {
      await createDoctor(data);
      loadData();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (data) => {
    setLoading(true);
    try {
      await createPatient(data);
      loadData();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // handle login from LoginPage
  const handleLogin = ({ role }) => {
    setRole(role); // "ADMIN" | "DOCTOR" | "PATIENT"
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <Router>
      <Navigation role={role} onLogout={handleLogout} />

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {error}
        </p>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Login accessible to everyone */}
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              loading={loading}
              error={""}
            />
          }
        />

        {/* Admin: can access everything */}
        <Route
          path="/queue-add"
          element={
            <AddToQueuePage
              patients={patients}
              doctors={doctors}
              addToQueue={addToQueue}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/queue-list"
          element={
            <QueueDisplayPage
              queueEntries={queueEntries}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
  path="/add-doctor"
  element={<AddDoctorPage addDoctor={addDoctor} loading={loading} />}
/>

<Route
  path="/add-patient"
  element={<AddPatientPage addPatient={addPatient} loading={loading} />}
/>

        <Route
          path="/doctor-view"
          element={
            <DoctorDashboardPage
              doctors={doctors}
              queueEntries={queueEntries}
              onStatusChange={onStatusChange}
              selectedDoctorId={selectedDoctorId}
              setSelectedDoctorId={setSelectedDoctorId}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>
    </Router>
  );
}
