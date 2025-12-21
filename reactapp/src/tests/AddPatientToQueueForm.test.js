import { render, screen, fireEvent } from '@testing-library/react';
import AddPatientToQueueForm from '../components/AddPatientToQueueForm';
import "@testing-library/jest-dom";

describe('AddPatientToQueueForm', () => {
  const patients = [{ id: 1, name: 'John Doe', medicalRecordNumber: 'MRN-12345' }];
  const doctors = [{ id: 5, name: 'Dr Smith', specialization: 'Dentist' }];
  it('State_renders fields and validates', () => {
    const fn = jest.fn();
    render(<AddPatientToQueueForm patients={patients} doctors={doctors} onSubmit={fn} loading={false} />);
    expect(screen.getByLabelText(/patient selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/doctor selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority selection/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-queue-btn'));
    expect(screen.getByText(/all fields/i)).toBeInTheDocument();
  });
  it('Form_submits valid form', () => {
    const fn = jest.fn();
    render(<AddPatientToQueueForm patients={patients} doctors={doctors} onSubmit={fn} loading={false} />);
    fireEvent.change(screen.getByTestId('patient-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('doctor-select'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('priority-select'), { target: { value: '2' } });
    fireEvent.click(screen.getByTestId('add-queue-btn'));
    expect(fn).toHaveBeenCalledWith({ patientId: 1, doctorId: 5, priority: 2 });
  });
  it('State_shows api error', () => {
    render(<AddPatientToQueueForm patients={patients} doctors={doctors} onSubmit={()=>{}} loading={false} error="API Error" />);
    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });
});
