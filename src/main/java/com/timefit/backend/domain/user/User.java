package com.timefit.backend.domain.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email")
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;

    @Column(length = 50)
    private String name;     // 이름 (또는 회사명)

    @Column(length = 20)
    private String contact;  // 연락처

    @Column(length = 255)
    private String address;  // 주소

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private User(String email, String password, UserRole role, String name, String contact, String address) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.contact = contact;
        this.address = address;
    }

    public static User of(String email, String encodedPassword, UserRole role, String name, String contact, String address) {
        return new User(email, encodedPassword, role, name, contact, address);
    }

    @PrePersist
    void prePersist() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }
}
