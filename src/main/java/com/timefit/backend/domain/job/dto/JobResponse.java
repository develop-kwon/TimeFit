package com.timefit.backend.domain.job.dto;

import com.timefit.backend.domain.job.Job;
import com.timefit.backend.domain.job.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private Integer hourlyWage;
    private LocalDate workDate;
    private JobStatus status;

    public static JobResponse from(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .hourlyWage(job.getHourlyWage())
                .workDate(job.getWorkDate())
                .status(job.getStatus())
                .build();
    }
}
