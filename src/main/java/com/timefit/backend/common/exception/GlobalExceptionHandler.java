package com.timefit.backend.common.exception;

import com.timefit.backend.domain.job.ClosedJobApplicationNotAllowedException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(ClosedJobApplicationNotAllowedException.class)
    public ResponseEntity<ErrorResponse> handleClosedJob(ClosedJobApplicationNotAllowedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(org.springframework.web.bind.MethodArgumentNotValidException ex) {
        String messages = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(java.util.stream.Collectors.joining(", "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(messages));
    }

    @ExceptionHandler(com.timefit.backend.domain.job.DuplicateJobApplicationException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(com.timefit.backend.domain.job.DuplicateJobApplicationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(com.timefit.backend.domain.job.JobAlreadyClosedException.class)
    public ResponseEntity<ErrorResponse> handleJobAlreadyClosed(com.timefit.backend.domain.job.JobAlreadyClosedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(com.timefit.backend.domain.job.ApplicationAlreadyProcessedException.class)
    public ResponseEntity<ErrorResponse> handleApplicationAlreadyProcessed(com.timefit.backend.domain.job.ApplicationAlreadyProcessedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(ex.getMessage()));
    }

    public record ErrorResponse(String message) {}
}
