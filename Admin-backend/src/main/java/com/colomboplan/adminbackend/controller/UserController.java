package com.colomboplan.adminbackend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.colomboplan.adminbackend.entity.User;
import com.colomboplan.adminbackend.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // App start wenakota admin user ekak nathnam auto hadanawa
    // (username / password Railway Variables walin enawa, code eke nehe)
    @PostConstruct
    public void createDefaultAdmin() {
        String adminUsername = System.getenv("ADMIN_USERNAME");
        String adminPassword = System.getenv("ADMIN_PASSWORD");

        if (adminUsername == null || adminUsername.isBlank()
                || adminPassword == null || adminPassword.isBlank()) {
            return;
        }

        boolean exists = userRepository.findAll().stream()
                .anyMatch(u -> adminUsername.equals(u.getUsername()));

        if (!exists) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@colomboplan.org");
            admin.setUsername(adminUsername);
            admin.setPassword(adminPassword);
            userRepository.save(admin);
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<User> foundUser = userRepository.findAll().stream()
                .filter(u -> u.getUsername() != null && u.getUsername().equals(username))
                .findFirst();

        if (foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }

        User user = foundUser.get();

        if (user.getPassword() == null || !user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "username", user.getUsername()
        ));
    }
}