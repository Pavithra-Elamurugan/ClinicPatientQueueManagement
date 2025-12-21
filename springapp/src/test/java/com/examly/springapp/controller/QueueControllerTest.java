package com.examly.springapp.controller;

import com.examly.springapp.entity.Doctor;
import com.examly.springapp.entity.Patient;
import com.examly.springapp.entity.QueueEntry;
import com.examly.springapp.repository.DoctorRepository;
import com.examly.springapp.repository.PatientRepository;
import com.examly.springapp.repository.QueueEntryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class QueueControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private DoctorRepository doctorRepo;
    @Autowired
    private PatientRepository patientRepo;
    @Autowired
    private QueueEntryRepository queueRepo;

    private Doctor doctor;
    private Patient patient;
    private Patient patient2;

    @BeforeEach
    void setUp() {
        queueRepo.deleteAll();
        doctorRepo.deleteAll();
        patientRepo.deleteAll();
        doctor = doctorRepo.save(Doctor.builder()
                .name("Dr. House")
                .specialization("Diagnostic Medicine")
                .averageConsultationTime(30)
                .build());
        patient = patientRepo.save(Patient.builder()
                .name("Alice Queue")
                .contactNumber("9999999999")
                .dateOfBirth(LocalDate.of(1991, 2, 20))
                .medicalRecordNumber("MRN-00001")
                .build());
        patient2 = patientRepo.save(Patient.builder()
                .name("Bob Queue")
                .contactNumber("8888888888")
                .dateOfBirth(LocalDate.of(1992, 3, 21))
                .medicalRecordNumber("MRN-00002")
                .build());
    }

    @Test
    void controller_testAddPatientToQueue_Valid() throws Exception {
        Map<String, Object> req = new HashMap<>();
        req.put("patientId", patient.getId());
        req.put("doctorId", doctor.getId());
        req.put("priority", 3);
        mockMvc.perform(post("/api/queue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.patient.id").value(patient.getId()))
                .andExpect(jsonPath("$.doctor.id").value(doctor.getId()))
                .andExpect(jsonPath("$.queueNumber").value(1))
                .andExpect(jsonPath("$.estimatedWaitTime").value(0))
                .andExpect(jsonPath("$.status").value("WAITING"));

        // Add another, ensure queue number and estimate
        req.put("patientId", patient2.getId());
        req.put("priority", 2);
        mockMvc.perform(post("/api/queue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.queueNumber").value(2));
    }

    @Test
    void controller_testAddPatientToQueue_InvalidData() throws Exception {
        Map<String, Object> req = new HashMap<>();
        req.put("patientId", null);
        req.put("doctorId", null);
        req.put("priority", 8);
        mockMvc.perform(post("/api/queue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void controller_testGetCurrentQueue() throws Exception {
        // Add two, get them in queue
        Map<String, Object> req = new HashMap<>();
        req.put("patientId", patient.getId());
        req.put("doctorId", doctor.getId());
        req.put("priority", 2);
        mockMvc.perform(post("/api/queue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
        req.put("patientId", patient2.getId());
        req.put("priority", 4);
        mockMvc.perform(post("/api/queue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());

        // Instead of hasSize+lessThanOrEqualTo, verify the priorities are sorted directly (or just check two are present):
        mockMvc.perform(get("/api/queue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].priority").value(2))
                .andExpect(jsonPath("$[1].priority").value(4));
    }

    @Test
    void controller_testUpdateQueueEntryStatus_AndRecalculateWaitTimes() throws Exception {
        // Add two, both with priority 2
        Map<String, Object> req = new HashMap<>();
        req.put("patientId", patient.getId());
        req.put("doctorId", doctor.getId());
        req.put("priority", 2);
        String content = objectMapper.writeValueAsString(req);
        String resp1 = mockMvc.perform(post("/api/queue")
                                    .contentType(MediaType.APPLICATION_JSON).content(content))
                .andReturn().getResponse().getContentAsString();
        QueueEntry qe1 = objectMapper.readValue(resp1, QueueEntry.class);
        req.put("patientId", patient2.getId());
        req.put("priority", 2);
        String resp2 = mockMvc.perform(post("/api/queue")
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andReturn().getResponse().getContentAsString();
        QueueEntry qe2 = objectMapper.readValue(resp2, QueueEntry.class);

        // Mark first as COMPLETED
        Map<String, String> statusReq = new HashMap<>();
        statusReq.put("status", "COMPLETED");
        mockMvc.perform(put("/api/queue/"+qe1.getId()+"/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("COMPLETED"));
        // Remaining queue entry should have estimatedWaitTime=0 after recalc
        mockMvc.perform(get("/api/queue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].estimatedWaitTime").value(0));
    }

    @Test
    void controller_testUpdateQueueEntryStatus_InvalidStatus() throws Exception {
        Map<String, Object> req = new HashMap<>();
        req.put("patientId", patient.getId());
        req.put("doctorId", doctor.getId());
        req.put("priority", 2);
        String resp = mockMvc.perform(post("/api/queue")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andReturn().getResponse().getContentAsString();
        QueueEntry qe = objectMapper.readValue(resp, QueueEntry.class);

        Map<String, String> statusReq = new HashMap<>();
        statusReq.put("status", "INVALIDSTATUS");
        mockMvc.perform(put("/api/queue/"+qe.getId()+"/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusReq)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void controller_testUpdateQueueEntryStatus_NotFound() throws Exception {
        Map<String, String> statusReq = new HashMap<>();
        statusReq.put("status", "IN_PROGRESS");
        mockMvc.perform(put("/api/queue/99999/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusReq)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").exists());
    }
}
