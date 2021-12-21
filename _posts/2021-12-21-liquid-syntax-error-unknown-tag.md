---
title:  "[Github Blog] Liquid Exception: Liquid Syntax Error: Unknown tag 해결"
excerpt: "리퀴드 언어 쓴 적도 없는데 리퀴드 문법 오류가 뜬다 -> 해결!"

categories:
  - Github Blog
tags:
  - [Github Blog, Trouble Shooting]

toc: true
toc_sticky: true
 
date: 2021-12-21
last_modified_at: 2021-12-21
---

# ⚠️ 문제 상황

![image](https://user-images.githubusercontent.com/67352902/146870361-31be4c2d-298d-485d-8486-e7fc573f5de4.png){: .align-center}

깃허브 블로그 포스팅 하면서, 리퀴드 언어를 쓴 적도 없는데 리퀴드 문법 오류가 뜨면서 포스팅이 안된다.

# 📌 원인

Flask에서 넘어온 데이터를 html에서 쓰려고 `{% raw %}{% %}{% endraw %}` 안에 코드를 넣었는데 이게 리퀴드로 인식이 되었던 것이였다.

```html

<td>{% raw %}{% print(key) %}{% endraw %}</td>
<td>{% raw %}{% print(dict[key]) %}{% endraw %}</td>
```
이 부분이다.

# 🔮 해결 방법

문제가 된 부분 앞뒤에 {&#37; raw &#37;} 와 {&#37; endraw &#37;} 를 붙여주면 된다.
![image](https://user-images.githubusercontent.com/67352902/146872155-f4a0ee72-7176-4cf2-b938-4427f8865693.png){: .align-center}
