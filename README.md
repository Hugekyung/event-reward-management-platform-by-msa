# 🎯 Event Reward Platform

> NestJS + MongoDB 기반 MSA 이벤트 보상 시스템

---

## 📘 프로젝트 개요

- **프로젝트 명:** Event Reward Platform
- **기술 스택:** `NestJS`, `MongoDB`, `Redis`, `Docker`, `Swagger`, `Passport JWT`
- **아키텍처:** Monorepo 기반 MSA 구조
- **목표:** 실제 서비스에 적용 가능한 이벤트/보상 관리 시스템 구현

---

## 🏗️ 시스템 구조 및 역할

| 서비스명       | 포트        | 주요 역할                                        |
| -------------- | ----------- | ------------------------------------------------ |
| Gateway Server | 3000        | 요청 라우팅, 인증/인가, 프록시 처리              |
| Auth Server    | 3001        | 유저 등록, 로그인, 권한 관리, JWT 발급 및 검증   |
| Event Server   | 3002        | 이벤트 생성/조회, 보상 등록/조회, 보상 요청 처리 |
| MongoDB (2개)  | 27017/27018 | 각각 Auth/Event 전용 DB 분리 운영                |
| Redis          | 6379        | RefreshToken 관리, 멱등성 키 처리                |

---

## 🧱 디렉터리 구조

```
apps/
  gateway/        # Gateway 서버
  auth/           # Auth 서버
  event/          # Event 서버

libs/
  database/       # 공통 Mongoose 스키마, interface
  redis/          # Redis 모듈 및 서비스
  shared/         # 유틸, 인터셉터, 데코레이터, 상수 등
```

---

## 🧪 주요 기능 요약

### ✅ 인증 (Auth Server)

- 유저/관리자 회원가입 API (`/auth/register`, `/auth/register-admin`)
- 로그인 & JWT 발급 (`/auth/login`)
- RefreshToken 재발급 (`/auth/refresh`)
- 권한 분리: `USER`, `OPERATOR`, `AUDITOR`, `ADMIN`

### ✅ 이벤트 (Event Server)

- 관리자용 이벤트 생성 (`/event/events`)
- 이벤트 조건 타입 분리 + 검증 전략 적용

    - 예: `첫 로그인`, `친구 초대`, `데일리 퀘스트`, `업그레이드`

### ✅ 보상 (Reward)

- 보상 생성 (포인트, 아이템, 쿠폰)
- discriminator 기반 스키마 구조 확장
- 보상과 이벤트 매핑 (`EventRewardMapping`)
- 보상 수량 관리

### ✅ 보상 요청/조회

- `/reward/claim`: 이벤트 조건 충족 시 보상 요청
- `/reward/history`: 유저/관리자별 보상 이력 조회
- 멱등키 처리 + 중복 방지 (Redis + Unique Index)
- 필터링, 페이징, 정렬 지원

---

## 🛡️ 기술적 설계 포인트

- **MSA + Monorepo 구조**: 서버별 책임 분리 + 공통 코드 공유
- **interface + token 기반 DI**: 의존성 분리 및 테스트 용이성 확보
- **Factory + Strategy 패턴**: 이벤트 조건별 로직 처리
- **Mongoose Discriminator**: Reward 스키마 확장에 최적
- **Redis 멱등성 처리**: 보상 중복 방지 및 안전성 확보
- **Swagger 적용**: 모든 API에 명세 자동화

---

## 🚀 실행 방법

```bash
# 프로젝트 실행
$ docker-compose up --build

# Swagger (Gateway 경유)
http://localhost:3000/api-docs
```

---

## 🧪 API 테스트 가이드

- **모든 요청은 Gateway(3000)로 진입**
- Swagger 문서 또는 Postman으로 테스트

```bash
POST http://localhost:3000/api/auth/register
POST http://localhost:3000/api/auth/login
POST http://localhost:3000/api/event/events
POST http://localhost:3000/api/reward/claim
GET  http://localhost:3000/api/reward/history
```

---

## 📌 기타 참고사항

- `@GetUser()` 데코레이터로 JWT 유저 정보 추출
- JWT 발급/검증 로직은 `libs/shared/jwt`에서 전역 관리
- RedisService도 전역 `libs/redis`에서 관리
- 테스트 코드: 핵심 기능(Auth, 보상 요청 등) 단위 테스트 작성

---

## 🧠 정리

- 이 프로젝트는 **도메인 중심 설계**, **확장성 있는 구조**, **보안/안정성 고려**, **실서비스 기준의 품질**을 모두 갖춘 예제입니다.
- MSA 구조, MongoDB 스키마 설계, 이벤트 조건별 분기 처리 등 백엔드 실무 역량을 보여주기에 최적입니다.

---
