package com.timefit.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.Objects;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    /* ===============================
       OpenAPI 기본 설정
       =============================== */
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .in(SecurityScheme.In.HEADER)
                                        .name("Authorization")))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .info(new Info()
                        .title("TimeFit API")
                        .description("""
                                JWT Bearer Token 기반 인증을 사용하는 백엔드 API 문서입니다.
                                - Authorize 버튼을 눌러 'Bearer {token}' 형식으로 입력하세요.
                                - 일부 공고/지원 관련 API는 RECRUITER 권한이 필요합니다.
                                """)
                        .version("v1")
                        .contact(new Contact().name("TimeFit Backend")));
    }

    /* ===============================
       Swagger 그룹 설정
       =============================== */
    @Bean
    public GroupedOpenApi authApi() {
        return GroupedOpenApi.builder()
                .group("Auth")
                .pathsToMatch("/api/auth/**")
                .build();
    }

    @Bean
    public GroupedOpenApi jobApi() {
        return GroupedOpenApi.builder()
                .group("Job")
                .pathsToMatch("/api/jobs/**")
                .pathsToExclude("/api/jobs/*/applications/**")
                .build();
    }

    @Bean
    public GroupedOpenApi jobApplicationApi() {
        return GroupedOpenApi.builder()
                .group("JobApplication")
                .pathsToMatch("/api/jobs/*/applications/**")
                .build();
    }

    /* ===============================
       전역 Swagger 커스터마이저
       =============================== */
    @Bean
    public OpenApiCustomizer globalOpenApiCustomizer() {
        return openApi -> {
            if (openApi.getPaths() == null) return;

            /* --- Components null-safe 처리 --- */
            Components components = openApi.getComponents();
            if (components == null) {
                components = new Components();
                openApi.setComponents(components);
            }

            /* --- ErrorResponse Schema 등록 --- */
            components.addSchemas("ErrorResponse",
                    new Schema<Map<String, Object>>()
                            .type("object")
                            .addProperties("timestamp", new Schema<>().type("string").format("date-time"))
                            .addProperties("status", new Schema<>().type("integer").format("int32").example(400))
                            .addProperties("error", new Schema<>().type("string").example("Bad Request"))
                            .addProperties("message", new Schema<>().type("string").example("요청이 올바르지 않습니다."))
                            .addProperties("path", new Schema<>().type("string").example("/api/..."))
            );

            openApi.getPaths().forEach((path, pathItem) ->
                    pathItem.readOperations().forEach(operation -> {

                        /* --- 태그 및 보안 정책 --- */
                        if (path.startsWith("/api/auth/")) {
                            addTag(operation, "Auth");
                            operation.setSecurity(null); // 인증 제외
                        } else if (path.matches("^/api/jobs/[^/]+/applications.*")) {
                            addTag(operation, "JobApplication");
                            addJwtSecurity(operation);
                        } else if (path.startsWith("/api/jobs")) {
                            addTag(operation, "Job");
                            addJwtSecurity(operation);
                        } else {
                            addJwtSecurity(operation);
                        }

                        /* --- 공통 에러 응답 (Auth API 제외) --- */
                        if (!path.startsWith("/api/auth/")) {
                            addCommonErrorResponses(operation);
                        }
                    })
            );
        };
    }

    /* ===============================
       Helper Methods
       =============================== */

    private void addJwtSecurity(io.swagger.v3.oas.models.Operation operation) {
        if (operation.getSecurity() == null || operation.getSecurity().isEmpty()) {
            operation.addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME));
        }
    }

    private void addTag(io.swagger.v3.oas.models.Operation operation, String tag) {
        if (operation.getTags() == null || operation.getTags().isEmpty()) {
            operation.addTagsItem(tag);
        } else if (operation.getTags().stream().noneMatch(t -> Objects.equals(t, tag))) {
            operation.addTagsItem(tag);
        }
    }

    private void addCommonErrorResponses(io.swagger.v3.oas.models.Operation operation) {
        if (operation.getResponses() == null) {
            operation.setResponses(new ApiResponses());
        }

        putIfAbsent(operation, "400", "Bad Request", example(
                400, "Bad Request", "요청이 올바르지 않습니다."
        ));
        putIfAbsent(operation, "401", "Unauthorized", example(
                401, "Unauthorized", "인증 토큰이 유효하지 않습니다."
        ));
        putIfAbsent(operation, "403", "Forbidden", example(
                403, "Forbidden", "권한이 없습니다."
        ));
        putIfAbsent(operation, "404", "Not Found", example(
                404, "Not Found", "리소스를 찾을 수 없습니다."
        ));
        putIfAbsent(operation, "409", "Conflict", example(
                409, "Conflict", "리소스 상태 충돌이 발생했습니다."
        ));
    }

    private ApiResponse example(int status, String error, String message) {
        Map<String, Object> body = Map.of(
                "timestamp", "2024-01-01T12:34:56Z",
                "status", status,
                "error", error,
                "message", message,
                "path", "/api/..."
        );

        return new ApiResponse()
                .description(error)
                .content(new Content().addMediaType(
                        "application/json",
                        new MediaType()
                                .schema(new Schema<>().$ref("#/components/schemas/ErrorResponse"))
                                .example(body)
                ));
    }

    private void putIfAbsent(
            io.swagger.v3.oas.models.Operation operation,
            String status,
            String description,
            ApiResponse response
    ) {
        if (!operation.getResponses().containsKey(status)) {
            operation.getResponses().addApiResponse(status, response);
        }
    }
}
