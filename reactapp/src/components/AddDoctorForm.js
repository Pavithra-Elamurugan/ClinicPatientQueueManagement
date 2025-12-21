import React, { useState } from 'react';

function AddDoctorForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [averageConsultationTime, setAverageConsultationTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !specialization || !averageConsultationTime) {
      setError('All fields are required');
      return;
    }

    if (averageConsultationTime <= 0) {
      setError('Consultation time must be positive');
      return;
    }

    try {
      await onSubmit({
        name,
        specialization,
        averageConsultationTime: parseInt(averageConsultationTime),
      });
      // Clear form on success
      setName('');
      setSpecialization('');
      setAverageConsultationTime('');
    } catch (err) {
      setError(err.message || 'Failed to add doctor');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Doctor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Doctor Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Jane Smith"
            disabled={loading}
          />
        </label>
        <label>
          Specialization
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Cardiology"
            disabled={loading}
          />
        </label>
        <label>
          Average Consultation Time (minutes)
          <input
            type="number"
            value={averageConsultationTime}
            onChange={(e) => setAverageConsultationTime(e.target.value)}
            placeholder="15"
            min="1"
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  );
}

export default AddDoctorForm;
