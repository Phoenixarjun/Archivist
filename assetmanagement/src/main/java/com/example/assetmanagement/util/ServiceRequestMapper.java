package com.example.assetmanagement.util;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.ServiceRequest;
import com.example.assetmanagement.entity.User;

public class ServiceRequestMapper {

    public static ServiceRequestDto toDto(ServiceRequest serviceRequest) {
        if (serviceRequest == null) {
            return null;
        }

        ServiceRequestDto dto = new ServiceRequestDto();
        dto.setId(serviceRequest.getId());
        dto.setStatus(serviceRequest.getStatus());
        dto.setRequestDate(serviceRequest.getRequestDate());

        if (serviceRequest.getUser() != null) {
            dto.setUserId(serviceRequest.getUser().getUserId());
        }

        if (serviceRequest.getAsset() != null) {
            dto.setAssetId(serviceRequest.getAsset().getAssetId());
        }

        return dto;
    }

    public static ServiceRequest toEntity(ServiceRequestDto dto) {
        if (dto == null) {
            return null;
        }

        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setId(dto.getId());
        serviceRequest.setStatus(dto.getStatus());
        serviceRequest.setRequestDate(dto.getRequestDate());

        if (dto.getUserId() != null) {
            User user = new User();
            user.setUserId(dto.getUserId());
            serviceRequest.setUser(user);
        }

        if (dto.getAssetId() != null) {
            Asset asset = new Asset();
            asset.setAssetId(dto.getAssetId());
            serviceRequest.setAsset(asset);
        }

        return serviceRequest;
    }
}
