package com.timefit.backend.domain.job;

public class ClosedJobApplicationNotAllowedException extends RuntimeException {
    public ClosedJobApplicationNotAllowedException(Long jobId) {
        super("해당 공고(" + jobId + ")는 CLOSED 상태이므로 지원할 수 없습니다.");
    }
}
