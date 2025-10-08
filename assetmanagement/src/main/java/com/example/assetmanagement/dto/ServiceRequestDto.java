package com.example.assetmanagement.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ServiceRequestDto {
    private Long requestId;
    private Long assetId;
    private Long requestedByUserId;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
