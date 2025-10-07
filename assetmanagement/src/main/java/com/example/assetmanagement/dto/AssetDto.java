package com.example.assetmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssetDto {

    private Long assetId;

    @NotBlank(message = "Asset name is mandatory")
    private String assetName;

    @NotBlank(message = "Status is mandatory")
    private String status;

    @NotNull(message = "Quantity is mandatory")
    private Integer quantity;

    private Long assignedToId;
}
