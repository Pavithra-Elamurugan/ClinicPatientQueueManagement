package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "queue_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueueEntry {

    public enum Status {
        WAITING, IN_PROGRESS, COMPLETED, CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer queueNumber;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Patient patient;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Doctor doctor;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime joinTime;

    private Integer estimatedWaitTime;

    @NotNull
    @Min(1) @Max(5)
    private Integer priority;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getQueueNumber() { return queueNumber; }
    public void setQueueNumber(Integer queueNumber) { this.queueNumber = queueNumber; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getJoinTime() { return joinTime; }
    public void setJoinTime(LocalDateTime joinTime) { this.joinTime = joinTime; }
    public Integer getEstimatedWaitTime() { return estimatedWaitTime; }
    public void setEstimatedWaitTime(Integer estimatedWaitTime) { this.estimatedWaitTime = estimatedWaitTime; }
    public Integer getPriority() { return priority; }
    public void setPriority(Integer priority) { this.priority = priority; }

    public static QueueEntryBuilder builder() {
        return new QueueEntryBuilder();
    }

    public static class QueueEntryBuilder {
        private Long id;
        private Integer queueNumber;
        private Patient patient;
        private Doctor doctor;
        private Status status;
        private LocalDateTime joinTime;
        private Integer estimatedWaitTime;
        private Integer priority;

        public QueueEntryBuilder id(Long id) { this.id = id; return this; }
        public QueueEntryBuilder queueNumber(Integer queueNumber) { this.queueNumber = queueNumber; return this; }
        public QueueEntryBuilder patient(Patient patient) { this.patient = patient; return this; }
        public QueueEntryBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public QueueEntryBuilder status(Status status) { this.status = status; return this; }
        public QueueEntryBuilder joinTime(LocalDateTime joinTime) { this.joinTime = joinTime; return this; }
        public QueueEntryBuilder estimatedWaitTime(Integer estimatedWaitTime) { this.estimatedWaitTime = estimatedWaitTime; return this; }
        public QueueEntryBuilder priority(Integer priority) { this.priority = priority; return this; }

        public QueueEntry build() {
            QueueEntry entry = new QueueEntry();
            entry.id = this.id;
            entry.queueNumber = this.queueNumber;
            entry.patient = this.patient;
            entry.doctor = this.doctor;
            entry.status = this.status;
            entry.joinTime = this.joinTime;
            entry.estimatedWaitTime = this.estimatedWaitTime;
            entry.priority = this.priority;
            return entry;
        }
    }
}
