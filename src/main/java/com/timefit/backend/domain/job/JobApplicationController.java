package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobApplicationRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "JobApplication", description = "채용 지원 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs/{jobId}/applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @Operation(
            summary = "채용 공고 지원",
            description = """
                    채용 공고에 지원합니다.
                    - JWT 인증 필요
                    - 동일 공고에 중복 지원 불가
                    - 마감된 공고에는 지원 불가
                    """
    )
    @ApiResponse(responseCode = "201", description = "지원 성공")
    @ApiResponse(responseCode = "409", description = "중복 지원 또는 마감 공고")
    @PostMapping
    public ResponseEntity<Void> apply(
            @PathVariable Long jobId,
            @RequestBody @Valid JobApplicationRequest request
    ) {
        Long applicationId = jobApplicationService.applyToJob(jobId, request);
        return ResponseEntity
                .created(URI.create("/api/jobs/" + jobId + "/applications/" + applicationId))
                .build();
    }

    @Operation(
            summary = "지원 승인",
            description = """
                    채용 지원을 승인합니다.
                    - JWT 인증 필요
                    - RECRUITER 권한
                    - 해당 공고의 recruiter만 가능
                    - 이미 처리된 지원서는 재처리 불가
                    """
    )
    @ApiResponse(responseCode = "204", description = "승인 성공")
    @ApiResponse(responseCode = "403", description = "권한 또는 소유자 아님")
    @ApiResponse(responseCode = "409", description = "이미 처리된 지원서")
    @PatchMapping("/{applicationId}/approve")
    public ResponseEntity<Void> approve(
            @PathVariable Long jobId,
            @PathVariable Long applicationId
    ) {
        jobApplicationService.approveApplication(jobId, applicationId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "지원 거절",
            description = """
                    채용 지원을 거절합니다.
                    - JWT 인증 필요
                    - RECRUITER 권한
                    - 해당 공고의 recruiter만 가능
                    - 이미 처리된 지원서는 재처리 불가
                    """
    )
    @ApiResponse(responseCode = "204", description = "거절 성공")
    @ApiResponse(responseCode = "403", description = "권한 또는 소유자 아님")
    @ApiResponse(responseCode = "409", description = "이미 처리된 지원서")
    @PatchMapping("/{applicationId}/reject")
    public ResponseEntity<Void> reject(
            @PathVariable Long jobId,
            @PathVariable Long applicationId
    ) {
        jobApplicationService.rejectApplication(jobId, applicationId);
        return ResponseEntity.noContent().build();
    }
}
