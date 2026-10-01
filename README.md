# 냉장고민 - 프론트 프로젝트

사용자가 냉장고 속에 있는 식재료를 관리하고, 보유한 식재료를 기반으로 레시피를 추천해 주는 서비스입니다.
사용자가 원하는 레시피에서 부족한 식재료는 장바구니에 담아 스마트하게 장보기 계획을 세울 수 있습니다.

## 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [실행 방법](#실행-방법)
- [프로젝트 구조](#프로젝트-구조)

---

## 주요 기능

1. 나의 냉장고 (식재료 관리)

- **식재료 등록** : 재료명, 보관 장소(냉장/냉동/실온), 수량, 단위, 소비기한을 입력하여 식재료를 등록할 수 있습니다.
- **수량 수정 및 식재료 삭제** : 등록한 식재료의 수량을 수정하거나, 소진한 식재료를 삭제할 수 있습니다.
- **보관 장소 필터링**: 전체/냉장/냉동/실온 탭을 통해 식재료를 쉽게 분류해서 보여줍니다.
    > 식재료 데이터는 로컬 `db.json`을 활용한 JSON Server에 저장됩니다.

2. 레시피 추천

- **보유 식재료 기반 추천** : `나의 냉장고`에 등록된 식재료를 바탕으로 레시피를 추천합니다. (Spoonacular API 활용)
- **레시피 상세 정보** : 조리 소요 시간, 인분 수, 필요한 재료, 요리 방법(스텝별 안내)을 제공합니다.
- **식재료 비교** : 레시피에 필요한 재료 중 사용자가 보유한 재료와 보유하지 않은 재료를 구분하여 보여줍니다.

3. 장바구니 (쇼핑 리스트)

- **부족한 재료 담기** : 레시피 상세 페이지에서 사용자가 보유하고 있지 않은 재료들만 한 번에 장바구니에 추가할 수 있습니다.
- **장바구니 관리** : 저장한 식재료 목록을 확인하고, 구매했거나 필요하지 않은 식재료는 삭제할 수 있습니다.

4. 즐겨찾기

- 저장하고 싶은 레시피를 즐겨찾기에 추가하고, 전용 페이지에서 모아볼 수 있습니다.
    > 장바구니와 즐겨찾기 데이터는 브라우저 로컬 스토리지에 저장되어 새로고침 후에도 유지됩니다.

---

## 기술 스택

- **Frontend:** Next.js, React
- **State Management:** Zustand
- **Styling:** CSS Modules / Vanilla CSS
- **Data:** JSON Server
- **Open API:** Spoonacular API (레시피 검색 및 상세 데이터 통신)

---

## 실행 방법

프로젝트를 로컬 환경에서 실행하기 위한 방법입니다.

1. 저장소 클론 및 패키지 설치

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

2. 환경 변수 설정

프로젝트 루트 디렉토리에 .env 파일을 생성하고 아래의 변수들을 설정합니다.
Spoonacular API 키는 공식 홈페이지에서 발급받을 수 있습니다.

```
# 로컬 JSON Server 주소
NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:`설정한 포트번호`

# Spoonacular API Key
NEXT_PUBLIC_SPOONACULAR_API_KEY=`spoonacular_api_key`
```

3. 데이터베이스 (JSON Server) 실행

새로운 터미널 창을 열고 JSON Server를 실행합니다.

```
npm run server
또는
npx json-server --watch db.json --port 설정한 포트번호
```

4. Next.js 개발 서버 실행

새로운 터미널 창을 열고 프론트엔드 서버를 실행합니다.

```
npm run dev
```

브라우저에서 http://localhost:3000으로 접속하여 서비스를 이용할 수 있습니다.

## 프로젝트 구조

```plaintext
📦 project-root
┣ 📂 app
┃ ┣ 📂 cart # 장바구니 페이지
┃ ┣ 📂 favorites # 즐겨찾기 페이지
┃ ┣ 📂 recipes # 레시피 추천 및 상세 페이지
┃ ┣ 📜 globals.css # 전역 스타일링
┃ ┣ 📜 layout.js # 공통 레이아웃
┃ ┗ 📜 page.js # 메인 페이지
┣ 📂 components # 기능별 React 컴포넌트
┃ ┣ 📂 cart # 장바구니 관련 UI
┃ ┣ 📂 common # Header, Footer 등 공통 UI
┃ ┣ 📂 favorite # 즐겨찾기 관련 UI
┃ ┣ 📂 fridge # 냉장고 식재료 폼, 리스트, 카드 UI
┃ ┗ 📂 recipe # 레시피 리스트, 상세, 재료 리스트 UI
┣ 📂 lib # 유틸리티 및 API 통신 모듈
┃ ┣ 📜 dateUtils.js # 소비기한 D-day 계산 로직
┃ ┣ 📜 fridgeApi.js # JSON Server CRUD 로직
┃ ┗ 📜 spoonacular.js # Spoonacular API 통신 로직
┗ 📂 store # 전역 상태 관리 (Zustand)
┣ 📜 useFridgeStore.js # 장바구니 및 즐겨찾기 스토어 (Persist 적용)
┗ 📜 useStoreHydration.js # SSR Hydration 불일치 방지 커스텀 훅
```
