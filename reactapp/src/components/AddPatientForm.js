import React, { useState } from 'react';

function AddPatientForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !contactNumber || !dateOfBirth) {
      setError('All fields are required');
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setError('Contact number must be 10 digits');
      return;
    }

    try {
      await onSubmit({
        name,
        contactNumber,
        dateOfBirth,
      });
      // Clear form on success
      setName('');
      setContactNumber('');
      setDateOfBirth('');
    } catch (err) {
      setError(err.message || 'Failed to add patient');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Patient</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            disabled={loading}
          />
        </label>
        <label>
          Contact Number
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="1234567890"
            maxLength="10"
            disabled={loading}
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
}

export default AddPatientForm;
