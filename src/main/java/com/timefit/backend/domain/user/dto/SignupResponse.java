package com.timefit.backend.domain.user.dto;

import com.timefit.backend.domain.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponse {
    private Long userId;
    private String email;
    private UserRole role;

    // [추가] 자동 로그인을 위한 토큰 필드
    private String accessToken;
}
