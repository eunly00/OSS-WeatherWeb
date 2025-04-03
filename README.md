# 날씨 시각화 애플리케이션

## 📋 프로젝트 개요

본 프로젝트는 대한민국 시도별 날씨 정보를 시각화하는 웹 애플리케이션입니다. Vue.js 기반의 프론트엔드와 Express.js 기반의 백엔드로 구성되어 있으며, 공공데이터포털 API 및 네이버 지도 API를 활용합니다.

### 주요 기능
- 시도별 현재 기온 확인
- 24시간 내 강수 확률 확인
- 시도별 풍량 정보 제공
- 일몰 시간 정보 제공
- Glassmorphism UI 디자인 적용

## 🛠️ 기술 스택

### 프론트엔드
- Vue.js
- Vuex (상태 관리)
- Vue Router
- Axios (HTTP 클라이언트)
- SCSS
- Naver Maps API

### 백엔드
- Node.js
- Express.js
- RESTful API 설계
- 공공데이터포털 오픈 API 연동

## 📡 API 명세

### 1. 현재 기온 API
```
GET /api/v1/weather/current-temperature
```

**Query Parameters**
- `region` (string): 시도 이름 (예: "서울특별시")
- `timestamp` (optional): 요청 시각

**Response**
```json
{
  "region": "서울특별시",
  "temperature": 17.4,
  "unit": "°C",
  "timestamp": "2025-04-03T12:00:00Z"
}
```

### 2. 강수 확률 API
```
GET /api/v1/weather/precipitation
```

**Query Parameters**
- `region` (string): 시도 이름

**Response**
```json
{
  "region": "서울특별시",
  "chance": 40,
  "unit": "%", 
  "next24h": true
}
```

### 3. 풍량 API
```
GET /api/v1/weather/wind
```

**Query Parameters**
- `region` (string): 시도 이름

**Response**
```json
{
  "region": "서울특별시",
  "windSpeed": 3.5,
  "unit": "m/s"
}
```

### 4. 습도 API
```
GET /api/v1/weather/humidity
```

**Query Parameters**
- `region` (string): 시도 이름

**Response**
```json
{
  "region": "서울특별시",
  "sunsetTime": "18:44"
}
```

## 🚀 설치 및 실행 방법

### 사전 요구사항
- Node.js 16.x 이상
- npm 8.x 이상
- 공공데이터포털 API 키
- 네이버 Maps API 키

### 설치

1. 저장소 클론
```bash
git clone https://github.com/eunly00/OSS-WeatherWeb.git
cd OSS-WeatherWeb
```

2. 백엔드 설정
```bash
cd backend
npm install
cp .env.example .env
# .env 파일에 API 키 설정
```

3. 프론트엔드 설정
```bash
cd frontend
npm install
cp .env.example .env
# .env 파일에 API 키 설정
```

### 실행

1. 백엔드 서버 실행
```bash
cd backend
npm run start
```

2. 프론트엔드 개발 서버 실행
```bash
cd frontend
npm run serve
```

3. 브라우저에서 접속
```
http://localhost:8080
```

## 📱 화면 구성

1. **현재 기온**: 시도별 현재 기온 상세 정보 및 그래프
2. **24시간내 강수량**: 시간대별 강수 확률 및 예상 강수량
3. **풍량**: 시도별 풍향 및 풍속 정보
4. **습도**: 시도별 습도 정보

