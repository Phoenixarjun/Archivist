package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private  AssetService assetService;


    @PostMapping
    public ResponseEntity<AssetDto> createAsset(@Valid @RequestBody AssetDto assetDto) {
        AssetDto createdAsset = assetService.createAsset(assetDto);
        return new ResponseEntity<>(createdAsset, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDto> getAssetById(@PathVariable Long id) {
        AssetDto assetDto = assetService.getAssetById(id);
        return assetDto != null ? ResponseEntity.ok(assetDto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<AssetDto>> getAllAssets() {
        List<AssetDto> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetDto> updateAsset(@PathVariable Long id, @Valid @RequestBody AssetDto assetDto) {
        AssetDto updatedAsset = assetService.updateAsset(id, assetDto);
        return updatedAsset != null ? ResponseEntity.ok(updatedAsset) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
}
