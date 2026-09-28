package com.colomboplan.adminbackend.controller;

import com.colomboplan.adminbackend.entity.Program;
import com.colomboplan.adminbackend.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgramController {

    @Autowired
    private ProgramRepository programRepository;

    @GetMapping
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @PostMapping
    public Program createProgram(@RequestBody Program program) {
        return programRepository.save(program);
    }

    @PutMapping("/{id}")
    public Program updateProgram(@PathVariable Long id, @RequestBody Program updated) {
        updated.setId(id);
        return programRepository.save(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteProgram(@PathVariable Long id) {
        programRepository.deleteById(id);
    }
}