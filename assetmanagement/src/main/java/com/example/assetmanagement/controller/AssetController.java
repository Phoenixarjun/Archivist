package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.Login;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.mapper.AssetMapper;
import com.example.assetmanagement.service.AssetService;
import com.example.assetmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<AssetDto> getAllAssets() {
        return assetService.findAll().stream()
                .map(AssetMapper::toAssetDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDto> getAssetById(@PathVariable(name = "id") long id) {
        Asset asset = assetService.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
        return ResponseEntity.ok(AssetMapper.toAssetDto(asset));
    }

    @GetMapping("/myassets")
    public ResponseEntity<List<AssetDto>> getMyAssets(@AuthenticationPrincipal Login login) {
        User currentUser = login.getUser();
        List<Asset> assets = assetService.findByUserId(currentUser.getUserId());
        List<AssetDto> assetDtos = assets.stream()
                .map(AssetMapper::toAssetDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(assetDtos);
    }

    @PutMapping("/{assetId}/assign/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AssetDto> assignAsset(@PathVariable Long assetId, @PathVariable Long userId) {
        Asset assignedAsset = assetService.assignAsset(assetId, userId);
        return ResponseEntity.ok(AssetMapper.toAssetDto(assignedAsset));
    }
}
