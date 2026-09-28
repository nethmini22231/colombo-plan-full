package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.GovernmentInstitution;
import com.colomboplan.adminbackend.repository.GovernmentInstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/institutions")
@CrossOrigin(origins = "http://localhost:3000")
public class GovernmentInstitutionController {

    @Autowired
    private GovernmentInstitutionRepository institutionRepository;

    @GetMapping
    public List<GovernmentInstitution> getAllInstitutions() {
        return institutionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GovernmentInstitution> getInstitutionById(@PathVariable Long id) {
        Optional<GovernmentInstitution> institution = institutionRepository.findById(id);
        if (institution.isPresent()) {
            return ResponseEntity.ok(institution.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public GovernmentInstitution createInstitution(@RequestBody GovernmentInstitution institution) {
        return institutionRepository.save(institution);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GovernmentInstitution> updateInstitution(@PathVariable Long id, @RequestBody GovernmentInstitution institutionDetails) {
        Optional<GovernmentInstitution> optionalInstitution = institutionRepository.findById(id);

        if (optionalInstitution.isPresent()) {
            GovernmentInstitution institution = optionalInstitution.get();
            institution.setTitle(institutionDetails.getTitle());
            institution.setSlug(institutionDetails.getSlug());
            institution.setRegionTag(institutionDetails.getRegionTag());
            institution.setContactPerson(institutionDetails.getContactPerson());
            institution.setDescription(institutionDetails.getDescription());
            institution.setThumbnailUrl(institutionDetails.getThumbnailUrl());
            institution.setAttachmentUrl(institutionDetails.getAttachmentUrl());
            institution.setCardsJson(institutionDetails.getCardsJson());

            GovernmentInstitution updatedInstitution = institutionRepository.save(institution);
            return ResponseEntity.ok(updatedInstitution);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        if (institutionRepository.existsById(id)) {
            institutionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}