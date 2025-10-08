package com.example.assetmanagement.dto;

import com.example.assetmanagement.entity.UserRole;
import lombok.Data;

@Data
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private UserRole role;
}
