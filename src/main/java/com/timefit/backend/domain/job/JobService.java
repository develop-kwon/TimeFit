package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobCreateRequest;
import com.timefit.backend.domain.job.dto.JobCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    @Transactional
    public JobCreateResponse createJob(JobCreateRequest request) {
        // description이 없거나 공백이면 기본 설명으로 대체
        String description = (request.getDescription() == null || request.getDescription().isBlank())
                ? "설명이 입력되지 않았습니다."
                : request.getDescription();

        Job job = Job.of(
                request.getTitle(),
                description,
                request.getHourlyWage(),
                request.getWorkDate(),
                JobStatus.OPEN // 기본값 OPEN
        );

        Job saved = jobRepository.save(job);
        return JobCreateResponse.from(saved);
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public java.util.List<com.timefit.backend.domain.job.dto.JobSummaryResponse> getJobs() {
        return jobRepository.findAll()
                .stream()
                .map(com.timefit.backend.domain.job.dto.JobSummaryResponse::from)
                .toList();
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public com.timefit.backend.domain.job.dto.JobResponse getJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId));
        return com.timefit.backend.domain.job.dto.JobResponse.from(job);
    }

    @org.springframework.transaction.annotation.Transactional
    public void closeJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId));
        job.close(); // 엔티티 메서드로 상태 변경 및 검증
        // JPA dirty checking에 의해 자동 반영됨
    }
}
