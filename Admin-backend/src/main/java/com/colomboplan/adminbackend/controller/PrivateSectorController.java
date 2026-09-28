package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.PrivateSectorContent;
import com.colomboplan.adminbackend.repository.PrivateSectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/private-sector")
@CrossOrigin(origins = "http://localhost:3000")
public class PrivateSectorController {

    @Autowired
    private PrivateSectorRepository repository;

    @GetMapping
    public List<PrivateSectorContent> getAll() {
        return repository.findAll();
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PrivateSectorContent> getBySlug(@PathVariable String slug) {
        Optional<PrivateSectorContent> content = repository.findBySlug(slug);
        return content.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public PrivateSectorContent create(@RequestBody PrivateSectorContent content) {
        return repository.save(content);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrivateSectorContent> update(@PathVariable Long id, @RequestBody PrivateSectorContent details) {
        Optional<PrivateSectorContent> optional = repository.findById(id);

        if (optional.isPresent()) {
            PrivateSectorContent item = optional.get();
            item.setTitle(details.getTitle());
            item.setSlug(details.getSlug());
            item.setRegionTag(details.getRegionTag());
            item.setFocalPoint(details.getFocalPoint());
            item.setDescription(details.getDescription());
            item.setWhatWeOffer(details.getWhatWeOffer());
            item.setCsrPartnerships(details.getCsrPartnerships());
            item.setThumbnailUrl(details.getThumbnailUrl());

            PrivateSectorContent updated = repository.save(item);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}