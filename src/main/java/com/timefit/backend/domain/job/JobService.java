package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobCreateRequest;
import com.timefit.backend.domain.job.dto.JobCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.timefit.backend.domain.job.dto.JobSummaryResponse;
import com.timefit.backend.domain.job.dto.JobResponse;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    @Transactional
    public JobCreateResponse createJob(JobCreateRequest request) {
        Job job = Job.of(
                request.getTitle(),
                request.getDescription(),
                request.getHourlyWage(),
                request.getWorkDate(),
                JobStatus.OPEN // 기본값 OPEN
        );

        Job saved = jobRepository.save(job);
        return JobCreateResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<JobSummaryResponse> getJobs(Pageable pageable) {
        return jobRepository.findAll(pageable)
                .map(JobSummaryResponse::from);
    }

    @Transactional(readOnly = true)
    public JobResponse getJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId));
        return JobResponse.from(job);
    }

    @Transactional
    public void closeJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId));
        job.close(); // 엔티티 메서드로 상태 변경 및 검증
        // JPA dirty checking에 의해 자동 반영됨
    }
}
