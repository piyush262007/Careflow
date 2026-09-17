package com.careflow.auth.service.impl;

import com.careflow.auth.dto.request.LoginRequest;
import com.careflow.auth.dto.response.LoginResponse;
import com.careflow.auth.dto.request.RefreshTokenRequest;
import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.UserResponse;
import com.careflow.auth.entity.RefreshToken;
import com.careflow.auth.entity.Role;
import com.careflow.auth.entity.User;
import com.careflow.auth.jwt.JwtService;
import com.careflow.auth.mapper.AuthMapper;
import com.careflow.auth.repository.RefreshTokenRepository;
import com.careflow.auth.repository.UserRepository;
import com.careflow.auth.service.AuthenticationService;
import com.careflow.common.audit.AuditAction;
import com.careflow.common.email.EmailService;
import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;
import com.careflow.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;
    private final EmailService emailService;

    @Override
    @Transactional
    @AuditAction(action = "USER_REGISTER", details = "User registered a new account")
    public UserResponse register(RegisterRequest request) {
        if (request.getRole() == Role.ADMIN) {
            throw new BadRequestException("Public registration as ADMIN is not permitted");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address is already registered: " + request.getEmail());
        }

        User user = authMapper.toUserEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        // Asynchronous verification email
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getFullName(), UUID.randomUUID().toString());

        return authMapper.toUserResponse(savedUser);
    }

    @Override
    @Transactional
    @AuditAction(action = "USER_LOGIN", details = "User successfully logged in")
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = createRefreshToken(user);

        return LoginResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .expiresIn(jwtService.getJwtExpiration())
                .build();
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new CustomException("Invalid Refresh Token", ErrorCode.INVALID_CREDENTIALS));

        if (refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new CustomException("Refresh Token expired or revoked. Please login again.", ErrorCode.INVALID_CREDENTIALS);
        }

        User user = refreshToken.getUser();
        String newAccessToken = jwtService.generateToken(user);

        return LoginResponse.builder()
                .token(newAccessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .expiresIn(jwtService.getJwtExpiration())
                .build();
    }

    @Override
    @Transactional
    @AuditAction(action = "USER_LOGOUT", details = "User logged out and revoked refresh token")
    public void logout(String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return authMapper.toUserResponse(user);
    }

    @Override
    public void resetPassword(String email) {
        // Password reset placeholder implementation
    }

    @Override
    public void verifyEmail(String token) {
        // Email verification placeholder implementation
    }

    private RefreshToken createRefreshToken(User user) {
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(jwtService.getRefreshExpiration()))
                .revoked(false)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }
}
