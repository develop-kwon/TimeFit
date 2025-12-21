package com.timefit.backend.docs;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 문서 예시용 컨트롤러입니다.
 * - Swagger 문서에는 노출되지 않도록 @Hidden 처리했습니다.
 * - 실제 컨트롤러에는 동일한 형태의 @Tag, @Operation, @ApiResponse, @SecurityRequirement를 적용하세요.
 */
@Hidden
@RestController
@RequestMapping("/_docs/examples")
public class ControllerDocExamples {

    @Tag(name = "Auth", description = "인증 관련 API")
    @Operation(
            summary = "로그인",
            description = "사용자 로그인 API (JWT 발급). JWT 인증 불필요.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공"),
                    @ApiResponse(responseCode = "401", description = "인증 실패",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(ref = "#/components/schemas/ErrorResponse")))
            }
    )
    @PostMapping("/auth/login")
    public ResponseEntity<Void> loginExample() {
        return ResponseEntity.ok().build();
    }

    @Tag(name = "Job", description = "채용 공고 API")
    @Operation(
            summary = "채용 공고 등록 (RECRUITER only)",
            description = "JWT 인증 필요. RECRUITER 권한 사용자만 접근 가능.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "201", description = "생성됨"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(ref = "#/components/schemas/ErrorResponse"))),
                    @ApiResponse(responseCode = "401", description = "미인증",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(ref = "#/components/schemas/ErrorResponse"))),
                    @ApiResponse(responseCode = "403", description = "권한 부족",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(ref = "#/components/schemas/ErrorResponse")))
            }
    )
    @PostMapping("/jobs")
    public ResponseEntity<Void> createJobExample() {
        return ResponseEntity.status(201).build();
    }

    @Tag(name = "JobApplication", description = "공고 지원 API")
    @Operation(
                summary = "지원 승인 (RECRUITER only)",
                description = "JWT 인증 필요. RECRUITER 권한 사용자만 접근 가능.",
                security = @SecurityRequirement(name = "bearerAuth"),
                responses = {
                        @ApiResponse(responseCode = "204", description = "승인됨"),
                        @ApiResponse(responseCode = "404", description = "리소스를 찾을 수 없음",
                                content = @Content(mediaType = "application/json",
                                        schema = @Schema(ref = "#/components/schemas/ErrorResponse"))),
                        @ApiResponse(responseCode = "409", description = "비즈니스 충돌",
                                content = @Content(mediaType = "application/json",
                                        schema = @Schema(ref = "#/components/schemas/ErrorResponse")))
                }
        )
    @PostMapping("/jobs/{jobId}/applications/{applicationId}/approve")
    public ResponseEntity<Void> approveApplicationExample(@PathVariable Long jobId, @PathVariable Long applicationId) {
        return ResponseEntity.noContent().build();
    }
}
