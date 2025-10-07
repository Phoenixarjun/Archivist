package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.UserDto;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.repository.UserRepository;
import com.example.assetmanagement.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;



    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.toEntity(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }
}
