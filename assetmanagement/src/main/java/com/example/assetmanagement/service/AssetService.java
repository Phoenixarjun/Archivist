package com.example.assetmanagement.service;

import com.example.assetmanagement.entity.Asset;
import java.util.List;
import java.util.Optional;

public interface AssetService {
    Asset save(Asset asset);
    Optional<Asset> findById(Long id);
    List<Asset> findAll();
    List<Asset> findByStatus(String status);
    List<Asset> findByUserId(Long userId);
    Asset assignAsset(Long assetId, Long userId);
    void deleteById(Long id);
}