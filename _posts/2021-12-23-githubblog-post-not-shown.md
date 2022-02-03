---
published: true
title:  "[Github Blog] 깃허브 블로그 포스팅 게시 안됨 해결"
excerpt: "내 로컬 서버에서는 반영이 되었지만 실제 Github Pages엔 반영이 안되었다. 그리고 해결했다..😭"

categories:
  - Github Blog
tags:
  - [Github Blog, Trouble Shooting]

toc: true
toc_sticky: true
 
date: 2021-12-23
last_modified_at: 2022-02-03
---

# ⚠️ 문제 상황

`_posts` 에 `.md`파일을 추가했지만 실제 내 블로그에 글이 안올라왔다. 내 로컬 서버 (localhost:4000) 에는 올라왔는데, push 한 뒤 실제 페이지엔 글이 보이지 않았다.

파일 이름과 카테고리등을 백번 확인했지만 글이 올라오지 않았다..

며칠 공들여서 꾸며놨는데 글이 안올라와서 깃허브 블로그를 포기해야 한다니 너무 슬펐다..🥲 지푸라기 잡는 심정으로 짧은 영어로 열심히 검색하여 이것저것 시도 한 끝에 해결했다.

<br>

# 🔮 해결 방법

📍 아래 항목들을 체크해본다. 여기 아래 내용들은 기본적으로 지켜야 할 것들.

- [X] `YEAR-MONTH-DAY-title.md` 파일 제목 형식을 확인한다.
- [X] 포스팅 날짜 맞게 입력했는지 확인한다.
- [X] `_post` 폴더에 맞게 위치해 있는지 확인한다.
- [X] 카테고리 맞게 입력 했는지, 해당 카테고리 존재하는지 확인해본다.

<br>
  
📍 그리고 별짓 다해도 안되어서 스택오버플로우 뒤져서 시도해 본 것들..

- [X] `_config.yml`에 `futrue: true` 추가해본다.
- [X] 페이지 옵션(타이틀, 카테고리 적는곳)에 `published: true` 추가해본다.
- [X] `index.html`에 공백이라도 추가해 변경사항 만들고 push (효과 봤다는 사람이 있다 ㅋㅋ)
- [X] `jekyll build --verbose` 로 Skipping 된 것 있나 확인해본다.

<br>

필자는 futrue: true랑 published: true 추가하고 해결했다. 해당 변경사항 -> [6dba5ff](https://github.com/devyuseon/devyuseon.github.io/commit/6dba5ffbdf72f861fb471d03bb9d5bdc7029a2ac)

혹시 위 항목들을 해봐도 해결이 되지 않는다면 아래 '참고자료'에 링크한 스택오버플로우 글들을 살펴보는 것을 추천한다:)

똑같은 상황에서 이 포스팅을 발견하시는 모든분들에게 조금이라도 도움이 되길..🙏

<br>

# 참고자료

- [jekyll-post-not-generated](https://stackoverflow.com/questions/30625044/jekyll-post-not-generated)
- [github-pages-are-not-updating](https://stackoverflow.com/questions/20422279/github-pages-are-not-updating)
- [jekyll-not-generating-posts](https://stackoverflow.com/questions/16990138/jekyll-not-generating-posts)