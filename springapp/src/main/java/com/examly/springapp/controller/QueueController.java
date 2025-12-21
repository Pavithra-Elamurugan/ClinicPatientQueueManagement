package com.examly.springapp.controller;

import com.examly.springapp.entity.QueueEntry;
import com.examly.springapp.exception.BadRequestException;
import com.examly.springapp.service.QueueEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    private final QueueEntryService queueService;

    public QueueController(QueueEntryService queueService) {
        this.queueService = queueService;
    }

    @PostMapping
    public ResponseEntity<QueueEntry> add(@RequestBody Map<String, Object> req) {
        try {
            Long patientId = req.get("patientId") == null ? null : Long.valueOf(req.get("patientId").toString());
            Long doctorId  = req.get("doctorId")  == null ? null : Long.valueOf(req.get("doctorId").toString());
            Integer priority = req.get("priority") == null ? null : Integer.valueOf(req.get("priority").toString());
            QueueEntry saved = queueService.addToQueue(patientId, doctorId, priority);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid input");
        }
    }

    @GetMapping
    public ResponseEntity<List<QueueEntry>> getQueue() {
        return ResponseEntity.ok(queueService.getCurrentQueue());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<QueueEntry> updateStatus(@PathVariable Long id,
                                                   @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isBlank())
            throw new BadRequestException("Invalid status");
        return ResponseEntity.ok(queueService.updateStatus(id, status));
    }
}
