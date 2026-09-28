package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.PrivateSectorContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrivateSectorRepository extends JpaRepository<PrivateSectorContent, Long> {
    Optional<PrivateSectorContent> findBySlug(String slug);
}