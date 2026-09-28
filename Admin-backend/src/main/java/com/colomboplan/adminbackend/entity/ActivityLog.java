package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;      // e.g. "Created", "Updated", "Deleted"
    private String entityType;  // e.g. "News", "Publication", "Programme"
    private String entityTitle; // e.g. "Annual Report 2026"
    private String user;        // e.g. "Admin"
    private String status;      // e.g. "Completed"
    private LocalDateTime timestamp = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public String getEntityTitle() { return entityTitle; }
    public void setEntityTitle(String entityTitle) { this.entityTitle = entityTitle; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}