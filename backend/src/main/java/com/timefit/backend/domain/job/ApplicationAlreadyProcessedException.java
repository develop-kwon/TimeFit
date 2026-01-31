package com.timefit.backend.domain.job;

public class ApplicationAlreadyProcessedException extends RuntimeException {
    public ApplicationAlreadyProcessedException(Long applicationId) {
        super("이미 처리된 지원서입니다. id=" + applicationId);
    }
}
