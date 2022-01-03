---
published: true
title:  "[Github Blog] Jekyll 마크다운 이미지 캡션 달기"
excerpt: "마크다운 문법으론 이미지에 캡션을 달 수 없다. 깃허브 블로그에서 마크다운으로 작성한 글의 이미지에 캡션을 달아보자!😊"

categories:
  - Github Blog
tags:
  - [Github Blog, Markdown]

toc: true
toc_sticky: true
 
date: 2021-12-30
last_modified_at: 2022-01-03
---
<br>

> 환경: Github Pages, Jekyll, minimal-mistakes 테마

블로그 포스팅 시 이미지에 캡션을 달고 싶은데 마크다운 문법으로는 불가능했다. 그러던 중 이에 관한 [레퍼런스](https://stackoverflow.com/questions/19331362/using-an-image-caption-in-markdown-jekyll)를 발견했고, 내 블로그에 적용했다.

# 📍 마크다운 이미지에 캡션 달기

```markdown
![](path_to_image)
*image_caption*
```
이렇게 마크다운을 작성하게 되면

```html
<p>
    <img src="path_to_image" alt>
    <em>image_caption</em>
</p>
```
이런 모습으로 HTML이 생성된다. 여기서 추가로 '캡션' 답게 css를 설정해 줘야 한다.

css 위치는 크게 중요하지 않을 것 같은데, 나는 `_base.scss`에 넣어줬다. (minimal-mistakes 테마)


📃 **_base.scss**
```scss
img + em {
  display: block;
  text-align: center;
  font-size: .8rem;
  color: light-grey;
}
```

# ✨ 적용 된 모습
![image](https://user-images.githubusercontent.com/67352902/147756358-ecf65c6a-2a92-48d2-9d87-277b4a011095.png){: .align-center}
*이렇게 달린다.*

참고로 중앙 정렬을 위해
```markdown
![](path_to_image){: .align-center}
*image_caption*
```
이런 식으로 써줘도 캡션이 잘 달린다. 위의 이미지도 그렇게 작성했다.

<br>

<hr>

블로그에 적용한 변경 사항은 [25c08e9](https://github.com/devyuseon/devyuseon.github.io/commit/25c08e9969a3ab1bc1f9bbfd5dfe01318ae82797) 에서 확인 하실 수 있습니다!

그럼 다들 즐거운 포스팅 하시길 바라며 이만 마치겠습니다🙇‍♀️💕