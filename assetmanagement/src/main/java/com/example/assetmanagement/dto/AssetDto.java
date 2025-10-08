package com.example.assetmanagement.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AssetDto {
    private Long assetId;
    private String name;
    private String description;
    private String category;
    private LocalDate purchaseDate;
    private BigDecimal purchasePrice;
    private String status;
    private Long assignedToUserId;
}
