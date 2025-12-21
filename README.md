# Backend
시흥시 일자리 매칭 시스템 백엔드 레포지토리
# Job / Job Application API
## 목차
- [기본 정보](#%EA%B8%B0%EB%B3%B8-%EC%A0%95%EB%B3%B4)
- [에러 응답 포맷](#%EC%97%90%EB%9F%AC-%EC%9D%91%EB%8B%B5-%ED%8F%AC%EB%A7%B7)
- [1) 공고 등록](#1-%EA%B3%B5%EA%B3%A0-%EB%93%B1%EB%A1%9D)
- [2) 공고 지원하기](#2-%EA%B3%B5%EA%B3%A0-%EC%A7%80%EC%9B%90%ED%95%98%EA%B8%B0)
- [3) 공고 지원 목록 조회](#3-%EA%B3%B5%EA%B3%A0-%EC%A7%80%EC%9B%90-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C)
- [비즈니스 규칙](#%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EA%B7%9C%EC%B9%99)

## 기본 정보
- **Base URL**: `{{BASE_URL}}`
예: `http://localhost:8080`
- **Content-Type**: `application/json`
- 날짜/시간은 ISO-8601 예시 형식: `2025-12-21T10:11:12`

## 에러 응답 포맷
에러 발생 시 아래 형태로 메시지를 반환합니다.
``` json
{
  "message": "에러 메시지"
}
```
대표 상태코드:
- **400 Bad Request**: 유효성 검증 실패(필수값 누락/형식 오류)
- **404 Not Found**: 대상 리소스(예: 공고)가 존재하지 않음
- **409 Conflict**: 비즈니스 충돌(예: 중복 지원, 마감된 공고 지원 등)

## 1) 공고 등록
### `POST /api/jobs`
공고를 생성합니다. 생성된 공고의 기본 상태는 `OPEN`입니다.
#### Request Body (예시)
``` json
{
  "title": "string",
  "description": "string",
  "hourlyWage": 10000,
  "workDate": "2025-12-21"
}
```
#### cURL
``` bash
curl -i -X POST "{{BASE_URL}}/api/jobs" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"서빙 알바\",\"description\":\"주말 근무\",\"hourlyWage\":12000,\"workDate\":\"2025-12-21\"}"
```
#### Success Response
- **201 Created**
``` json
{
  "id": 5,
  "status": "OPEN"
}
```
## 2) 공고 지원하기
### `POST /api/jobs/{jobId}/applications`
특정 공고에 지원합니다.
#### Path Parameter
- `jobId` (number): 공고 ID

#### Request Body
- `applicantId` (필수)
- `coverLetter` (선택)
``` json
{
  "applicantId": 123,
  "coverLetter": "지원 동기..."
}
```
#### cURL (coverLetter 포함)
``` bash
curl -i -X POST "{{BASE_URL}}/api/jobs/5/applications" ^
  -H "Content-Type: application/json" ^
  -d "{\"applicantId\":123,\"coverLetter\":\"지원합니다.\"}"
```
#### cURL (coverLetter 생략)
``` bash
curl -i -X POST "{{BASE_URL}}/api/jobs/5/applications" ^
  -H "Content-Type: application/json" ^
  -d "{\"applicantId\":123}"
```
#### Success Response
- **201 Created**
``` json
{
  "applicationId": 987,
  "applicantId": 123,
  "coverLetter": "지원합니다.",
  "createdAt": "2025-12-21T10:11:12"
}
```
#### Error Responses
- **400 Bad Request**: `applicantId` 누락 등 검증 실패
- **404 Not Found**: `jobId`에 해당하는 공고 없음
- **409 Conflict**: 중복 지원, 마감된 공고 지원 등

## 3) 공고 지원 목록 조회
### `GET /api/jobs/{jobId}/applications`
특정 공고의 지원 목록을 조회합니다. **최신 지원이 먼저** 반환됩니다(내림차순).
#### Path Parameter
- `jobId` (number): 공고 ID

#### cURL
``` bash
curl -i -X GET "{{BASE_URL}}/api/jobs/5/applications"
```
#### Success Response
- **200 OK**
``` json
[
  {
    "applicationId": 987,
    "applicantId": 123,
    "coverLetter": "지원합니다.",
    "createdAt": "2025-12-21T10:11:12"
  },
  {
    "applicationId": 986,
    "applicantId": 456,
    "coverLetter": null,
    "createdAt": "2025-12-21T09:00:00"
  }
]
```
#### Error Responses
- **404 Not Found**: `jobId`에 해당하는 공고 없음

## 비즈니스 규칙
### 중복 지원 방지
- 동일 공고(`jobId`)에 동일 지원자(`applicantId`)는 **1회만 지원 가능**
- 중복 지원 시: **409 Conflict**
- 에러 바디 예시:
``` json
{
  "message": "이미 해당 공고(5)에 지원한 사용자(123)입니다."
}
```
