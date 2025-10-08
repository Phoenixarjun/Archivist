package com.example.assetmanagement.repository;

import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByStatus(String status);
    List<Asset> findByAssignedTo(User user);
}