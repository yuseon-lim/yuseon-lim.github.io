---
published: true
title:  "[Github Blog] 깃허브 블로그에 카카오페이,토스 Buy me a coffee 후원버튼 달기"
excerpt: "깃허브 블로그에 카카오페이 송금하기 후원버튼 달기"

categories:
  - Github Blog
tags:
  - [Github Blog]

toc: true
toc_sticky: true
 
date: 2021-12-23
last_modified_at: 2021-12-23
---

> 후원하기 버튼을 달고 싶었는데, 유명한 'buy me a coffee'는 결재 방식이 복잡해 보였다. 카카오페이 QR코드로 송금 링크를 간단히 만들 수 있어 이것을 이용해 후원버튼을 만들어 보았다.

# 카카오페이 송금하기 링크 생성하기

![image](https://user-images.githubusercontent.com/67352902/147112291-bf79c46c-3176-4ae2-afee-b6c6064b3e78.png){: .align-center}

이렇게 하면 송금하기 링크가 복사된다.


# 블로그에 코드로 버튼 삽입하기

[pozafly](https://pozafly.github.io/blog/jekyll-kakao-share-button/)님 블로그를 참고해서 카카오톡 공유하기 버튼을 만들었었는데, 이번에도 같은 방식으로 만들었다.

## 아이콘 가져오기

[w3school](https://www.w3schools.com/icons/fontawesome5_icons_brands.asp) 에서 쓸 아이콘의 이름을 얻어온다. 'fab fa-android' 면 우리는 뒤에 'fa-android' 만 필요하다.

## 📃 _sass/minimal-mistakes/_utilities.scss
아이콘 색상을 지정해준다.

```scss
/* buy me a coffe kakao pay btn */
.fa-coffee {
  color: $background-color;
}
```

## 📃 _sass/minimal-mistakes/_buttons.scss
버튼 색상을 지정한다.
```scss
 /* button colors */
  $buttoncolors:
  ...
  (kakaopay, $link-color),
  ...
```

## 📃 _layouts/single.html
포스팅 페이지 html인 `single.html`에 버튼을 삽입한다.
`<footer>` 에 넣게되면 여기에 걸린 css때문에 너무 작아져서 그냥 `<section>`과 `<footer>` 사이에 넣었다.

```html
<div id="kakao-pay-link-btn">
  <a href="https://qr.kakaopay.com/Ej8Nk2UNL" class="btn btn--kakaopay">
    <i class="fa-fw fas fa-coffee" aria-hidden="true"></i>
      <span>Buy me a coffee ❤️</span>
  </a>
</div>
```

## 📃 _sass/minimal-mistakes/_page.scss
중앙 정렬하고, margin값들을 조정해줬다.
```scss
div#kakao-pay-link-btn {
  text-align: center;
  margin-top: 2em;
}

// 추가로 나는 .page__meta의 위 margin을 제거해 주었다.
```

완성!

![image](https://user-images.githubusercontent.com/67352902/147114537-66fd1f73-d5ed-4110-b807-f91ced42ac87.png){: .align-center}

단점은 모바일에서만 가능하다는 것인데, 후에 PC환경에서도 가능한 수단을 발견하면 추가로 공유해야겠다😊

자세한 변경사항 및 소스코드는 [4ed07fd](https://github.com/devyuseon/devyuseon.github.io/commit/4ed07fd03db69413452a5b7912fe7a746799f6ce) 여기 참고해 주세요 :)


+) 금방 생각이 났다 ㅋㅋ

# 토스로 송금받기

토스에 '토스아이디'라는 기능이 있다.
![ㅇㅇ1 (2)](https://user-images.githubusercontent.com/67352902/147143568-c484d34a-3a28-47a7-9898-799f4e9ff880.png){: .align-center}
여기서 토스 아이디를 설정하고, 링크를 복사한 뒤 똑같이 `href`부분에 넣으면 된다! 그럼 아래 이미지처럼 완성된다😊

![image](https://user-images.githubusercontent.com/67352902/147143983-6ed53774-0df4-4f2e-9ed7-240435ff3385.png){: .align-center}

버튼 너비 맞추려고 '카페' '토스'로 할까 했지만 너비 지정하면 반응형이 안되기 때문에 그냥,, 이렇게 해야겠다:) 혹시 좋은 방법 아시면 소개 해주세용

이에 대한 변경사항 및 소스코드는 [e95c663](https://github.com/devyuseon/devyuseon.github.io/commit/e95c663d4f3fae7ae0b4af48a5fdc8eb46ad5da0) 여기 있습니다~

