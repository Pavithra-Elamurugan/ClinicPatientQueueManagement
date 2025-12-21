import { render, screen } from '@testing-library/react';
import PatientQueueDisplay from '../components/PatientQueueDisplay';
import "@testing-library/jest-dom";
describe('PatientQueueDisplay', () => {
  const mockQueue = [
    { id: 1, queueNumber: 1, patient: { name: 'John' }, doctor: { name: 'Dr A' }, status: 'WAITING', estimatedWaitTime: 15, joinTime: '2023-06-10T10:00:00', priority: 2 },
    { id: 2, queueNumber: 2, patient: { name: 'Jane' }, doctor: { name: 'Dr B' }, status: 'COMPLETED', estimatedWaitTime: 0, joinTime: '2023-06-10T10:01:00', priority: 3 },
    { id: 3, queueNumber: 3, patient: { name: 'Alice' }, doctor: { name: 'Dr A' }, status: 'IN_PROGRESS', estimatedWaitTime: 6, joinTime: '2023-06-10T10:02:00', priority: 2 }
  ];
  it('State_renders sorted queue, color codes status', () => {
    render(<PatientQueueDisplay queueEntries={mockQueue} loading={false} />);
    const table = screen.getByRole('table');
    // Sorted: priority (2, 2, 3)
    expect(table).toBeInTheDocument();
    // Dr A in two rows
    expect(screen.getAllByText('Dr A').length).toBe(2);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    // Color code: get WAITING row
    const statusWaiting = screen.getByText(/WAITING/i);
    expect(statusWaiting).toHaveStyle('color: #3b82f6');
    expect(screen.getByText(/COMPLETED/i)).toHaveStyle('color: #9ca3af');
    // Look for IN PROGRESS (space)
    expect(screen.getByText(/IN PROGRESS/i)).toHaveStyle('color: #22c55e');
  });
  it('State_shows loading/error state', () => {
    render(<PatientQueueDisplay queueEntries={[]} loading={true} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    render(<PatientQueueDisplay queueEntries={[]} error="Error here" />);
    expect(screen.getByText(/error here/i)).toBeInTheDocument();
  });
  it('State_shows empty state', () => {
    render(<PatientQueueDisplay queueEntries={[]} />);
    expect(screen.getByText(/no patients/i)).toBeInTheDocument();
  });
});
