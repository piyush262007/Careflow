package com.careflow.auth.dto.response;

import com.careflow.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
    private String refreshToken;
    private Long userId;
    private String fullName;
    private String email;
    private Role role;
    private long expiresIn;
}
