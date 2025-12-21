package com.timefit.backend.domain.user;

import com.timefit.backend.common.exception.InvalidCredentialsException;
import com.timefit.backend.domain.user.dto.LoginRequest;
import com.timefit.backend.domain.user.dto.SignupRequest;
import com.timefit.backend.domain.user.dto.SignupResponse;
import com.timefit.backend.domain.user.dto.TokenResponse;
import com.timefit.backend.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("이미 가입된 이메일입니다.");
        }

        String encoded = passwordEncoder.encode(request.getPassword());
        User user = User.of(
                request.getEmail(),
                encoded,
                request.getRole(),
                request.getDisplayName(), // name 또는 companyName
                request.getContact(),
                request.getAddress()
        );
        User saved = userRepository.save(user);

        // [추가] 가입 즉시 토큰 생성 (자동 로그인용)
        String accessToken = jwtProvider.generateToken(saved.getId(), saved.getRole(), saved.getName());

        // 토큰을 포함하여 응답 반환
        return new SignupResponse(saved.getId(), saved.getEmail(), saved.getRole(), accessToken);
    }

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String accessToken = jwtProvider.generateToken(user.getId(), user.getRole(), user.getName());
        return new TokenResponse(accessToken, "Bearer", jwtProvider.getExpirationMillis());
    }
}
