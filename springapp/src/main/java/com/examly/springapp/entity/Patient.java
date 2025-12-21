package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    private String name;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
    private String contactNumber;

    @NotNull(message = "Date of birth must be provided")
    private LocalDate dateOfBirth;

    // Generated on create if absent
    private String medicalRecordNumber;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getMedicalRecordNumber() { return medicalRecordNumber; }
    public void setMedicalRecordNumber(String medicalRecordNumber) { this.medicalRecordNumber = medicalRecordNumber; }

    public static PatientBuilder builder() {
        return new PatientBuilder();
    }

    public static class PatientBuilder {
        private Long id;
        private String name;
        private String contactNumber;
        private LocalDate dateOfBirth;
        private String medicalRecordNumber;

        public PatientBuilder id(Long id) { this.id = id; return this; }
        public PatientBuilder name(String name) { this.name = name; return this; }
        public PatientBuilder contactNumber(String contactNumber) { this.contactNumber = contactNumber; return this; }
        public PatientBuilder dateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; return this; }
        public PatientBuilder medicalRecordNumber(String medicalRecordNumber) { this.medicalRecordNumber = medicalRecordNumber; return this; }

        public Patient build() {
            Patient patient = new Patient();
            patient.id = this.id;
            patient.name = this.name;
            patient.contactNumber = this.contactNumber;
            patient.dateOfBirth = this.dateOfBirth;
            patient.medicalRecordNumber = this.medicalRecordNumber;
            return patient;
        }
    }
}
