package com.colomboplan.adminbackend.repository;

import com.colomboplan.adminbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}