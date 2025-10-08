package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.Login;
import com.example.assetmanagement.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicerequests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    @PostMapping
    public ResponseEntity<ServiceRequestDto> createServiceRequest(@RequestBody ServiceRequestDto serviceRequestDto, @AuthenticationPrincipal Login login) {
        ServiceRequestDto createdServiceRequest = serviceRequestService.createServiceRequest(serviceRequestDto, login.getUser());
        return new ResponseEntity<>(createdServiceRequest, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ServiceRequestDto>> getAllServiceRequests() {
        List<ServiceRequestDto> serviceRequests = serviceRequestService.getAllServiceRequests();
        return ResponseEntity.ok(serviceRequests);
    }

    @GetMapping("/myrequests")
    public ResponseEntity<List<ServiceRequestDto>> getMyServiceRequests(@AuthenticationPrincipal Login login) {
        List<ServiceRequestDto> requests = serviceRequestService.getMyServiceRequests(login.getUser());
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequestDto> getServiceRequestById(@PathVariable(name = "id") long id) {
        ServiceRequestDto serviceRequest = serviceRequestService.getServiceRequestById(id);
        return ResponseEntity.ok(serviceRequest);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceRequestDto> updateServiceRequestStatus(@PathVariable Long id, @RequestBody String status) {
        ServiceRequestDto updatedRequest = serviceRequestService.updateServiceRequestStatus(id, status);
        return ResponseEntity.ok(updatedRequest);
    }
}
