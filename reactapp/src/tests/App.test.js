import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../utils/api';
import "@testing-library/jest-dom";
jest.mock('../utils/api');

// Fix mocks for ES6 module import
api.fetchAllPatients = jest.fn();
api.fetchAllDoctors = jest.fn();
api.fetchQueue = jest.fn();
api.addPatientToQueue = jest.fn();
api.updateQueueEntryStatus = jest.fn();

const mockPatients = [
  { id: 1, name: 'John Doe', contactNumber: '1234567890', dateOfBirth: '1990-01-15', medicalRecordNumber: 'MRN-12345' },
];
const mockDoctors = [
  { id: 1, name: 'Dr. Jane Smith', specialization: 'Cardiology', averageConsultationTime: 15 },
];
const mockQueue = [
  {
    id: 11,
    queueNumber: 1,
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    status: 'WAITING',
    joinTime: '2023-07-16T09:00:00',
    estimatedWaitTime: 15,
    priority: 3,
  }
];

describe('App integration smoke test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.fetchAllPatients.mockResolvedValue([...mockPatients]);
    api.fetchAllDoctors.mockResolvedValue([...mockDoctors]);
    api.fetchQueue.mockResolvedValue([...mockQueue]);
    api.addPatientToQueue.mockImplementation(async () => ({ ...mockQueue[0] }));
    api.updateQueueEntryStatus.mockResolvedValue({ ...mockQueue[0], status: 'IN_PROGRESS' });
  });

  test('Axios_loads and displays queue, form, doctor view', async () => {
    render(<App />);
    // Wait for the form & table
    await waitFor(() => expect(screen.getByText('Add Patient To Queue')).toBeInTheDocument());
    expect(screen.getByText(/Clinic Patient Queue Management System/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Current Patient Queue/i)).toBeInTheDocument());
    // DoctorView present
    expect(screen.getByText('Doctor View')).toBeInTheDocument();
    // Table should show mocked queue
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('WAITING')).toBeInTheDocument());
    await waitFor(() => expect(screen.getAllByText('15')[0]).toBeInTheDocument());
  });

  test('Axios_can add patient to queue via form', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('add-queue-form'));
    fireEvent.change(screen.getByTestId('patient-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('doctor-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('priority-select'), { target: { value: '3' } });
    fireEvent.click(screen.getByTestId('add-queue-btn'));
    // This triggers API call + reloads queue
    await waitFor(() => expect(api.addPatientToQueue).toHaveBeenCalled());
    await waitFor(() => expect(api.fetchQueue).toHaveBeenCalledTimes(2));
  });

  test('Axios_doctor can update patient status in DoctorView', async () => {
    render(<App />);
    // select doctor
    await waitFor(() => screen.getByTestId('doctor-view-select'));
    // select the single doctor
    fireEvent.change(screen.getByTestId('doctor-view-select'), { target: { value: '1' } });
    // Start button
    await waitFor(() => screen.getByTestId('start-btn-11'));
    fireEvent.click(screen.getByTestId('start-btn-11'));
    await waitFor(() => expect(api.updateQueueEntryStatus).toHaveBeenCalledWith(11, 'IN_PROGRESS'));
    // Complete button now
    api.fetchQueue.mockResolvedValueOnce([{ ...mockQueue[0], status: 'IN_PROGRESS' }]);
    await waitFor(() => expect(api.fetchQueue).toHaveBeenCalledTimes(2));
  });

  test('ErrorHandling_handles API error in form', async () => {
    api.addPatientToQueue.mockRejectedValue({ message: 'Something broke' });
    render(<App />);
    await waitFor(() => screen.getByTestId('add-queue-form'));
    fireEvent.change(screen.getByTestId('patient-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('doctor-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('priority-select'), { target: { value: '3' } });
    fireEvent.click(screen.getByTestId('add-queue-btn'));
    await waitFor(() => screen.getByText(/Something broke/i));
  });
});
