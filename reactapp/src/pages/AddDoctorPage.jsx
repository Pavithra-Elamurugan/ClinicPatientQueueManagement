import AddDoctorForm from "../components/AddDoctorForm";

export default function AddDoctorPage({ addDoctor, loading }) {
  return (
    <div className="page-center">
      <div className="form-card">
        <h1 className="page-title"> Add Doctor </h1>
        <AddDoctorForm onSubmit={addDoctor} loading={loading} />
      </div>
    </div>
  );
}
