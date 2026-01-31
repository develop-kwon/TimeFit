package com.timefit.backend.domain.user.dto;

import com.timefit.backend.domain.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotNull
    private UserRole role;

    // [추가] 프론트엔드 데이터 수신용 필드
    private String name;         // 구직자 이름
    private String companyName;  // 채용자 회사명 (프론트에서 companyName으로 보냄)
    private String contact;
    private String address;

    // 편의 메서드: 구직자 이름이나 회사명 중 있는 것을 반환
    public String getDisplayName() {
        return companyName != null && !companyName.isBlank() ? companyName : name;
    }
}
