package com.timefit.backend.domain.job.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobApplicationRequest {

    @NotBlank
    private String applicantId;

    private String coverLetter;
}
