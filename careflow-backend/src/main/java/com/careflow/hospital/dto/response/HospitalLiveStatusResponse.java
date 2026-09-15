package com.careflow.hospital.dto.response;

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
public class HospitalLiveStatusResponse {

    private Long hospitalId;
    private String hospitalName;
    private Integer currentQueue;
    private Integer estimatedWaitMinutes;
    private Integer availableBeds;
    private Integer icuBedsAvailable;
    private String emergencyStatus;
    private LocalDateTime lastUpdated;
}
