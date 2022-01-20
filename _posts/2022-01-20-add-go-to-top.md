---
published: true
title:  "[Github Blog] 깃허브 블로그 맨 위로 가기(Go to top) 버튼 달기"
excerpt: "깃허브 블로그에서 스크롤을 내리면 Go to top 버튼이 생성되게 해보자"

categories:
  - Github Blog
tags:
  - [Github Blog]

toc: true
toc_sticky: true
 
date: 2022-01-20
last_modified_at: 2022-01-20
---

<br>
스크롤을 내리면 Go to top, 맨 위로가기 버튼이 생기게 하고 싶었다.

내가 쓰는 테마인 minimal-mistakes의 categories 페이지나 tags 페이지에 맨 위로 가기 버튼 만들어주는 코드가 있는데, 적용해보니 별로 안예뻐서.. 찾아보다가 라이브러리를 발견하였다.

[🔗vanilla-back-to-top](https://www.npmjs.com/package/vanilla-back-to-top) 이다.

### ⚙️ 설치 방법
깃허브 블로그 폴더(git repository 로컬 폴더) 위치에서 터미널에

```bash
npm i vanilla-back-to-top
```

를 입력하여 설치하고, 모든 페이지에 적용하기 위해 `📃default.html` 에

```bash
<script src="https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop({
  diameter: 56,
  backgroundColor: 'rgb(255, 82, 82)',
  textColor: '#fff'
})</script>
```
위 내용을 삽입한다. 해당 라이브러리 페이지에서 [OPTIONS.md](https://github.com/vfeskov/vanilla-back-to-top/blob/v7.2.1/OPTIONS.md)에 커스터마이징 옵션들을 소개하고 있으니 이용하면 되겠다!

소스코드 변경사항은 [8a5c80f](https://github.com/devyuseon/devyuseon.github.io/commit/8a5c80f8f7d67d109216c1d8ccc34637dd7fe8f8) 여기서 확인 가능하다😙

<br>

### ⬇️ 적용 한 모습
![dfdf](https://user-images.githubusercontent.com/67352902/150345794-61e136d0-3afe-460b-8277-9b0cffbc6146.gif)