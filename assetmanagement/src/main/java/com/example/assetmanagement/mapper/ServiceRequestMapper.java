package com.example.assetmanagement.mapper;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.ServiceRequest;

public class ServiceRequestMapper {

    public static ServiceRequestDto toServiceRequestDto(ServiceRequest serviceRequest) {
        ServiceRequestDto dto = new ServiceRequestDto();
        dto.setRequestId(serviceRequest.getRequestId());
        dto.setDescription(serviceRequest.getDescription());
        dto.setStatus(serviceRequest.getStatus());
        dto.setCreatedAt(serviceRequest.getCreatedAt());
        dto.setUpdatedAt(serviceRequest.getUpdatedAt());
        if (serviceRequest.getAsset() != null) {
            dto.setAssetId(serviceRequest.getAsset().getAssetId());
        }
        if (serviceRequest.getRequestedBy() != null) {
            dto.setRequestedByUserId(serviceRequest.getRequestedBy().getUserId());
        }
        return dto;
    }

    public static ServiceRequest fromServiceRequestDto(ServiceRequestDto dto) {
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setRequestId(dto.getRequestId());
        serviceRequest.setDescription(dto.getDescription());
        serviceRequest.setStatus(dto.getStatus());
        // Note: The service layer will be responsible for setting the 'asset' and 'requestedBy' entities
        return serviceRequest;
    }
}
