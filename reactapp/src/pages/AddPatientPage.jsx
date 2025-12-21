import AddPatientForm from "../components/AddPatientForm";

export default function AddPatientPage({ addPatient, loading }) {
  return (
    <div className="page-center">
      <div className="form-card">
        <h1 className="page-title"> Add Patient </h1>
        <AddPatientForm onSubmit={addPatient} loading={loading} />
      </div>
    </div>
  );
}
