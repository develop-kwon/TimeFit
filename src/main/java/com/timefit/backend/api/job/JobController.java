package com.timefit.backend.api.job;

import com.timefit.backend.domain.job.JobCommandService;
import com.timefit.backend.domain.job.JobQueryService;
import com.timefit.backend.domain.job.dto.JobResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobQueryService jobQueryService;
    private final JobCommandService jobCommandService;

    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobs() {
        return ResponseEntity.ok(jobQueryService.getOpenJobs());
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobResponse> getJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobQueryService.getJob(jobId));
    }

    @PatchMapping("/{jobId}/close")
    public ResponseEntity<Void> closeJob(@PathVariable Long jobId) {
        jobCommandService.closeJob(jobId);
        return ResponseEntity.noContent().build();
    }
}
