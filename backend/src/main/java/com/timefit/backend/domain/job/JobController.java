package com.timefit.backend.domain.job;

import com.timefit.backend.domain.job.dto.JobCreateRequest;
import com.timefit.backend.domain.job.dto.JobCreateResponse;
import com.timefit.backend.domain.job.dto.JobResponse;
import com.timefit.backend.domain.job.dto.JobSummaryResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "Job", description = "채용 공고 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final JobCommandService jobCommandService;

    @Operation(
            summary = "채용 공고 생성",
            description = """
                    새로운 채용 공고를 생성합니다.
                    - JWT 인증 필요
                    - RECRUITER 권한만 가능
                    """
    )
    @ApiResponse(responseCode = "201", description = "공고 생성 성공")
    @ApiResponse(responseCode = "403", description = "RECRUITER 권한 아님")
    @PostMapping
    public ResponseEntity<JobCreateResponse> create(
            @RequestBody @Valid JobCreateRequest request
    ) {
        JobCreateResponse response = jobService.createJob(request);
        return ResponseEntity
                .created(URI.create("/api/jobs/" + response.getId()))
                .body(response);
    }

    @Operation(
            summary = "채용 공고 목록 조회",
            description = """
                    채용 공고 목록을 페이지 단위로 조회합니다.
                    - JWT 인증 필요
                    - 기본적으로 OPEN 상태의 공고만 조회됩니다.
                    """
    )
    @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping
    public ResponseEntity<Page<JobSummaryResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(jobService.getJobs(pageable));
    }

    @Operation(
            summary = "채용 공고 단건 조회",
            description = """
                    채용 공고 상세 정보를 조회합니다.
                    - JWT 인증 필요
                    """
    )
    @ApiResponse(responseCode = "200", description = "조회 성공")
    @ApiResponse(responseCode = "404", description = "공고 없음")
    @GetMapping("/{jobId}")
    public ResponseEntity<JobResponse> getOne(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobService.getJob(jobId));
    }

    @Operation(
            summary = "채용 공고 마감",
            description = """
                    채용 공고를 마감 처리합니다.
                    - JWT 인증 필요
                    - RECRUITER 권한
                    - 해당 공고의 recruiter만 가능
                    - 이미 마감된 공고는 처리 불가
                    """
    )
    @ApiResponse(responseCode = "204", description = "마감 성공")
    @ApiResponse(responseCode = "403", description = "권한 또는 소유자 아님")
    @ApiResponse(responseCode = "409", description = "이미 마감된 공고")
    @PatchMapping("/{jobId}/close")
    public ResponseEntity<Void> close(@PathVariable Long jobId) {
        jobCommandService.closeJob(jobId);
        return ResponseEntity.noContent().build();
    }
}
