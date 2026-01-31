package com.timefit.backend.common.exception;

import org.springframework.http.HttpStatus;

public class ErrorResponse {

    private final String timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final String path;

    private ErrorResponse(String timestamp, int status, String error, String message, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public static ErrorResponse of(HttpStatus status, String message, String path) {
        String ts = java.time.OffsetDateTime.now(java.time.ZoneOffset.UTC).toString();
        return new ErrorResponse(ts, status.value(), status.getReasonPhrase(), message, path);
    }

    public String getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}
