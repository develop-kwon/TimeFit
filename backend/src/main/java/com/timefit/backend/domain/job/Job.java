package com.timefit.backend.domain.job;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    @Column(nullable = false)
    private String description;

    @Column(name = "hourly_wage", nullable = false)
    private Integer hourlyWage;

    @Column(name = "work_date", nullable = false)
    private LocalDate workDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobStatus status;

    @jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @jakarta.persistence.JoinColumn(name = "recruiter_id", nullable = false)
    private com.timefit.backend.domain.user.User recruiter;

    @OneToMany(mappedBy = "job")
    private final List<JobApplication> applications = new ArrayList<>();

    private Job(String title, String description, Integer hourlyWage, LocalDate workDate, JobStatus status) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("description must not be blank");
        }
        if (hourlyWage == null || hourlyWage <= 0) {
            throw new IllegalArgumentException("hourlyWage must be positive");
        }
        if (workDate == null) {
            throw new IllegalArgumentException("workDate must not be null");
        }
        if (status == null) {
            throw new IllegalArgumentException("status must not be null");
        }

        this.title = title;
        this.description = description;
        this.hourlyWage = hourlyWage;
        this.workDate = workDate;
        this.status = status;
    }

    private Job(String title, String description, Integer hourlyWage, LocalDate workDate, JobStatus status,
                com.timefit.backend.domain.user.User recruiter) {
        this(title, description, hourlyWage, workDate, status);
        if (recruiter == null) {
            throw new IllegalArgumentException("recruiter must not be null");
        }
        this.recruiter = recruiter;
    }

    public static Job of(String title, String description, Integer hourlyWage, LocalDate workDate, JobStatus status,
                         com.timefit.backend.domain.user.User recruiter) {
        return new Job(title, description, hourlyWage, workDate, status, recruiter);
    }

    public void close() {
        if (this.status == JobStatus.CLOSED) {
            throw new com.timefit.backend.domain.job.JobAlreadyClosedException(this.id);
        }
        this.status = JobStatus.CLOSED;
    }

    public List<JobApplication> getApplications() {
        return Collections.unmodifiableList(applications);
    }
}
