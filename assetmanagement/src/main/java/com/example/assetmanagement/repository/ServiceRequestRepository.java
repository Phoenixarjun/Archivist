package com.example.assetmanagement.repository;

import com.example.assetmanagement.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest,Long> {
}
