package com.timefit.backend.domain.job;

import com.timefit.backend.security.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class JobCommandService {

    private final JobRepository jobRepository;

    @PreAuthorize("hasRole('RECRUITER')")
    @Transactional
    public void closeJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("채용 공고를 찾을 수 없습니다. id=" + jobId));

        Long currentUserId = SecurityUtil.getCurrentUserId();
        Long recruiterId = job.getRecruiter() != null ? job.getRecruiter().getId() : null;

        if (!Objects.equals(recruiterId, currentUserId)) {
            throw new AccessDeniedException("본인이 등록한 공고만 마감할 수 있습니다.");
        }

        if (job.getStatus() == JobStatus.CLOSED) {
            throw new JobAlreadyClosedException(jobId);
        }

        job.close(); // 상태 변경
        jobRepository.save(job);
    }
}
