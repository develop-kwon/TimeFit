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
public class JobSummaryResponse {
    private Long id;
    private String title;
    private Integer hourlyWage;
    private LocalDate workDate;
    private JobStatus status;

    public static JobSummaryResponse from(Job job) {
        return JobSummaryResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .hourlyWage(job.getHourlyWage())
                .workDate(job.getWorkDate())
                .status(job.getStatus())
                .build();
    }
}
