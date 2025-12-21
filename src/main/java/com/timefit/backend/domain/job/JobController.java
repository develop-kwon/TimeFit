package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobCreateRequest;
import com.timefit.backend.domain.job.dto.JobCreateResponse;
import com.timefit.backend.domain.job.dto.JobResponse;
import com.timefit.backend.domain.job.dto.JobSummaryResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final JobCommandService jobCommandService;

    @PostMapping
    public ResponseEntity<JobCreateResponse> create(@RequestBody @Valid JobCreateRequest request) {
        JobCreateResponse response = jobService.createJob(request);
        return ResponseEntity
                .created(URI.create("/api/jobs/" + response.getId()))
                .body(response);
    }

    @GetMapping
    public ResponseEntity<org.springframework.data.domain.Page<com.timefit.backend.domain.job.dto.JobSummaryResponse>> list(org.springframework.data.domain.Pageable pageable) {
        org.springframework.data.domain.Page<com.timefit.backend.domain.job.dto.JobSummaryResponse> page = jobService.getJobs(pageable);
        return org.springframework.http.ResponseEntity.ok(page);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobResponse> getOne(@PathVariable Long jobId) {
        com.timefit.backend.domain.job.dto.JobResponse job = jobService.getJob(jobId);
        return org.springframework.http.ResponseEntity.ok(job);
    }

    @PatchMapping("/{jobId}/close")
    public ResponseEntity<Void> close(@PathVariable Long jobId) {
        jobCommandService.closeJob(jobId);
        return org.springframework.http.ResponseEntity.noContent().build(); // 204 No Content
    }
}
