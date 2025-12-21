import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ role, onLogout }) {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <span className="nav-logo">🧾 Clinic Queue</span>
      </div>

      <div className="nav-right">
        {/* Admin links */}
        {role === "ADMIN" && (
          <>
            {/* Add Doctor */}
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🧑‍⚕️ <span>Add Doctor</span>
            </NavLink>

            {/* Add Patient */}
            <NavLink
              to="/add-patient"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🧍 <span>Add Patient</span>
            </NavLink>

            {/* Add to Queue */}
            <NavLink
              to="/queue-add"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              ➕ <span>Add To Queue</span>
            </NavLink>

            {/* Queue list */}
            <NavLink
              to="/queue-list"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              📋 <span>Queue</span>
            </NavLink>

            {/* Doctor view */}
            <NavLink
              to="/doctor-view"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🩺 <span>Doctor View</span>
            </NavLink>
          </>
        )}

        {/* Doctor links */}
        {role === "DOCTOR" && (
          <>
            {/* Add Doctor form for doctor */}
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🧑‍⚕️ <span>Add Doctor</span>
            </NavLink>

            {/* Queue */}
            <NavLink
              to="/queue-list"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              📋 <span>Queue</span>
            </NavLink>

            {/* Doctor view */}
            <NavLink
              to="/doctor-view"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🩺 <span>Doctor View</span>
            </NavLink>
          </>
        )}

        {/* Patient links */}
        {role === "PATIENT" && (
          <>
            {/* Add Patient form for patient */}
            <NavLink
              to="/add-patient"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              🧍 <span>Add Patient</span>
            </NavLink>

            {/* Add to Queue (patient joins queue) */}
            <NavLink
              to="/queue-add"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              ➕ <span>Add To Queue</span>
            </NavLink>

            {/* View queue */}
            <NavLink
              to="/queue-list"
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              📋 <span>Queue</span>
            </NavLink>
          </>
        )}

        {/* Login / Logout + Home (always visible) */}
        {!role ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "nav-item" + (isActive ? " nav-item-active" : "")
            }
          >
            🔐 <span>Login</span>
          </NavLink>
        ) : (
          <button
            type="button"
            className="nav-item nav-logout"
            onClick={onLogout}
          >
            📤 <span>Logout ({role.toLowerCase()})</span>
          </button>
        )}

        <NavLink
          to="/"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " nav-item-active" : "")
          }
        >
          🏠 <span>Home</span>
        </NavLink>
      </div>
    </nav>
  );
}
