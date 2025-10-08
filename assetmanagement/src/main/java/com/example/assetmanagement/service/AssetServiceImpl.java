package com.example.assetmanagement.service;

import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.repository.AssetRepository;
import com.example.assetmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private UserRepository userRepository;



    @Override
    public Asset save(Asset asset) {
        return assetRepository.save(asset);
    }

    @Override
    public Optional<Asset> findById(Long id) {
        return assetRepository.findById(id);
    }

    @Override
    public List<Asset> findAll() {
        return assetRepository.findAll();
    }

    @Override
    public List<Asset> findByStatus(String status) {
        return assetRepository.findByStatus(status);
    }

    @Override
    public List<Asset> findByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return assetRepository.findByAssignedTo(user);
    }

    @Override
    public Asset assignAsset(Long assetId, Long userId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + assetId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        asset.setAssignedTo(user);
        return assetRepository.save(asset);
    }

    @Override
    public void deleteById(Long id) {
        assetRepository.deleteById(id);
    }
}
