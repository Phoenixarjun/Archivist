package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.User;

import java.util.List;

public interface ServiceRequestService {

    ServiceRequestDto createServiceRequest(ServiceRequestDto serviceRequestDto, User user);

    ServiceRequestDto getServiceRequestById(Long id);

    List<ServiceRequestDto> getAllServiceRequests();

    List<ServiceRequestDto> getMyServiceRequests(User user);

    ServiceRequestDto updateServiceRequestStatus(Long id, String status);
}
