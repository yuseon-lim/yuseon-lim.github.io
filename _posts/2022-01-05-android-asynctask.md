---
published: true
title:  "[Android] AsyncTask (Java)"
excerpt: "안드로이드 AsyncTask 기본 사용법에 대해 알아보자."

categories:
  - Android
tags:
  - [Android, Java]

toc: true
toc_sticky: true
 
date: 2022-01-05
last_modified_at: 2022-01-05
---
<br>

> ❤️ 내가 보려고 메모하는 AsyncTask 사용법
AsyncTask는 곧 deprecated 되고 RxJAVA와 Corutine으로 대체 될 것이라고 한다. 나처럼 급한 것이 아니라면 RxJAVA, Corutine을 공부하는 것이 더 좋을 것이다.

# 🔥 AsyncTask

## 기본적인 사용법

AsyncTask를 상속(extends) 하면 `onPreExcuted( )`, `doInBackground( )`, `publishProgress( )`, `onProgressUpdate( )`, `onPostExcuted( )` 를 오버라이드 해서 사용하게 된다. 순서는

1.  `execute()` 명령어를 통해 AsyncTask를 실행
2.  백그라운드 작업을 시작하기 전 `onPreExcuted( )` 실행. 이 부분엔 이미지 로딩 작업이라면 이미지를 띄워놓던지 스레드 작업 이전에 수행할 동작 구현
3.  백그라운드 작업 수행. execute() 메소드 호출할 때 사용된 파라미터 전달 받음
4.  `doInBackground( )` 에서 중간 진행 상태를 UI에 업데이트 하도록 하려면 `publishProgress( )` 메소드 호출
5.  `onProgressUpdate( )`는 `publishProgress( )` 호출 될때마다 자동으로 호출됨
6.  `doInBackground( )`에서 작업이 끝나면 `onPostExcuted( )`로 결과 파라미터를 리턴하면서 그 리턴값을 통해 스레드 작업 끝났을 때 동작 구현

**AsyncTask<Params, Progess, Result>**

-   Params: doInBackground 파라미터 타입이 되며, execute 메소드 인자 값이 됨
-   Progess : doInBackground 작업 시 진행 단위의 타입, onProgessUpdate 타입
-   Result : doInBackground 리턴값. onPostExecute 파라미터 타입

그리고 유의할 점은 한번만 실행 가능하므로 다시 실행하려면 다시 `new` 해야 한다.

무언갈 리턴 받아야 한다면, Result 부분에 타입을 명시하고, doInBackground의 리턴 타입을 명시한 뒤에 `.excute().get()` 으로 받아오면 된다.

## 동시(병렬) 실행
```java
// AsyncTask들을 스레드 풀에서 동시(병렬)처리
[task].executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);

// 순차적 처리
[task].executeOnExecutor(AsyncTask.SERIAL_EXECUTOR);
```