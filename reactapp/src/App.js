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

  const [role, setRole] = useState(null);

  /* -----------------------------------------------------------
     AUTO-REFRESH LOGIC (LIVE UPDATE)
  ----------------------------------------------------------- */
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

  // Load once + then refresh every 3 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);

    return () => clearInterval(interval);
  }, []);

  /* -----------------------------------------------------------
     CRUD ACTIONS
  ----------------------------------------------------------- */

  const addToQueue = async (entry) => {
    setLoading(true);
    try {
      await addPatientToQueue(entry);
      loadData(); // refresh instantly
    } catch (err) {
      setError(err.message || "Failed to add to queue");
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (id, status) => {
    setLoading(true);
    try {
      await updateQueueEntryStatus(id, status);
      loadData();
    } catch (err) {
      setError(err.message || "Failed to update status");
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

  /* -----------------------------------------------------------
     LOGIN / LOGOUT
  ----------------------------------------------------------- */

  const handleLogin = ({ role }) => {
    setRole(role);
  };

  const handleLogout = () => {
    setRole(null);
  };

  /* -----------------------------------------------------------
     ROUTES
  ----------------------------------------------------------- */

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
          element={
            <AddDoctorPage addDoctor={addDoctor} loading={loading} />
          }
        />

        <Route
          path="/add-patient"
          element={
            <AddPatientPage addPatient={addPatient} loading={loading} />
          }
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
