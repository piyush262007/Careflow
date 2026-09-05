package com.careflow.notification.mapper;

import com.careflow.notification.dto.NotificationDto;
import com.careflow.notification.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "userId", source = "user.id")
    NotificationDto toDto(Notification notification);
}
