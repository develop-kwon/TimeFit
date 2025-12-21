package com.timefit.backend.domain.job;

public class JobAlreadyClosedException extends RuntimeException {
    public JobAlreadyClosedException(Long jobId) {
        super("이미 마감된 채용공고입니다. id=" + jobId);
    }
}
