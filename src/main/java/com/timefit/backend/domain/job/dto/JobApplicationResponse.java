package com.timefit.backend.domain.job.dto;

import com.timefit.backend.domain.job.JobApplication;

import java.time.LocalDateTime;

public record JobApplicationResponse(
        Long applicationId,
        Long applicantId,
        String coverLetter,
        LocalDateTime createdAt
) {
    public static JobApplicationResponse from(JobApplication application) {
        return new JobApplicationResponse(
                application.getId(),
                application.getApplicantId(),
                application.getCoverLetter(),
                application.getCreatedAt()
        );
    }
}
