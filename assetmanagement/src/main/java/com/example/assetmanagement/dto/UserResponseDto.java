package com.example.assetmanagement.dto;

import com.example.assetmanagement.entity.UserRole;
import lombok.Data;

@Data
public class UserResponseDto {
    private Long userId;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private UserRole role;
}
