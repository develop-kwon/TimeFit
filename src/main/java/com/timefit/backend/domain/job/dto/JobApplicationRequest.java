package com.timefit.backend.domain.job.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobApplicationRequest {

    @NotNull
    private Long applicantId;

    private String coverLetter;
}
