package com.careflow.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HospitalResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private String phone;
    private String email;
    private String website;
    private Double rating;
    private Integer totalReviews;
    private Boolean emergencyAvailable;
    private Boolean isOpen24Hours;
    private String imageUrl;
    private Double distanceKm;
    private Integer currentQueueCount;
    private Integer estimatedWaitMinutes;
    private Integer availableDoctorsCount;
    private java.util.List<String> departments;
    private String hospitalStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
