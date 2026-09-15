package com.careflow.auth.mapper;

import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.UserResponse;
import com.careflow.auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "enabled", constant = "true")
    User toUserEntity(RegisterRequest registerRequest);

    UserResponse toUserResponse(User user);
}
