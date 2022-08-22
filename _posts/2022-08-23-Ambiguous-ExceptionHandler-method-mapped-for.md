---
published: true
title:  "[Spring] 커스텀 Exception 처리 시 Ambiguous @ExceptionHandler method mapped for"

categories:
  - Trouble Shooting
tags:
  - [Python, Trouble Shooting]

toc: true
toc_sticky: true
 
date: 2022-08-23 02:06:06
last_modified_at: 2022-08-23 02:06:08
---

# ⚠️ 문제 상황

스프링에서 커스텀 에러를 터뜨리기 위해 `@RestControllerAdvice` 나 `@ControllerAdvice` 로 Exception Handler를 직접 만들 때, `@ExceptionHandler(value = XXXException.class)` 어노테이션을 달았을 때

```
Ambiguous @ExceptionHandler method mapped for [~~ XXXException]
```

![](https://drive.google.com/uc?export=view&id=1rCWWFOv32_XP6gfepwfNeUc_XPmDQRYI)

이런 에러가 발생한다.


# 🔎 원인

스프링의 `@ExceptionHandler` 에 이미 위 Exception에 대한 정의가 있어 중복되어 나타나는 현상이다.

# 🔮 해결방법

`@ExceptionHandler` 대신 `@Override` 로 오버라이드 해 사용하면 된다.

# 참고자료

[getting-ambiguous-exceptionhandler-method-mapped-for-methodargumentnotvalidexce](https://stackoverflow.com/questions/51991992/getting-ambiguous-exceptionhandler-method-mapped-for-methodargumentnotvalidexce)


<br>