package com.timefit.backend.domain.job;

public class DuplicateJobApplicationException extends RuntimeException {
    public DuplicateJobApplicationException(Long jobId, Long applicantId) {
        super("이미 해당 공고(" + jobId + ")에 지원한 사용자(" + applicantId + ")입니다.");
    }
}
