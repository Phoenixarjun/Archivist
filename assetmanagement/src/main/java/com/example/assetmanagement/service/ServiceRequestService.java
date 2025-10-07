package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.ServiceRequestDto;

import java.util.List;

public interface ServiceRequestService {

    ServiceRequestDto createServiceRequest(ServiceRequestDto serviceRequestDto);

    ServiceRequestDto getServiceRequestById(Long id);

    List<ServiceRequestDto> getAllServiceRequests();
}
