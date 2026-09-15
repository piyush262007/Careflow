package com.careflow.auth.mapper;

import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.UserResponse;
import com.careflow.auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "enabled", constant = "true")
    User toUserEntity(RegisterRequest registerRequest);

    UserResponse toUserResponse(User user);
}
