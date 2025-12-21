package com.examly.springapp.repository;

import com.examly.springapp.entity.QueueEntry;
import com.examly.springapp.entity.QueueEntry.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {
    int countByDoctorId(Long doctorId);
    List<QueueEntry> findAllByOrderByPriorityAscJoinTimeAsc();
    List<QueueEntry> findByDoctorIdOrderByPriorityAscJoinTimeAsc(Long doctorId);
    List<QueueEntry> findByDoctorIdAndStatusInOrderByPriorityAscJoinTimeAsc(Long doctorId, List<Status> statuses);
}
