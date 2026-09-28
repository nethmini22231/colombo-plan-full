package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
}