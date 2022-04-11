---
published: true
title:  "IntelliJ IDEA 에서 빌드시 Command line is too long. Shorten command line for .. 해결"

categories:
  - Trouble Shooting
tags:
  - [IntelliJ, Trouble Shooting]

toc: true
toc_sticky: true
 
date: 2022-04-11 20:47:05
last_modified_at: 2022-04-11 20:47:07
---

# ⚠️ 문제 상황

IntelliJ IDEA Application 실행 시 다음과 같은 오류가 발생했다.

**에러 메시지**:
```text
Error running 'project name':
Command line is too long. Shorten command line for project name or also for Spring Boot default configuration?
```

# 🔮 해결 방법

프로젝트 루트 경로에서 `idea/workspace.xml` 파일을 열어 다음과 같이 코드 한줄을 추가해주면 된다.
```xml
  <component name="PropertiesComponent">
    ...
    <property name="dynamic.classpath" value="true" /> <!-- 추가 -->
    ...
  </component>
```
쉽게 찾으려면 윈도우 사용자는(맥은 잘 모른다) 쉬프트 두번 > files > workspace.xml 검색하면 된다.

<br>