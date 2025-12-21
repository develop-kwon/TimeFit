package com.timefit.backend.domain.job.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class JobCreateRequest {

    @NotBlank
    private String title;

    // 선택 입력: null 또는 공백 허용
    private String description;

    @NotNull
    @Positive
    private Integer hourlyWage;

    @NotNull
    private LocalDate workDate;
}
