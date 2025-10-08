package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.AssetDto;
import com.example.assetmanagement.dto.UserResponseDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.mapper.AssetMapper;
import com.example.assetmanagement.mapper.UserMapper;
import com.example.assetmanagement.service.AssetService;
import com.example.assetmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AssetService assetService;

    // --- User Management Endpoints ---

    @GetMapping("/users")
    public List<UserResponseDto> getAllUsers() {
        return userService.findAll().stream()
                .map(UserMapper::toUserResponseDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable(name = "id") long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return ResponseEntity.ok(UserMapper.toUserResponseDto(user));
    }

    // --- Asset Management Endpoints ---

    @PostMapping("/assets")
    public ResponseEntity<AssetDto> createAsset(@RequestBody AssetDto assetDto) {
        Asset asset = AssetMapper.fromAssetDto(assetDto);
        Asset newAsset = assetService.save(asset);
        return new ResponseEntity<>(AssetMapper.toAssetDto(newAsset), HttpStatus.CREATED);
    }

    @GetMapping("/assets")
    public List<AssetDto> getAllAssets() {
        return assetService.findAll().stream()
                .map(AssetMapper::toAssetDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/assets/{id}")
    public ResponseEntity<AssetDto> getAssetById(@PathVariable(name = "id") long id) {
        Asset asset = assetService.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
        return ResponseEntity.ok(AssetMapper.toAssetDto(asset));
    }

    @PutMapping("/assets/{id}")
    public ResponseEntity<AssetDto> updateAsset(@PathVariable(name = "id") long id, @RequestBody AssetDto assetDto) {
        Asset existingAsset = assetService.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));

        existingAsset.setName(assetDto.getName());
        existingAsset.setDescription(assetDto.getDescription());
        existingAsset.setCategory(assetDto.getCategory());
        existingAsset.setStatus(assetDto.getStatus());

        Asset updatedAsset = assetService.save(existingAsset);
        return ResponseEntity.ok(AssetMapper.toAssetDto(updatedAsset));
    }

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<String> deleteAsset(@PathVariable(name = "id") long id) {
        // First, ensure the asset exists before attempting to delete
        assetService.findById(id).orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
        
        assetService.deleteById(id); 
        
        return ResponseEntity.ok("Asset deleted successfully.");
    }
}
