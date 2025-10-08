package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.entity.ServiceRequest;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.repository.AssetRepository;
import com.example.assetmanagement.repository.ServiceRequestRepository;
import com.example.assetmanagement.mapper.ServiceRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Override
    public ServiceRequestDto createServiceRequest(ServiceRequestDto serviceRequestDto, User user) {
        Asset asset = assetRepository.findById(serviceRequestDto.getAssetId())
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        ServiceRequest serviceRequest = ServiceRequestMapper.fromServiceRequestDto(serviceRequestDto);
        serviceRequest.setAsset(asset);
        serviceRequest.setRequestedBy(user);
        if (serviceRequest.getStatus() == null) {
            serviceRequest.setStatus("OPEN");
        }

        ServiceRequest savedServiceRequest = serviceRequestRepository.save(serviceRequest);
        return ServiceRequestMapper.toServiceRequestDto(savedServiceRequest);
    }

    @Override
    public ServiceRequestDto getServiceRequestById(Long id) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service Request not found"));
        return ServiceRequestMapper.toServiceRequestDto(serviceRequest);
    }

    @Override
    public List<ServiceRequestDto> getAllServiceRequests() {
        return serviceRequestRepository.findAll().stream()
                .map(ServiceRequestMapper::toServiceRequestDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceRequestDto> getMyServiceRequests(User user) {
        return serviceRequestRepository.findByRequestedBy(user).stream()
                .map(ServiceRequestMapper::toServiceRequestDto)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceRequestDto updateServiceRequestStatus(Long id, String status) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service Request not found"));
        serviceRequest.setStatus(status);
        ServiceRequest updatedServiceRequest = serviceRequestRepository.save(serviceRequest);
        return ServiceRequestMapper.toServiceRequestDto(updatedServiceRequest);
    }
}
