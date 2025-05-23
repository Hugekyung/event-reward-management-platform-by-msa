# 🎯 Event Reward Platform

> NestJS + MongoDB 기반 MSA 이벤트 보상 시스템

---

## 📘 프로젝트 개요

- **프로젝트 명:** Event-Reward-Platform
- **기술 스택:** `NestJS`, `MongoDB`, `Redis`, `Docker`, `Swagger`, `Passport JWT`
- **아키텍처:** Monorepo 기반 MSA 구조(docker-compose)
- **목표:** 실제 서비스에 적용 가능한 이벤트/보상 관리 시스템 구현

---

## 🏗️ 시스템 구조 및 역할

| 서비스명       | 포트        | 주요 역할                                        |
| -------------- | ----------- | ------------------------------------------------ |
| Gateway Server | 3000        | 요청 라우팅, 인증, 프록시 처리                   |
| Auth Server    | 3001        | 유저 등록, 로그인, 권한 관리, JWT 발급 및 검증   |
| Event Server   | 3002        | 이벤트 생성/조회, 보상 등록/조회, 보상 요청 처리 |
| MongoDB (2개)  | 27017/27018 | 각각 Auth/Event 전용 DB 분리 운영                |
| Redis          | 6379        | RefreshToken 관리, 멱등성 키 처리                |

---

## 🧱 디렉터리 구조

```
apps/
  gateway/          # Gateway 서버
  auth/             # Auth 서버
  event/            # Event 서버
      src/
        common/     # constants(tokens), interceptor, interface, utils 등
        modules/    # 서비스 로직

libs/
  database/         # 공통 Mongoose 스키마, interface, mapper
  redis/            # Redis 모듈 및 서비스
  shared/           # 유틸, 인터셉터, 데코레이터, 상수 등
  enum/             # 프로젝트 공통 ENUM 타입
```

---

## 🧪 주요 기능 요약

### ✅ 인증 (Auth Server)

- Auth
    - 로그인 & JWT 발급 (`POST /auth/login`)
    - access token 재발급 (`POST /auth/refresh`)
    - 일반 유저 등록 (`POST /auth/register`)
    - 관리자 유저 등록 (`POST /auth/register-admin`)
- User
    - 첫 로그인 여부 확인 (`GET /users/:userId/attendance-check`)

### ✅ 이벤트 (Event Server)

- Event
    - 관리자용(OPERATOR, ADMIN) 이벤트 등록 (`POST /events`)
    - 이벤트 목록 조회 (`GET /events`)
    - 이벤트 상세 조회 (`GET /events/:eventId`)
- Reward
    - 이벤트 보상 신규 등록 (`POST /rewards`)
    - 이벤트 보상 상세 조회 (`GET /rewards/:rewardId`)
    - 본인 이벤트 보상 요청 내역 확인(일반유저) (`GET /rewards/histories/me`)
    - 이벤트 보상 요청 내역 확인(관리자) (`GET /rewards/histories`)
    - 유저의 이벤트 보상 요청 (`POST /rewards/request`)

---

## 🛡️ 기술적 설계 포인트

- **MSA + Monorepo 구조**: 서버별 책임 분리 + 공통 코드 공유
- **interface + token 기반 DI**: 의존성 분리 및 테스트 용이성 확보
- **Factory + Strategy 패턴**: 이벤트 조건별 로직 처리
- **Mongoose Discriminator**: Reward 스키마 확장 용이성 확보
- **Redis &멱등키 기반 멱등성 처리**: 보상 중복 방지 및 안전성 확보
- **Swagger 적용**: 상세한 API 명세 추가로 협업 효율성 확보

---

## 🚀 실행 방법

```bash
# 프로젝트 실행
$ docker-compose up --build -d
```

---

## 🧪 API 테스트 가이드

- **모든 요청은 Gateway(3000)로 진입**
- Swagger 문서 또는 Postman으로 테스트

---

## 📌 기타 참고사항

- `@GetUser()` 데코레이터로 JWT 유저 정보 추출
- JWT 발급/검증 로직은 `libs/shared/jwt`에서 전역 관리
- RedisService도 전역 `libs/redis`에서 관리

---

## 🧠 이슈 & 해결과정 요약

### 1. Gateway 라우팅 처리

- **문제**: MSA 구조에서 각 서비스 요청을 어떻게 전달할 것인가
- **해결**: Gateway 서버에서 `http-proxy-middleware` 사용하여 Auth, Event 등으로 라우팅 처리

---

### 2. Gateway 역할 및 인증/인가 처리

- **문제**: Gateway 서버에서 JWT 인증과 역할 기반 인가를 어디까지 처리할 것인가
- **해결**:
    - 구조 상 Gateway 서버가 서비스 서버의 Role 정책에 대해 알 수 없으므로 인가 처리는 각 서비스 서버에 위임
    - 즉, JWT 토큰은 Gateway에서 검증(`JwtAuthGuard`)되며, 역할(Role) 기반 접근 제어(`RolesGuard`)는 각 서비스에서 수행하도록 처리
    - MSA 구조에서 각 도메인의 책임을 분리하기 위함

---

### 3. 회원가입 API 분리

- **문제**: 일반 유저와 관리자 유저 가입 구분 필요
- **해결**: `/register`, `/register-admin` API 분리 및 초대 코드(INVITE_CODE) 기반으로 관리자 검증

---

### 4. 공통 모듈 관리

- **문제**: 공통 타입, DTO, 인터페이스 등 중복 이슈
- **해결**
    - NestJS MonoRepo 구조 사용
    - `libs/` 디렉터리에 모듈화 (예: `@libs/database`, `@libs/shared/jwt`)

---

### 5. JWT 처리

- **문제**: Access/RefreshToken 처리 방식 결정
- **해결**:
    - Access → 헤더에서 처리
    - Refresh → Redis에 저장하고, 만료 시 재발급

---

### 6. MSA 구조에서 DB 분리

- **문제**: 단일 DB 구조를 어떻게 서비스별로 나눌지
- **해결**: Mongo 컨테이너를 서비스별로 분리하여 독립 운영 (`auth-mongo`, `event-mongo`)

---

### 7. 역할(Role) 기반 접근 제어

- **문제**: 관리자만 이벤트 생성 가능해야 함
- **해결**: `@Roles()` + `RolesGuard`로 Event 서버 내에서 역할별 접근 제어 수행

---

### 8. 보상 스키마 분리

- **문제**: 보상 타입별 구조가 너무 다름 (포인트, 쿠폰 등)
- **해결**: Mongoose Discriminator 패턴을 활용해 타입별 서브 스키마 구성

---

### 9. 이벤트 조건 구조 설계

- **문제**: 조건을 코드에서 자동 판단 가능하게 표현할 방법 필요
- **해결**: `conditions` 필드에 JSON 형태로 type, config, description 등을 명시  
  → Strategy Pattern으로 검증 로직 분리

---

### 10. 멱등키 처리

- **문제**: 중복 보상 지급 방지 필요
- **해결**: Redis에 `reward:{userId}:{eventId}:{rewardId}` 형태로 key 저장 (`NX`, `EX` 옵션)

---

### 11. 이벤트 조건 판단 로직 분리

- **문제**: 조건별 판단 로직이 복잡
- **해결**: 이벤트 타입별로 Strategy 클래스 분리 (예: `LoginStrategy`, `InviteStrategy`)

---

### 12. Gateway 외부 접근 강제

- **문제**: 서비스 직접 접근 가능 → 보안 문제
- **해결**: `docker-compose.yml`에서 `ports` 제거, `expose`만 사용해 내부 통신만 허용

---
