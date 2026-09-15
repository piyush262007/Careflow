package com.careflow.auth.service;

import com.careflow.auth.dto.LoginRequest;
import com.careflow.auth.dto.LoginResponse;
import com.careflow.auth.dto.RegisterRequest;
import com.careflow.auth.entity.Role;
import com.careflow.auth.entity.User;
import com.careflow.auth.jwt.JwtService;
import com.careflow.auth.mapper.AuthMapper;
import com.careflow.auth.repository.RefreshTokenRepository;
import com.careflow.auth.repository.UserRepository;
import com.careflow.auth.service.impl.AuthenticationServiceImpl;
import com.careflow.common.exception.BadRequestException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private AuthMapper authMapper;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .fullName("John Doe")
                .email("john@example.com")
                .password("Password123!")
                .role(Role.PATIENT)
                .build();

        loginRequest = LoginRequest.builder()
                .email("john@example.com")
                .password("Password123!")
                .build();

        testUser = User.builder()
                .id(1L)
                .fullName("John Doe")
                .email("john@example.com")
                .password("encoded_pass")
                .role(Role.PATIENT)
                .enabled(true)
                .build();
    }

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        assertThrows(BadRequestException.class, () -> authenticationService.register(registerRequest));
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_ShouldReturnLoginResponse_WhenCredentialsAreValid() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser)).thenReturn("mock_jwt_token");
        when(jwtService.generateRefreshToken(testUser)).thenReturn("mock_refresh_token");

        LoginResponse response = authenticationService.login(loginRequest);

        assertNotNull(response);
        assertEquals("mock_jwt_token", response.getAccessToken());
        assertEquals("mock_refresh_token", response.getRefreshToken());
        verify(authenticationManager).authenticate(any());
    }
}
