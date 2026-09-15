package com.careflow.doctor.dto;

import jakarta.validation.constraints.NotBlank;
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
public class SpecializationDto {

    private Long id;

    @NotBlank(message = "Specialization name is required")
    private String name;

    private String description;
}
