package com.example.assetmanagement.util;

import com.example.assetmanagement.dto.UserDto;
import com.example.assetmanagement.entity.User;
import com.example.assetmanagement.entity.UserRole;

public class UserMapper {

    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setEmployeeId(user.getEmployeeId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        if (user.getRole() != null) {
            userDto.setRole(user.getRole().name());
        }

        return userDto;
    }

    public static User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setEmployeeId(userDto.getEmployeeId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        if (userDto.getRole() != null) {
            user.setRole(UserRole.valueOf(userDto.getRole()));
        }

        return user;
    }
}
