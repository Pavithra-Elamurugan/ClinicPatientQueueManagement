package com.examly.springapp.service;

import com.examly.springapp.entity.Doctor;
import com.examly.springapp.repository.DoctorRepository;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor create(Doctor d) {
        return doctorRepository.save(d);
    }
}
