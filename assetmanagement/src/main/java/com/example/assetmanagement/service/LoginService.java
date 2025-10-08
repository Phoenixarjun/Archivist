package com.example.assetmanagement.service;

import com.example.assetmanagement.entity.Login;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface LoginService extends UserDetailsService {
    Login save(Login login);
}