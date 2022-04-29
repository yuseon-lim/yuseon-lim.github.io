---
published: true
title:  "[Github Blog] 깃허브 블로그 사이드바 스크롤바 숨기기"
excerpt: "못생긴 스크롤바 바이바이"

categories:
  - Github Blog
tags:
  - [Github Blog]

toc: true
toc_sticky: true
 
date: 2022-04-29 13:28:30
last_modified_at: 2022-04-29 13:28:33
---

<br>

카테고리 있는 사이드바의 오른쪽에 큰 스크롤바가 있어 블로그 본문이 아주 답답해 보였어요.

스크롤바가 있었던 모습도 캡쳐하고 싶었는데 쿠키때문인지 그 전 모습을 캡쳐 할 수가 없네요.. ㅎ

아무튼 그것을 없애봤습니다.

![image](https://user-images.githubusercontent.com/67352902/165885388-14d38df7-2e4f-4c30-9589-bdc10f52b866.png){: .align-center}
*원래는 사이드바 오른쪽에 못생기고 큰 스크롤바가 있었다.*

**📄 _layouts/default.html**
```css
/* 사이드바 스크롤바 없애기 */
.sidebar{ -ms-overflow-style: none; }
.sidebar::-webkit-scrollbar{ display:none; }
```

위치는 상관없고, `.sidebar`의 css가 적용되는 곳이면 됩니다. 저는 **defulat.html**의 `<style>` 태그 안에 넣어주었네요.

깃허브 블로그 말고도 다른 모~든 웹사이트에 적용 되는 내용이니까 적용하셔서 깔끔한 웹페이지를 만들어 봅시다 (물론 필요한 곳엔 스크롤바가 있어야겠죠!)

해당 변경사항 소스코드는 [✨여기서✨](https://github.com/devyuseon/devyuseon.github.io/commit/579379ab35e2008d34ab9186d63b4e0728034c68#diff-907a69846a1f6b238f1c43199984197d12c7eab26f3c3adcd45d628b26644950R58-R60) 확인 하실 수 있습니다 :) 감사합니다🙃