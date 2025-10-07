package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.ServiceRequestDto;
import com.example.assetmanagement.entity.ServiceRequest;
import com.example.assetmanagement.repository.ServiceRequestRepository;
import com.example.assetmanagement.util.ServiceRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;



    @Override
    public ServiceRequestDto createServiceRequest(ServiceRequestDto serviceRequestDto) {
        ServiceRequest serviceRequest = ServiceRequestMapper.toEntity(serviceRequestDto);
        ServiceRequest savedServiceRequest = serviceRequestRepository.save(serviceRequest);
        return ServiceRequestMapper.toDto(savedServiceRequest);
    }

    @Override
    public ServiceRequestDto getServiceRequestById(Long id) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(id).orElse(null);
        return ServiceRequestMapper.toDto(serviceRequest);
    }

    @Override
    public List<ServiceRequestDto> getAllServiceRequests() {
        return serviceRequestRepository.findAll().stream()
                .map(ServiceRequestMapper::toDto)
                .collect(Collectors.toList());
    }
}
