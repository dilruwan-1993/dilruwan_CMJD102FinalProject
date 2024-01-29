package com.pos.main.controller;

import com.pos.main.dto.UserDTO;
import com.pos.main.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody UserDTO dto)throws Exception {
        return ResponseEntity.ok(service.login(dto));
    }
}
