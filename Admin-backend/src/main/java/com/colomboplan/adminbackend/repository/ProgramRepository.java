package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {
}