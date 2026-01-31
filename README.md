# TimeFit ⏱️  
시간(Time)이 딱 맞는(Fit) 일자리를 연결하다

## 프로젝트 소개
TimeFit은 갑작스러운 인력 공백이나 초단기 알바가 필요할 때  
**‘가능한 스케줄’을 기준으로 즉시 투입 가능한 인력을 매칭**해주는  
단기 구인·구직 웹 서비스입니다.

기존의 직무·조건 중심 채용 방식이 아닌,  
**‘지금 시간이 맞는가’**를 핵심 기준으로 빠른 매칭을 지향합니다.

---

## 기획 배경
N잡러 및 단기 근무를 선호하는 긱 이코노미 시장은 지속적으로 성장하고 있지만,  
기존 구인·구직 플랫폼은 공고 → 지원 → 면접의 긴 프로세스로 인해  
긴급한 대타나 초단기 인력 수요에 효과적으로 대응하지 못하고 있습니다.

TimeFit은 이러한 한계를 해결하기 위해  
**시간 일치 여부만으로 즉시 채용이 가능한 구조**를 목표로 기획되었습니다.

---

## 핵심 아이디어 & 차별점
- 직무 중심이 아닌 **시간 기반 매칭**
- 가능한 스케줄이 일치하면 즉시 채용 완료
- 불필요한 연락 및 면접 절차 제거
- 긴급 대타 / 초단기 알바 상황에 특화된 서비스

---

## 주요 기능

### 구직자
- 회원가입 시 선호 직종 및 근무 가능 시간 등록
- 스케줄 기반 맞춤 공고 조회
- 일자리 지원 및 지원 상태 확인

### 채용자
- 구인 공고 작성
- 지원자 스케줄 및 기본 정보 확인
- 즉시 승인 기능
- 근무 완료 후 리뷰 작성

> 📷 서비스 화면 및 기능 흐름은 하단 이미지 참고

> **TimeFit 메인 화면**  
> 시간 기반 매칭을 중심으로 구직자와 채용자가 빠르게 서비스를 이해할 수 있도록 구성한 메인 페이지입니다.
<img width="1115" height="781" alt="main_top" src="https://github.com/user-attachments/assets/09ec4f87-300d-410b-8712-beeb2e064397" />
<img width="1119" height="784" alt="main_bottom" src="https://github.com/user-attachments/assets/ff4cab10-7411-42f4-b942-77a224c8c648" />

> **회원가입 및 사용자 유형 선택**  
> 구직자 / 채용자 유형을 분리하여 각 사용자에게 맞는 기능과 플로우를 제공하도록 설계했습니다.
<img width="747" height="783" alt="join" src="https://github.com/user-attachments/assets/279092e4-137c-4eda-a2d5-398872b4197d" />

> **근무 가능 시간 등록**  
> 사용자는 자신의 가능한 시간대를 등록하며, 이 스케줄 정보가 매칭의 핵심 기준으로 활용됩니다.
<img width="1114" height="781" alt="schedule" src="https://github.com/user-attachments/assets/93eebabb-6c63-48c1-a374-11686db331c2" />
<img width="1114" height="781" alt="result" src="https://github.com/user-attachments/assets/9638d3f4-2515-47fc-931c-ea6029ea9423" />

> **채용자 지원자 확인 및 즉시 승인**  
> 채용자는 지원자의 스케줄과 기본 정보를 확인한 뒤, 불필요한 연락 없이 즉시 승인할 수 있습니다.
<img width="1115" height="780" alt="search" src="https://github.com/user-attachments/assets/7b199682-3e4a-426b-b0f4-b4b18fa73184" />

---

## 시스템 아키텍처
Frontend는 React 기반 SPA로 구성되어 있으며,  
Backend는 Spring Boot 기반 REST API 서버로 구현되었습니다.

JWT 기반 인증 방식을 사용하여 사용자 인증 및 권한을 관리하며,  
Frontend → Backend → Database 구조로 요청이 처리됩니다.

> 📷 아키텍처 다이어그램은 이미지 참고

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/690cca97-b07b-4f6d-8140-7e119c9995df" />

---

## 기술 스택

### Frontend
- React, Vite
- React Router
- Context API
- ESLint, Prettier

### Backend
- Spring Boot 3.x, Java 17
- Spring Security + JWT
- JPA (Hibernate), MySQL
- Swagger, Postman

---

## 개발 방식
- GitHub Flow 기반 브랜치 전략 사용
- feature 단위 개발 후 PR 및 코드 리뷰
- Swagger를 활용한 API 문서화 및 테스트
- 명세 기반(Specification-Driven) 개발 방식 적용

---

## 담당 역할
- Frontend 로그인/회원가입 페이지 구현
- Backend API 설계 및 구현
- JWT 기반 인증/인가 로직 개발
- 채용/지원 CRUD API 구현
- Swagger 및 Postman을 통한 API 테스트 및 검증

---

## 트러블슈팅
- JWT 인증 과정에서 필터 순서 문제로 인증 실패 발생  
  → Spring Security FilterChain 순서 조정으로 해결

- 시간 기반 필터링 시 매칭 누락 문제 발생  
  → 스케줄 데이터 구조 개선으로 매칭 정확도 향상

---

## 포트폴리오 구성 안내
본 저장소는 팀 프로젝트로 분리되어 있던  
Frontend / Backend 레포지토리를  
**포트폴리오 가독성을 위해 개인 monorepo 형태로 재구성한 저장소**입니다.

---

## 기대 효과
- 긴급 인력 공백 발생 시 즉각적인 대체 인력 확보
- 노쇼 및 병가로 인한 영업 손실 최소화
- 구직자는 자투리 시간을 활용한 즉각적인 수익 창출 가능

---

## 향후 발전 방향
- 매칭 알고리즘 고도화
- 실시간 알림 시스템 도입
- 지역 및 업종 확장
- AI 기반 시간 매칭 정확도 개선
