package com.example.assetmanagement.repository;

import com.example.assetmanagement.entity.ServiceRequest;
import com.example.assetmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByStatus(String status);
    List<ServiceRequest> findByRequestedBy(User user);
}