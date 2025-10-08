package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.JwtAuthResponse;
import com.example.assetmanagement.dto.LoginRequest;
import com.example.assetmanagement.dto.RegisterRequestDto;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.mapper.UserMapper;
import com.example.assetmanagement.repository.LoginRepository;
import com.example.assetmanagement.service.UserService;
import com.example.assetmanagement.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        // Check if username already exists
        if (loginRepository.existsByUsername(registerRequestDto.getUsername())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        // Check if email already exists
        if (loginRepository.existsByEmail(registerRequestDto.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        User user = UserMapper.fromRegisterRequestDto(registerRequestDto);
        userService.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}
