package com.careflow.auth.service;

import com.careflow.auth.dto.request.LoginRequest;
import com.careflow.auth.dto.request.RefreshTokenRequest;
import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.LoginResponse;
import com.careflow.auth.dto.response.UserResponse;

public interface AuthenticationService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    LoginResponse refreshToken(RefreshTokenRequest request);

    UserResponse getCurrentUser(String email);

    void logout(String email);

    void resetPassword(String email);

    void verifyEmail(String token);
}
