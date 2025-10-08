package com.example.assetmanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtAuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private String role;

    public JwtAuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public JwtAuthResponse(String token) {
        this.token = token;
    }
}
