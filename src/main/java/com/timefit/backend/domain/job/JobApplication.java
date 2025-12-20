package com.timefit.backend.domain.job;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 스펙상 기본 생성자 필요
@Entity
@Table(
        name = "job_application",
        indexes = {
                @Index(name = "idx_job_application_job_id_created_at", columnList = "job_id, created_at")
        }
)
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 다대일은 기본 EAGER이므로 반드시 LAZY로 명시하는 것이 일반적인 베스트 프랙티스입니다.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false, foreignKey = @ForeignKey(name = "fk_job_application_job"))
    private Job job;

    @Column(name = "applicant_id", nullable = false)
    private Long applicantId;

    @Lob
    @Column(name = "cover_letter")
    private String coverLetter;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * 빌더는 이 생성자를 기준으로 생성됩니다.
     * createdAt/id는 영속화 시점에 처리되므로 빌더 인자에서 제외합니다.
     */
    @Builder
    private JobApplication(Job job, Long applicantId, String coverLetter) {
        this.job = job;
        this.applicantId = applicantId;
        this.coverLetter = coverLetter;
    }

    public static JobApplication of(Job job, Long applicantId, String coverLetter) {
        if (job == null) {
            throw new IllegalArgumentException("job must not be null");
        }
        if (applicantId == null) {
            throw new IllegalArgumentException("applicantId must not be null");
        }
        return new JobApplication(job, applicantId, coverLetter);
    }

    @PrePersist
    void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}