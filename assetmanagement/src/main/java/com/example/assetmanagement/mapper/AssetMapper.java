package com.example.assetmanagement.mapper;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.entity.Asset;

public class AssetMapper {

    public static AssetDto toAssetDto(Asset asset) {
        AssetDto assetDto = new AssetDto();
        assetDto.setAssetId(asset.getAssetId());
        assetDto.setName(asset.getName());
        assetDto.setDescription(asset.getDescription());
        assetDto.setCategory(asset.getCategory());
        assetDto.setStatus(asset.getStatus());
        if (asset.getAssignedTo() != null) {
            assetDto.setAssignedToUserId(asset.getAssignedTo().getUserId());
        }
        return assetDto;
    }

    public static Asset fromAssetDto(AssetDto assetDto) {
        Asset asset = new Asset();
        asset.setAssetId(assetDto.getAssetId());
        asset.setName(assetDto.getName());
        asset.setDescription(assetDto.getDescription());
        asset.setCategory(assetDto.getCategory());
        asset.setStatus(assetDto.getStatus());
        return asset;
    }
}
