package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}