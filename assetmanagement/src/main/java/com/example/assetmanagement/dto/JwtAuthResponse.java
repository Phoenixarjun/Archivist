package com.example.assetmanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtAuthResponse {
    private String token;
    private String tokenType = "Bearer";

    public JwtAuthResponse(String token) {
        this.token = token;
    }
}
