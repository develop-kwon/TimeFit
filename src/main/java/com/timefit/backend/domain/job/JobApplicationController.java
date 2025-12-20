package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobApplicationRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs/{jobId}/applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<Void> apply(@PathVariable Long jobId, @RequestBody @Valid JobApplicationRequest request) {
        Long applicationId = jobApplicationService.applyToJob(jobId, request);
        return ResponseEntity
                .created(URI.create("/api/jobs/" + jobId + "/applications/" + applicationId))
                .build();
    }
}
