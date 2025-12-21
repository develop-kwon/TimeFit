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
    private final com.timefit.backend.domain.user.UserRepository userRepository;

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('RECRUITER')")
    @Transactional
    public JobCreateResponse createJob(JobCreateRequest request) {
        Long currentUserId = com.timefit.backend.security.SecurityUtil.getCurrentUserId();
        com.timefit.backend.domain.user.User recruiter = userRepository.findById(currentUserId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("사용자를 찾을 수 없습니다. id=" + currentUserId));

        Job job = Job.of(
                request.getTitle(),
                request.getDescription(),
                request.getHourlyWage(),
                request.getWorkDate(),
                JobStatus.OPEN,
                recruiter
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
}
