package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.IndividualsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IndividualsItemRepository extends JpaRepository<IndividualsItem, Long> {
    List<IndividualsItem> findAllByOrderBySortOrderAsc();
}