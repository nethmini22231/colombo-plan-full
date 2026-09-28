package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.MemberPortalItem;
import com.colomboplan.adminbackend.repository.MemberPortalItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/member-portal")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberPortalController {

    @Autowired
    private MemberPortalItemRepository repository;

    @GetMapping
    public List<MemberPortalItem> getAll() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @PostMapping
    public MemberPortalItem create(@RequestBody MemberPortalItem item) {
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberPortalItem> update(@PathVariable Long id, @RequestBody MemberPortalItem details) {
        Optional<MemberPortalItem> optional = repository.findById(id);

        if (optional.isPresent()) {
            MemberPortalItem item = optional.get();
            item.setPageTag(details.getPageTag());
            item.setPageTitle(details.getPageTitle());
            item.setPageDescription(details.getPageDescription());
            item.setBadge(details.getBadge());
            item.setTitle(details.getTitle());
            item.setSlug(details.getSlug());
            item.setLinkUrl(details.getLinkUrl());
            item.setDescription(details.getDescription());
            item.setBulletPoints(details.getBulletPoints());
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