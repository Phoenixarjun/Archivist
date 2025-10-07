package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.service.ServiceRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;



    @PostMapping
    public ResponseEntity<ServiceRequestDto> createServiceRequest(@Valid @RequestBody ServiceRequestDto serviceRequestDto) {
        ServiceRequestDto createdServiceRequest = serviceRequestService.createServiceRequest(serviceRequestDto);
        return new ResponseEntity<>(createdServiceRequest, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequestDto> getServiceRequestById(@PathVariable Long id) {
        ServiceRequestDto serviceRequestDto = serviceRequestService.getServiceRequestById(id);
        return serviceRequestDto != null ? ResponseEntity.ok(serviceRequestDto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ServiceRequestDto>> getAllServiceRequests() {
        List<ServiceRequestDto> serviceRequests = serviceRequestService.getAllServiceRequests();
        return ResponseEntity.ok(serviceRequests);
    }
}
