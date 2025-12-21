package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name must not be blank")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    private String name;

    @NotBlank(message = "Specialization must not be blank")
    @Size(min = 2, max = 100, message = "Specialization must be 2-100 characters")
    private String specialization;

    @NotNull(message = "Average consultation time is required")
    @Min(value = 1, message = "Consultation time must be > 0")
    private Integer averageConsultationTime;

    @JsonIgnore
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QueueEntry> queueEntries;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public Integer getAverageConsultationTime() { return averageConsultationTime; }
    public void setAverageConsultationTime(Integer averageConsultationTime) { this.averageConsultationTime = averageConsultationTime; }
    public List<QueueEntry> getQueueEntries() { return queueEntries; }
    public void setQueueEntries(List<QueueEntry> queueEntries) { this.queueEntries = queueEntries; }

    public static DoctorBuilder builder() {
        return new DoctorBuilder();
    }

    public static class DoctorBuilder {
        private Long id;
        private String name;
        private String specialization;
        private Integer averageConsultationTime;
        private List<QueueEntry> queueEntries;

        public DoctorBuilder id(Long id) { this.id = id; return this; }
        public DoctorBuilder name(String name) { this.name = name; return this; }
        public DoctorBuilder specialization(String specialization) { this.specialization = specialization; return this; }
        public DoctorBuilder averageConsultationTime(Integer averageConsultationTime) { this.averageConsultationTime = averageConsultationTime; return this; }
        public DoctorBuilder queueEntries(List<QueueEntry> queueEntries) { this.queueEntries = queueEntries; return this; }

        public Doctor build() {
            Doctor doctor = new Doctor();
            doctor.id = this.id;
            doctor.name = this.name;
            doctor.specialization = this.specialization;
            doctor.averageConsultationTime = this.averageConsultationTime;
            doctor.queueEntries = this.queueEntries;
            return doctor;
        }
    }
}
