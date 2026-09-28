package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.NewsEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsEventRepository extends JpaRepository<NewsEvent, Long> {
}