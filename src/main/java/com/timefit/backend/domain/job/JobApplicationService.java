package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobApplicationRequest;
import com.timefit.backend.domain.job.dto.JobApplicationResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final EntityManager em;
    private final JobApplicationRepository jobApplicationRepository;

    @Transactional
    public Long applyToJob(Long jobId, JobApplicationRequest request) {
        Job job = em.find(Job.class, jobId);
        if (job == null) {
            throw new EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId);
        }
        if (job.getStatus() == JobStatus.CLOSED) {
            throw new ClosedJobApplicationNotAllowedException(jobId);
        }

        if (jobApplicationRepository.existsByJob_IdAndApplicantId(jobId, request.getApplicantId())) {
            throw new DuplicateJobApplicationException(jobId, request.getApplicantId());
        }

        JobApplication application = JobApplication.of(
                job,
                request.getApplicantId(),
                request.getCoverLetter()
        );

        JobApplication saved = jobApplicationRepository.save(application);
        return saved.getId();
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getApplications(Long jobId) {
        Job job = em.find(Job.class, jobId);
        if (job == null) {
            throw new EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId);
        }
        return jobApplicationRepository.findAllByJob_IdOrderByCreatedAtDesc(jobId)
                .stream()
                .map(JobApplicationResponse::from)
                .toList();
    }

    @Transactional
    public void approveApplication(Long jobId, Long applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("지원서를 찾을 수 없습니다. id=" + applicationId));

        // 다른 공고의 지원서 접근 방지
        if (!application.getJob().getId().equals(jobId)) {
            throw new EntityNotFoundException("지원서를 찾을 수 없습니다. id=" + applicationId);
        }

        // 마감된 공고는 처리 불가
        if (application.getJob().getStatus() == JobStatus.CLOSED) {
            throw new ClosedJobApplicationNotAllowedException(jobId);
        }

        // 도메인 규칙: PENDING만 승인 가능, 아니면 예외
        application.approve();
    }

    @Transactional
    public void rejectApplication(Long jobId, Long applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("지원서를 찾을 수 없습니다. id=" + applicationId));

        // 다른 공고의 지원서 접근 방지
        if (!application.getJob().getId().equals(jobId)) {
            throw new EntityNotFoundException("지원서를 찾을 수 없습니다. id=" + applicationId);
        }

        // 마감된 공고는 처리 불가
        if (application.getJob().getStatus() == JobStatus.CLOSED) {
            throw new ClosedJobApplicationNotAllowedException(jobId);
        }

        // 도메인 규칙: PENDING만 거절 가능, 아니면 예외
        application.reject();
    }
}
