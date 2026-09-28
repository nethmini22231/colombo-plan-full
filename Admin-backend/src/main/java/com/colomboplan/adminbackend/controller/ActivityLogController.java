package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.ActivityLog;
import com.colomboplan.adminbackend.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityLogController {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @GetMapping
    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAll().stream()
                .sorted(Comparator.comparing(ActivityLog::getTimestamp).reversed())
                .collect(Collectors.toList());
    }
}