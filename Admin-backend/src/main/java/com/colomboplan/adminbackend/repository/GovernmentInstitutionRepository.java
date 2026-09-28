package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.GovernmentInstitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovernmentInstitutionRepository extends JpaRepository<GovernmentInstitution, Long> {

    GovernmentInstitution findBySlug(String slug);
}