package com.examly.springapp.service;

import com.examly.springapp.entity.Patient;
import com.examly.springapp.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    private final Random random = new Random();

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Transactional
    public Patient create(Patient p) {
        if (p.getMedicalRecordNumber() == null || p.getMedicalRecordNumber().isBlank()) {
            // Generate MRN-XXXXX
            int num = 10000 + random.nextInt(90000);
            p.setMedicalRecordNumber("MRN-" + num);
        }
        return patientRepository.save(p);
    }
}
