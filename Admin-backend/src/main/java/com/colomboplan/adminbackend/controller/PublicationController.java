package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.Publication;
import com.colomboplan.adminbackend.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicationController {

    @Autowired
    private PublicationRepository publicationRepository;

    @GetMapping
    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    @PostMapping
    public Publication createPublication(@RequestBody Publication publication) {
        return publicationRepository.save(publication);
    }

    @PutMapping("/{id}")
    public Publication updatePublication(@PathVariable Long id, @RequestBody Publication updated) {
        updated.setId(id);
        return publicationRepository.save(updated);
    }

    @DeleteMapping("/{id}")
    public void deletePublication(@PathVariable Long id) {
        publicationRepository.deleteById(id);
    }
}