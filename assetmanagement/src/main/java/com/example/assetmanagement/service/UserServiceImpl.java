package com.example.assetmanagement.service;

import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User save(User user) {
        if (user.getLogin() != null && user.getLogin().getPassword() != null) {
            user.getLogin().setPassword(passwordEncoder.encode(user.getLogin().getPassword()));
            user.getLogin().setUser(user); // Ensure bidirectional relationship is set
        }
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}