package com.example.assetmanagement.mapper;

import com.example.assetmanagement.dto.RegisterRequestDto;
import com.example.assetmanagement.dto.UserDto;
import com.example.assetmanagement.dto.UserResponseDto;
import com.example.assetmanagement.entity.Login;
import com.example.assetmanagement.entity.User;

public class UserMapper {

    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setEmployeeId(user.getEmployeeId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRole());
        return userDto;
    }

    public static UserResponseDto toUserResponseDto(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setUserId(user.getUserId());
        userResponseDto.setEmployeeId(user.getEmployeeId());
        userResponseDto.setFirstName(user.getFirstName());
        userResponseDto.setLastName(user.getLastName());
        userResponseDto.setRole(user.getRole());
        if (user.getLogin() != null) {
            userResponseDto.setUsername(user.getLogin().getUsername());
            userResponseDto.setEmail(user.getLogin().getEmail());
        }
        return userResponseDto;
    }

    public static User fromRegisterRequestDto(RegisterRequestDto registerRequestDto) {
        User user = new User();
        user.setEmployeeId(registerRequestDto.getEmployeeId());
        user.setFirstName(registerRequestDto.getFirstName());
        user.setLastName(registerRequestDto.getLastName());
        user.setRole(registerRequestDto.getRole());

        Login login = new Login();
        login.setUsername(registerRequestDto.getUsername());
        login.setEmail(registerRequestDto.getEmail());
        login.setPassword(registerRequestDto.getPassword());
        user.setLogin(login);
        login.setUser(user);

        return user;
    }
}
