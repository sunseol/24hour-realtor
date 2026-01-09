# 24시 코리아 부동산 프로젝트 관리 가이드

## 🔗 주요 URL

| 서비스 | URL |
|--------|-----|
| **웹사이트** | Vercel 배포 URL (GitHub 연동) |
| **Sanity Studio (CMS)** | https://realtor24.sanity.studio/ |
| **Sanity 대시보드** | https://www.sanity.io/manage/project/l0tlxkcn |
| **GitHub 저장소** | https://github.com/sunseol/24hour-realtor |

---

## 📝 Sanity CMS 사용법

### 접속 방법
1. https://realtor24.sanity.studio/ 접속
2. Sanity 계정으로 로그인 (Google/GitHub/이메일)
3. 프로젝트 멤버만 접근 가능 (보안됨)

### 콘텐츠 타입

| 타입 | 메뉴 이름 | 용도 |
|------|-----------|------|
| **서비스** | Services | 홈 서비스 섹션 카드 (주거용, 상업용 등) |
| **매물** | Listings | 부동산 매물 정보 |
| **회사정보** | Company Info | 연락처, 주소, 영업시간 |

### 매물 추가 순서
1. 왼쪽 메뉴에서 **"매물"** 클릭
2. 우측 상단 **"+ Create"** 또는 **"새 문서"** 클릭
3. 필드 입력:
   - **매물명**: 삼성동 래미안 아파트
   - **유형**: 매매/전세/월세 선택
   - **가격**: 12억 5,000만 또는 300/80 (보증금/월세)
   - **규격**: 84㎡ · 3 bedroom · 2 bath
   - **태그**: 남향, 역세권, 단기 등
   - **메인 이미지**: 사진 업로드
4. 우측 하단 **"Publish"** 클릭

### 서비스 추가/수정
1. 왼쪽 메뉴에서 **"서비스"** 클릭
2. 기존 항목 클릭해서 수정 또는 새로 생성
3. 색상 클래스로 카드 배경색 지정 (블루/앰버/에메랄드/퍼플)
4. **정렬 순서** 숫자로 표시 순서 조절

### 회사정보 수정
1. 왼쪽 메뉴에서 **"회사정보"** 클릭
2. 전화번호, 이메일, 주소, 영업시간 수정
3. Publish 클릭

---

## 🔐 인증 정보

### Sanity
- **Project ID**: `l0tlxkcn`
- **Dataset**: `production`
- **API Token**: (환경변수로 관리)

### 토큰 재발급 방법
1. https://www.sanity.io/manage/project/l0tlxkcn 접속
2. **API** 탭 클릭
3. **Tokens** 섹션에서 새 토큰 생성

---

## 🛠️ 개발 명령어

```bash
# 웹사이트 개발 서버
cd /home/jake/vive/24hour-realtor
npm run dev

# 웹사이트 빌드
npm run build

# Sanity Studio 로컬 실행
cd /home/jake/vive/24hour-realtor/sanity
npm run dev

# Sanity Studio 재배포
SANITY_AUTH_TOKEN=<토큰> npx sanity deploy
```

---

## 📁 프로젝트 구조

```
24hour-realtor/
├── src/
│   ├── components/     # React 컴포넌트
│   │   ├── common/     # Button, Card, Input 등
│   │   ├── layout/     # Navbar, Footer
│   │   ├── home/       # 홈 섹션 컴포넌트
│   │   └── property/   # 매물 관련 컴포넌트
│   ├── pages/          # 페이지 컴포넌트
│   ├── hooks/          # 커스텀 훅 (useSanity 등)
│   ├── data/           # 기본 데이터
│   └── lib/            # Sanity 클라이언트
├── sanity/             # Sanity Studio
│   └── schemas/        # 콘텐츠 스키마 정의
└── dist/               # 빌드 결과물
```

---

## 🚨 주의사항

1. **Sanity 데이터가 없으면** → 기본 더미 데이터가 표시됨
2. **이미지 없이 매물 등록 시** → 그라데이션 배경으로 표시
3. **Studio는 로그인 필수** → 프로젝트 멤버만 접근 가능

---

*마지막 업데이트: 2026-01-09*
