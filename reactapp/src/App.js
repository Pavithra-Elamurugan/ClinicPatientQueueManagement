import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Navigation from "./layout/Navigation";
import HomePage from "./pages/HomePage";

import DoctorDashboardPage from "./pages/DoctorViewPage";
import AddToQueuePage from "./pages/AddToQueuePage";
import QueueDisplayPage from "./pages/QueueDisplayPage";
import LoginPage from "./pages/LoginPage";
import AddDoctorPage from "./pages/AddDoctorPage";
import AddPatientPage from "./pages/AddPatientPage";

// 🔥 Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Background Image (FROM src/assets)
import background from "./assets/background.jpg";

import {
  fetchAllPatients,
  fetchAllDoctors,
  fetchQueue,
  addPatientToQueue,
  updateQueueEntryStatus,
  createDoctor,
  createPatient,
} from "./utils/api";

/* ============================================================
   🔧 STEP 3: LAYOUT WRAPPER (ADD ABOVE App)
============================================================ */
function AppLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      style={
        !isHomePage
          ? {
              minHeight: "100vh",
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {children}
    </div>
  );
}

/* ============================================================
   MAIN APP
============================================================ */
export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queueEntries, setQueueEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [role, setRole] = useState(null);

  /* ---------------- AUTO REFRESH ---------------- */
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

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const addToQueue = async (entry) => {
    setLoading(true);
    try {
      await addPatientToQueue(entry);
      toast.success("Patient added to queue ✔");
      loadData();
    } catch (err) {
      toast.error("Failed to add patient ❌");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (id, status) => {
    setLoading(true);
    try {
      await updateQueueEntryStatus(id, status);
      toast.success("Status updated ✔");
      loadData();
    } catch (err) {
      toast.error("Failed to update status ❌");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (data) => {
    setLoading(true);
    try {
      await createDoctor(data);
      toast.success("Doctor added ✔");
      loadData();
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (data) => {
    setLoading(true);
    try {
      await createPatient(data);
      toast.success("Patient added ✔");
      loadData();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = ({ role }) => setRole(role);
  const handleLogout = () => setRole(null);

  /* ---------------- UI ---------------- */
  return (
    <Router>
      <Navigation role={role} onLogout={handleLogout} />

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

      {/* ✅ BACKGROUND APPLIED HERE */}
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} loading={loading} />}
          />

          <Route
            path="/queue-add"
            element={
              <AddToQueuePage
                patients={patients}
                doctors={doctors}
                addToQueue={addToQueue}
                loading={loading}
              />
            }
          />

          <Route
            path="/queue-list"
            element={
              <QueueDisplayPage
                queueEntries={queueEntries}
                loading={loading}
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
              />
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}
