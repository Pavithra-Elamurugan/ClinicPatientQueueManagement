package com.examly.springapp.service;

import com.examly.springapp.entity.Doctor;
import com.examly.springapp.entity.Patient;
import com.examly.springapp.entity.QueueEntry;
import com.examly.springapp.entity.QueueEntry.Status;
import com.examly.springapp.exception.BadRequestException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.DoctorRepository;
import com.examly.springapp.repository.PatientRepository;
import com.examly.springapp.repository.QueueEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QueueEntryService {

    private final QueueEntryRepository queueRepo;
    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;

    public QueueEntryService(QueueEntryRepository queueRepo, DoctorRepository doctorRepo, PatientRepository patientRepo) {
        this.queueRepo = queueRepo;
        this.doctorRepo = doctorRepo;
        this.patientRepo = patientRepo;
    }

    @Transactional
    public QueueEntry addToQueue(Long patientId, Long doctorId, Integer priority) {
        if (patientId == null || doctorId == null || priority == null || priority < 1 || priority > 5) {
            throw new BadRequestException("Invalid input");
        }
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        int nextNumber = queueRepo.countByDoctorId(doctorId) + 1;

        QueueEntry entry = QueueEntry.builder()
                .doctor(doctor)
                .patient(patient)
                .priority(priority)
                .queueNumber(nextNumber)
                .status(Status.WAITING)
                .joinTime(LocalDateTime.now())
                .estimatedWaitTime(0)
                .build();

        QueueEntry saved = queueRepo.save(entry);
        recalcForDoctor(doctorId);
        return saved;
    }

    public List<QueueEntry> getCurrentQueue() {
        return queueRepo.findAllByOrderByPriorityAscJoinTimeAsc();
    }

    @Transactional
    public QueueEntry updateStatus(Long id, String status) {
        QueueEntry entry = queueRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Queue entry not found"));
        Status newStatus;
        try {
            newStatus = Status.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status");
        }
        entry.setStatus(newStatus);
        QueueEntry updated = queueRepo.save(entry);
        recalcForDoctor(entry.getDoctor().getId());
        return updated;
    }

    /** Recalculate estimated wait times for WAITING entries of a doctor. */
    private void recalcForDoctor(Long doctorId) {
        List<QueueEntry> active = queueRepo.findByDoctorIdOrderByPriorityAscJoinTimeAsc(doctorId);
        // Only WAITING entries should have non-zero wait; IN_PROGRESS gets 0; others ignored.
        for (int i = 0; i < active.size(); i++) {
            QueueEntry current = active.get(i);
            if (current.getStatus() == Status.WAITING) {
                int aheadCount = 0;
                for (int j = 0; j < i; j++) {
                    QueueEntry ahead = active.get(j);
                    if ((ahead.getStatus() == Status.WAITING || ahead.getStatus() == Status.IN_PROGRESS)
                            && (ahead.getPriority() <= current.getPriority())) {
                        aheadCount++;
                    }
                }
                int avg = current.getDoctor().getAverageConsultationTime() == null
                        ? 0 : current.getDoctor().getAverageConsultationTime();
                current.setEstimatedWaitTime(aheadCount * avg);
            } else if (current.getStatus() == Status.IN_PROGRESS) {
                current.setEstimatedWaitTime(0);
            }
        }
        queueRepo.saveAll(active);
    }
}
