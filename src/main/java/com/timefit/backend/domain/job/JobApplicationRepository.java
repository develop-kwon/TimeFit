package com.timefit.backend.domain.job;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<com.timefit.backend.domain.job.JobApplication, Long> {

    List<com.timefit.backend.domain.job.JobApplication> findAllByJob_IdOrderByCreatedAtDesc(Long jobId);
}
