package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.IndividualsItem;
import com.colomboplan.adminbackend.repository.IndividualsItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/individuals")
@CrossOrigin(origins = "http://localhost:3000")
public class IndividualsController {

    @Autowired
    private IndividualsItemRepository repository;

    @GetMapping
    public List<IndividualsItem> getAll() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @PostMapping
    public IndividualsItem create(@RequestBody IndividualsItem item) {
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IndividualsItem> update(@PathVariable Long id, @RequestBody IndividualsItem details) {
        Optional<IndividualsItem> optional = repository.findById(id);

        if (optional.isPresent()) {
            IndividualsItem item = optional.get();
            item.setSectionTitle(details.getSectionTitle());
            item.setSectionSubtitle(details.getSectionSubtitle());
            item.setBadge(details.getBadge());
            item.setTitle(details.getTitle());
            item.setSlug(details.getSlug());
            item.setLinkUrl(details.getLinkUrl());
            item.setDescription(details.getDescription());
            item.setThumbnailUrl(details.getThumbnailUrl());
            item.setSortOrder(details.getSortOrder());

            return ResponseEntity.ok(repository.save(item));
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