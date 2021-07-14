# 여신티켓 프론트엔드 디자인시스템

React.js with Typescript

<br>

## directory 구조

자동배포 codedeploy : target branch > development

<br>

```
yeoshin-front
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── App.tsx // 리액트 코드 생성 페이지
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    └── components
        ├── atoms // 가장 작은 단위 ( dummy component)
        ├── molecules // 하나 이상의 atoms 로 구성
        ├── organisms // molecules 와 atoms로 구성
        └── templates // 디자인 html layout gruop
    └── styles
        └── index.tsx
    ├── constants
    ├── pages // 실제 컨텐츠 바인딩 ( 로직, 상태 관리 )
    ├── hooks // 커스텀 훅의 모음
    ├── services // 비즈니스 로직 모음
    ├── App.css
    ├── index.css
    ├── index.tsx // dom render page
    └── reportWebVitals.js
```

```
yeoshin-storybook Architecture [ 외부용, 프로젝트 작업용 ] => 추후에 현재의 atoms/.. 폴더 그대로 가고 내부에 선택적, 필수적 상태표기로 변경될 예정입니다.
└── src
    └── assets
        ├── font/ font.css 에 정의
        ├── img / SVG.tsx 에 정의
        └── style
            └── animations / indes.ts 키프레임들 정의
            └── themes / default.ts 색상들 정의
    └── components [ 모듈 별로 분류, 폴더구조, 실제 분류와는 다름.  ]
        ├── button : 버튼형, text형, 각 상태별(선택불가능, 로딩중), 사이즈(full 사이즈 -fixed, nonfixed, small, medium, big) 와 이미지 여부까지 결정 - 가장 많은 유형이 많이 나올 것으로 예상됨
        ├── 프로그레스
        ├── popup : toast, 전면팝업, 기본팝업
        ├── loading : 부분 로딩, 페이지전체 로딩
        ├── layout : 1: 9, 2: 8, 3: 7 등 여러가지 기본 레이아웃
        ├── tooltip
        ├── article : 이미지 + 텍스트가 있는 리스트형식의 타입들처럼 기본 레이아웃
        └── input : checkbox, radio,
    └── styles
        └── index.tsx
    └── reportWebVitals.js
index.css
```

```
컴포넌트 분류 [ 내부용, 전체 구성 잡는용 ]

foundation
└─ typo : 취소선, 폰트 사이즈등 정의
└─ color
└─ icon
└─ spacing : margin 등 기본 간격들 (8px, 16px, 24px)

form [ form 관련 컴포넌트들 ]
└─ input ( search, text, number)
└─ button ( 버튼은 뺄지 고민중.. )
└─ radio
└─ checkbox
└─ textarea
└─ selectbox
└─ toggle
└─ input + button

popup [ 팝업과 같이 평소엔 보여지지 않고 이벤트에 의해 작게 나오는 것들 ]
└─ toast
└─ full
└─ basic
└─ snackbar

article [ 작은 아이템들 ]
└─ tag
└─ filter
└─ pagination
└─ stamp
└─ img
└─ fab ( 플로팅된 버튼 )
└─ badge ( 장바구니 아이콘 같이 아이콘의 상단 우측에 작게 표시된 것들 )

list [ 리스트 레이아웃들 ]
└─ 병원명 + 설명 리스트 (홈 + 이벤트 목록)
└─ 결제 내역 (미사용 + 사용완료)


layout
└─ navigation
└─ tab
```

```
css in js + css in css (이하 스인즈 + 스인스) 규칙

번들파일의 용량을 줄이고, 애니메이션 로딩 속도의 저하를 방지하기 위하여

1차
선언 : style/animations/index.ts(common.ts) 에 공통으로 사용될 수 있는 keyframes 선언, 각 컴포넌트별로 사용되는 애니메이션 별도 지정
사용 : 스인즈에서 props 에 애니메이션 옵션 추가?




```

### Setup

```
$ yarn install
or
$ npm install
```

[http://localhost:3000]

## Run the app

`$ yarn start`

- 리액트 코드 로컬로 실행

`$ yarn test`

- 리액트 테스트 코드 실행

`$ yarn build-dev`

- 리액트 코드 dev 빌드

`$ yarn build-prod`

- 리액트 코드 prod 빌드

`$ yarn story`

- 스토리북 실행

`$ yarn build-story`

- 스토리북 빌드

## Plugin

### jest

```
├── react-test-renderer
└── testing-library
```

> 테스트 케이스 작성을 위한 모듈

### react-helmet

> seo를 위한 라이브러리
> https://github.com/nfl/react-helmet#readme

### mobx react lite

```
└── mobx-state-tree
```

> 상태관리 라이브러리
> https://mobx.js.org/README.html

### story book

> 독립적 UI 컴포넌트를 위한 라이브러리
> https://www.learnstorybook.com/

### emotion

> 자바스크립트 스타일 라이브러리
> https://emotion.sh/docs/introduction

### web-vitals

> 다양한 메트릭을 이용해 애플리케이션 성능을 측정 분석하는 릴레이어
> https://web.dev/vitals/

### typescript

> 타입안정성을 위한 라이브러리
> https://www.typescriptlang.org/

### dotenv

> usage : {process.env.REACT_APP_BASE_URL}
> https://github.com/motdotla/dotenv#readme

### axios

> http 통신 프로토콜 library
> https://github.com/axios/axios

## trouble shooting

> Ask the questions to megamisoh@fastlane.kr

#test deploy
