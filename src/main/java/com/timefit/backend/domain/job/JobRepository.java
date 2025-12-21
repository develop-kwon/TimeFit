package com.timefit.backend.domain.job;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    java.util.List<Job> findAllByStatus(JobStatus status);
}
