package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.NewsEvent;
import com.colomboplan.adminbackend.entity.ActivityLog;
import com.colomboplan.adminbackend.repository.NewsEventRepository;
import com.colomboplan.adminbackend.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news-events")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsEventController {

    @Autowired
    private NewsEventRepository newsEventRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    private void logActivity(String action, String title) {
        ActivityLog log = new ActivityLog();
        log.setAction(action);
        log.setEntityType("News & Events");
        log.setEntityTitle(title);
        log.setUser("Admin");
        log.setStatus("Completed");
        activityLogRepository.save(log);
    }

    @GetMapping
    public List<NewsEvent> getAll() {
        return newsEventRepository.findAll();
    }

    @PostMapping
    public NewsEvent create(@RequestBody NewsEvent newsEvent) {
        NewsEvent saved = newsEventRepository.save(newsEvent);
        logActivity("Created", saved.getTitle());
        return saved;
    }

    @PutMapping("/{id}")
    public NewsEvent update(@PathVariable Long id, @RequestBody NewsEvent updated) {
        updated.setId(id);
        NewsEvent saved = newsEventRepository.save(updated);
        logActivity("Updated", saved.getTitle());
        return saved;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        NewsEventRepository repo = newsEventRepository;
        String title = repo.findById(id).map(NewsEvent::getTitle).orElse("Unknown");
        repo.deleteById(id);
        logActivity("Deleted", title);
    }
}