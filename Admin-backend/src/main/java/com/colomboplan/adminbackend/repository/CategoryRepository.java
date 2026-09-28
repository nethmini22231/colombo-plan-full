package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}