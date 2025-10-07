package com.example.assetmanagement.util;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.User;

public class AssetMapper {

    public static AssetDto toDto(Asset asset) {
        if (asset == null) {
            return null;
        }

        AssetDto assetDto = new AssetDto();
        assetDto.setAssetId(asset.getAssetId());
        assetDto.setAssetName(asset.getAssetName());
        assetDto.setStatus(asset.getStatus());
        assetDto.setQuantity(asset.getQuantity());
        if (asset.getAssignedTo() != null) {
            assetDto.setAssignedToId(asset.getAssignedTo().getUserId());
        }

        return assetDto;
    }

    public static Asset toEntity(AssetDto assetDto) {
        if (assetDto == null) {
            return null;
        }

        Asset asset = new Asset();
        asset.setAssetId(assetDto.getAssetId());
        asset.setAssetName(assetDto.getAssetName());
        asset.setStatus(assetDto.getStatus());
        asset.setQuantity(assetDto.getQuantity());

        if (assetDto.getAssignedToId() != null) {
            User user = new User();
            user.setUserId(assetDto.getAssignedToId());
            asset.setAssignedTo(user);
        }

        return asset;
    }
}
