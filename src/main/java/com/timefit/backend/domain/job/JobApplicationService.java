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

        JobApplication application = JobApplication.builder()
                .job(job)
                .applicantId(Long.valueOf(request.getApplicantId()))
                .coverLetter(request.getCoverLetter())
                .build();

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
}
