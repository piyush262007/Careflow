package com.careflow.auth.dto.response;

import com.careflow.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {

    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
