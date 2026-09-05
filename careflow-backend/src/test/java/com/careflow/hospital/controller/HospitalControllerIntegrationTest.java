package com.careflow.hospital.controller;

import com.careflow.hospital.dto.HospitalResponse;
import com.careflow.hospital.service.HospitalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HospitalControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HospitalService hospitalService;

    @Test
    void getAllHospitals_ShouldReturn200AndHospitalList() throws Exception {
        HospitalResponse mockHospital = HospitalResponse.builder()
                .id(1L)
                .name("St. Jude Central Medical Center")
                .city("San Francisco")
                .rating(4.9)
                .emergencyAvailable(true)
                .build();

        when(hospitalService.getAllHospitals()).thenReturn(List.of(mockHospital));

        mockMvc.perform(get("/hospitals")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("St. Jude Central Medical Center"));
    }
}
