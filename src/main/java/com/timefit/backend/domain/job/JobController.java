package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobCreateRequest;
import com.timefit.backend.domain.job.dto.JobCreateResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobCreateResponse> create(@RequestBody @Valid JobCreateRequest request) {
        JobCreateResponse response = jobService.createJob(request);
        return ResponseEntity
                .created(URI.create("/api/jobs/" + response.getId()))
                .body(response);
    }

    @org.springframework.web.bind.annotation.GetMapping
    public org.springframework.http.ResponseEntity<java.util.List<com.timefit.backend.domain.job.dto.JobSummaryResponse>> list() {
        java.util.List<com.timefit.backend.domain.job.dto.JobSummaryResponse> jobs = jobService.getJobs();
        return org.springframework.http.ResponseEntity.ok(jobs);
    }

    @org.springframework.web.bind.annotation.GetMapping("/{jobId}")
    public org.springframework.http.ResponseEntity<com.timefit.backend.domain.job.dto.JobResponse> getOne(@org.springframework.web.bind.annotation.PathVariable Long jobId) {
        com.timefit.backend.domain.job.dto.JobResponse job = jobService.getJob(jobId);
        return org.springframework.http.ResponseEntity.ok(job);
    }

    @org.springframework.web.bind.annotation.PatchMapping("/{jobId}/close")
    public org.springframework.http.ResponseEntity<Void> close(@org.springframework.web.bind.annotation.PathVariable Long jobId) {
        jobService.closeJob(jobId);
        return org.springframework.http.ResponseEntity.noContent().build(); // 204 No Content
    }
}
