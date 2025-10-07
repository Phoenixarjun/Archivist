package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.repository.AssetRepository;
import com.example.assetmanagement.util.AssetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;



    @Override
    public AssetDto createAsset(AssetDto assetDto) {
        Asset asset = AssetMapper.toEntity(assetDto);
        Asset savedAsset = assetRepository.save(asset);
        return AssetMapper.toDto(savedAsset);
    }

    @Override
    public AssetDto getAssetById(Long id) {
        Asset asset = assetRepository.findById(id).orElse(null);
        return AssetMapper.toDto(asset);
    }

    @Override
    public List<AssetDto> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(AssetMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AssetDto updateAsset(Long id, AssetDto assetDto) {
        Asset existingAsset = assetRepository.findById(id).orElse(null);
        if (existingAsset != null) {
            existingAsset.setAssetName(assetDto.getAssetName());
            existingAsset.setStatus(assetDto.getStatus());
            existingAsset.setQuantity(assetDto.getQuantity());
            Asset updatedAsset = assetRepository.save(existingAsset);
            return AssetMapper.toDto(updatedAsset);
        }
        return null;
    }

    @Override
    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}
