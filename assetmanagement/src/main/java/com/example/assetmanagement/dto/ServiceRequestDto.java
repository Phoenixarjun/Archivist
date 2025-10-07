package com.example.assetmanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestDto {

    private Long id;

    @NotNull(message = "User ID is mandatory")
    private Long userId;

    @NotNull(message = "Asset ID is mandatory")
    private Long assetId;

    private String status;

    private LocalDateTime requestDate;
}
