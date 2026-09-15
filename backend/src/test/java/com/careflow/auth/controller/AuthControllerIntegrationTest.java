package com.careflow.auth.controller;

import com.careflow.auth.dto.request.LoginRequest;
import com.careflow.auth.dto.request.RegisterRequest;
import com.careflow.auth.dto.response.LoginResponse;
import com.careflow.auth.entity.Role;
import com.careflow.auth.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthenticationService authenticationService;

    @Test
    void login_ShouldReturn200AndAccessToken() throws Exception {
        LoginRequest loginRequest = LoginRequest.builder()
                .email("admin@careflow.com")
                .password("password")
                .build();

        LoginResponse loginResponse = LoginResponse.builder()
                .token("mock_access_token")
                .refreshToken("mock_refresh_token")
                .tokenType("Bearer")
                .expiresIn(86400000L)
                .build();

        when(authenticationService.login(any())).thenReturn(loginResponse);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mock_access_token"));
    }
}
