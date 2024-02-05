---
title: "[TroubleShooting] express가 응답을 보내지 않았다. 왜..?"
description: 에러가 발생하지 않았는데, 클라이언트는 서버의 응답을 받지 못했다. 이유를 찾아보자 !
authors: yuseonLim
tags:
  - troubleshooting
  - express
  - nginx
hide_table_of_contents: false
---

## 문제 상황

문제 상황이 무엇인지 설명하기 전에, 우리 서비스는 파일을 `등록` 하는 기능이 있고, 똑같은 파일을 중복으로 등록할 수 없다. 중복 등록을 시도할 경우엔 메세지가 뜨며 등록이 안된다.

그런데 사용자로부터 이런 연락을 받았다.

> 파일을 업로드 하고, `등록` 버튼을 눌렀는데 **등록에 실패** 했다는 메시지가 떴습니다.<br/>
> 그래서 다시 등록을 시도했는데, **중복 등록** 이라고 하며 등록이 되지 않았습니다. <br/>
> 확인해보니 처음에 등록한 리포트가 잘 등록이 되어 있네요?

그러니까, 실패했다는 메세지가 떴는데 실제론 성공했다는 거다.

## 증상 파악

![](../static/img/post-img/diagram1.png)


등록 기능 프로세스는 이렇다. express에서 요청을 전달하고, spring에서 등록 과정을 수행하고, 그것을 다시 express에 넘기고, express는 클라이언트에 완료를 전달한다.


로그를 살펴보니, **express가 client로 등록 완료 전달** 하는 부분 외에는 모두 success, 200으로 에러 없이 잘 수행되었다.


![](../static/img/post-img/diagram2.png)
 
 
 **express가 client로 등록 완료 전달** 하는 부분은 ? 로 남았다. 이런 로그를 발견했기 때문이다.

```
[시간] "POST /api/*** HTTP/1.1" - - "출처" "클라이언트 정보" - - ms
```

이 로그는 express의 [morgan](https://expressjs.com/en/resources/middleware/morgan.html) 미들웨어가 남긴 로그이다. 원래라면 아래처럼 응답시간, 응답크기, 걸린시간이 표시 되어야 한다.

```
[시간] "POST /api/*** HTTP/1.1" 200 49 "출처" "클라이언트 정보" - 317.922 ms
```

뭔가 응답이 정상적으로 처리되지 않은 듯 했다.

그러나 미스테리인 점은 .. express가 `await` 으로 spring의 응답을 기다리고, 그 뒤에 성공했을땐 로그를 남기게 되어 있는데, 그 로그는 남았다는 것이다.

express에 에러는 없었고, spring에도 에러는 없었는데, 클라이언트에 응답 전송만 정상적으로 되지 않았다.

찾아보니, 위 -- 로 처리된 로그는 express가 응답 자체를 하지 않았을 때 일어나는 일이라고 한다.
> https://stackoverflow.com/questions/39728057/no-request-status-in-node-js-morgan-logging
> https://github.com/expressjs/morgan/issues/121

위 링크에서 추정한 원인은 다음과 같다.

:::tip[아마도..]

response를 보내기 전에 TCP 연결이 끊어진 듯!

:::

로그 시간을 파악해보니 클라이언트 요청 ~ spring의 응답 까지는 1분 5초 내외로 소요되었다.


그렇다면 어디서 TCP 연결을 해제했을까?

## 원인 파악

내가 의심한 것들은 다음과 같다.

- axios timeout
- node.js timeout
- OS의 TCP timeout
- L4 스위치 timeout
- Nginx timeout

### axios timeout

따로 설정한 것이 없다. [default는 no timeout](https://github.com/axios/axios/blob/main/README.md#request-config) 이다.

### node.js timeout

노드13 버전 이후로는 no timeout이다.

노드8 버전을 쓰는 우리 프로젝트는 120s가 기본으로 설정 되어 있다. (처음알았다 ..)
>https://nodejs.org/api/http.html#servertimeout

그러나 2분 보다 오래 걸리진 않았으므로 이것도 아니다.

### OS의 TCP timeout

```
cat /proc/sys/net/ipv4/tcp_keepalive_time
```

- tcp_keepalive : tcp 연결이 되고 나서 얼마나 그 연결을 지속하는지

7200(2시간) 으로 널널했다.

### L4 스위치

L4 에서도 뭔가 타임아웃이 걸려있는것은 아닐까..? 하고 해당 사항을 인프라팀에 문의했는데

아니다. (~의심해서 죄송합니다...~)

전에도 L4 설정 문제때문에 안된 기능이 있어서, 생각났었는데 .. 어쨌든 이게 문제는 아니였다.

### Nginx timeout

```js title="/etc/nginx/nginx.conf"
keepalive_timeout 65; // default 75
```

여기였다 !!

keepalive_timeout이 65초로 설정 되어 있었다. 지금껏 Nginx 설정을 바꿀 일이 없어서 자세히 들여다 보지 않아서 몰랐다.

이 사실을 알고 난 뒤 nginx 에러 로그를 보니 (로그 경로는 nginx.conf 에 있다.)

```text title="error.log"
[error] upstream timed out (110: Connection timed out) while reading response header from upstream .. 생략
```

connection timeout 에러 로그가 찍혔다.

spring이 express로 응답을 보내, express가 client에 응답하기 전에 client와 express간의 연결이 끊어져 client가 응답을 받지 못한 것이다.

## 해결

해결 방법으로는 이런 것들이 있겠다.

- timeout 늘리기
- upstream인 spring 서버의 처리 성능 향상하기 (best)

그리고 nginx 로그는 도커 컨테이너 안에 있어서, 컨테이너가 내려가면 로그 파일이 날아가 볼 수 없다.
도커 컨테이너에서 쌓은 로그는 volume으로 연결해 host에도 쌓게 해놨다. nginx 로그도 표준 출력으로 내보내 (/dev/stdout 으로 심볼릭 링크 걸기) 도커가 로그를 수집하게 하거나 nginx 로그를 volume으로 설정해 보관 할 필요가 있다.

일단 timeout을 늘려서 급한 불을 끄고, spring 서버의 처리 성능을 높일 방법을 생각 해 볼 것이다.

적고보니 별일 아닌 듯 하지만,, 의미 있었던 과정이였다.

이 이슈로 인해 우리 서비스의 어떤 부분에 timeout이 얼만큼 걸려있는지 확인 할 수 있었고, 로그도 좀 더 보충할 수 있었다. 다음에 이러한 일이 발생하면 이 경험으로 인해 원인 파악을 조금은 빨리 할 수 있을까 기대해보며 글을 마친다.