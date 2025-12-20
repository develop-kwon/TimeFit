package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobApplicationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs/{jobId}/applications")
public class JobApplicationQueryController {

    private final JobApplicationService jobApplicationService;

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getApplications(@PathVariable Long jobId) {
        List<JobApplicationResponse> responses = jobApplicationService.getApplications(jobId);
        return ResponseEntity.ok(responses);
    }
}
