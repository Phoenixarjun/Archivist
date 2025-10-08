package com.example.assetmanagement.service;

import com.example.assetmanagement.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User save(User user);
    Optional<User> findById(Long id);
    List<User> findAll();
}