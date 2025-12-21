import { render, screen, fireEvent } from '@testing-library/react';
import DoctorView from '../components/DoctorView';
import "@testing-library/jest-dom";
describe('DoctorView', () => {
  const doctors = [
    { id: 1, name: 'Dr A', specialization: 'A' },
    { id: 2, name: 'Dr B', specialization: 'B' },
  ];
  const queue = [
    { id: 10, queueNumber: 1, patient: { name: 'John' }, doctor: { id: 1, name: 'Dr A' }, status: 'WAITING', estimatedWaitTime: 8, priority: 1, joinTime: '2023-01-01T10:00:00' },
    { id: 20, queueNumber: 2, patient: { name: 'Jane' }, doctor: { id: 1, name: 'Dr A' }, status: 'IN_PROGRESS', estimatedWaitTime: 23, priority: 2, joinTime: '2023-01-01T10:03:00' },
    { id: 30, queueNumber: 1, patient: { name: 'Ann' }, doctor: { id: 2, name: 'Dr B' }, status: 'WAITING', estimatedWaitTime: 15, priority: 2, joinTime: '2023-01-01T10:05:00' },
  ];
  it('State_renders with doctor selection and empty state', () => {
    render(
      <DoctorView
        doctors={doctors}
        selectedDoctorId={''}
        setSelectedDoctorId={()=>{}}
        queueEntries={queue}
        onAction={()=>{}}
        loading={false}
        error={null}
      />
    );
    expect(screen.getByLabelText(/Select doctor/i)).toBeInTheDocument();
    // Expect in dropdown option and in label: getAllByText
    expect(screen.getAllByText(/select doctor/i).length).toBeGreaterThanOrEqual(1);
    // For no doctor selected
    expect(screen.queryByText('No queue entries for selected doctor.')).not.toBeInTheDocument();
  });
  it('State_shows doctor queue and action buttons', () => {
    const fn = jest.fn();
    render(
      <DoctorView
        doctors={doctors}
        selectedDoctorId={'1'}
        setSelectedDoctorId={()=>{}}
        queueEntries={queue}
        onAction={fn}
        loading={false}
        error={null}
      />
    );
    // Only Dr A's
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    // Dr B's patient not listed
    expect(screen.queryByText('Ann')).not.toBeInTheDocument();
    // Action buttons by status
    expect(screen.getByTestId('start-btn-10')).toBeInTheDocument();
    expect(screen.queryByTestId('complete-btn-10')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('start-btn-10'));
    expect(fn).toHaveBeenCalledWith(10, 'IN_PROGRESS');
    expect(screen.getByTestId('complete-btn-20')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-btn-20')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('complete-btn-20'));
    expect(fn).toHaveBeenCalledWith(20, 'COMPLETED');
    fireEvent.click(screen.getByTestId('cancel-btn-20'));
    expect(fn).toHaveBeenCalledWith(20, 'CANCELLED');
  });
  it('State_shows loading/error', () => {
    render(
      <DoctorView doctors={doctors} selectedDoctorId={1} setSelectedDoctorId={()=>{}} queueEntries={[]} onAction={()=>{}} loading={true} error={null} />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    render(
      <DoctorView doctors={doctors} selectedDoctorId={1} setSelectedDoctorId={()=>{}} queueEntries={[]} onAction={()=>{}} loading={false} error="Failed" />
    );
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });
});
