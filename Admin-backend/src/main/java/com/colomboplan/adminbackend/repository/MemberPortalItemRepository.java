package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.MemberPortalItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MemberPortalItemRepository extends JpaRepository<MemberPortalItem, Long> {
    List<MemberPortalItem> findAllByOrderBySortOrderAsc();
}