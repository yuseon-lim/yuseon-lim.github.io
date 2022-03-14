---
published: true
title:  "Cookie vs Session vs Token(JWT)"
excerpt: "쿠키, 세션, 토큰 인증방식의 차이점을 알아보고 언제 무엇을 선택해야할지 고민해 보자!"

categories:
  - About Dev
tags:
  - [Web]

toc: true
toc_sticky: true
 
date: 2022-03-13 12:17:59
last_modified_at: 2022-03-13 12:18:01
---

<br>

> 스프링 프로젝트에 로그인 기능을 구현해야하는데 로그인 방법도 여러가지가 있다. 그중 어떤걸 선택해야하는지 공부 해 보고 정리 해 보았다.

# 🍪 쿠키 기반 인증
쿠키는 서버에서 만드는 작은 기록 정보 파일이고 우리가 웹사이트에 방문할 때 브라우저에 전송된다. 브라우저는 요청을 저장했다가 서버에 다시 전송하여 동일한 브라우저에서 요청이 온다는 것을 알려주고 사용자 인증을 유지해야한다. 브라우저는 쿠키를 "키-값" 쌍으로 읽는다.


쿠키 기반 인증은 HTTP 쿠키를 사용해 클라이언트 요청을 확인하고 무상태 HTTP 프로토콜을 통해 서버의 세션 정보를 유지-관리 한다.

> **💡 Stateless(무상태)**<br>
> 말그대로 상태 유지가 되지 않는것을 뜻한다. 서버가 클라이언트의 이전 상태를 보존하지 않기 때문에 클라이언트에서 서버에 Request를 보낼 때 모든 정보를 담에 전송해야한다. 상태를 보관하지 않으므로 클라이언트의 요청에 어느 서버가 응답해도 상관 없다는 장점이 있지만 '로그인' 같은 상태 유지가 필요한 경우도 있다.<br>
> 이경우에는 브라우저 쿠키나 서버 세션을 사용해 상태를 유지한다.

## ⏳ 인증 절차

1. 클라이언트가 자격 증명이 포함된 요청을 백엔드 서버에 보낸다.
2. 서버는 자격 증명을 검증한다. 만약 로그인이 성공적이라면 웹서버는 DB에 세션을 생성하고 쿠키 객체에 고유한 ID를 포함하는 응답에 `Set-Cookie` 헤더를 포함한다.
   ```
   HTTP/2.0 200 OK
   Content-Type: text/html
   Set-Cookie: yummy_cookie=choco
   Set-Cookie: tasty_cookie=strawberry

   [page content]
   ```
3. 브라우저는 쿠키를 저장한다. 클라이언트는 로그인 되어 있는 한 모든 Request에 쿠키 정보를 담아 서버에 전송해야 한다. 그럼 서버는 DB에 저장된 것과 쿠키에 저장된 세션ID를 비교해 검증한다.
4. 로그아웃하는 동안 서버는 DB에서 쿠키를 삭제한다.

## 👍 장점

- stateful 한 상태로 만들 수 있다. 사용자의 상태정보를 추적하는 데 용이하다.
- 쿠키의 사이즈가 작기 때문에 클라이언트 사이드에서 정보를 저장하기 부담이 없다.
- 쿠키는 **HTTP** 전용이기 때문에 클라이언트 사이드에서 읽을 수 없다. 따라서 Cross-site-scripting(XSS) 공격에서 안전하다.

> 💡 **Cross-site-scripting(XSS)**<br>
> 해커가 웹사이트에 악성 스크립트를 주입해 악성 스크립트가 포함된 게시글을 열람한 피해자들의 쿠키가 해커에게 전송되고 이를 이용해 해커가 피해자의 브라우저에서 스크립트를 실행해 세션을 가로채거나, 웹사이트를 변조하거나, 악의적인 컨텐츠를 삽입하거나, 피싱 공격등을 행하는 것.

- 쿠키는 요청에 자동적으로 포함되기 때문에 개발자가 이걸 수동으로 구현 할 필요가 적어 용이하다.

## 👎 단점

- Cross-site request forgery attack(CSRF) 공격에 취약하다. 따라서 이를 보안하기 위해 CSRF 토큰을 이용한 다른 방법을 적용해야 한다.

> 💡 **Cross-site request forgery attack(CSRF)**<br>
> 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동을 해 특정 웹페이지를 보안에 취약하게 한다거나 조작하는 작업을 하게 만드는 것.<br><br>
> XSS와 비슷하지만 XSS는 공격 대상이 Client고 CSRF는 Server다.<br>
> XSS: 사이트변조나 백도어를 통해 **클라이언트**에 대한 악성공격을 함
> CSRF: Request를 위조해 사용자의 권한을 사용해 **서버**에 대한 악성공격을 함

- DB에 세션 데이터를 저장하거나 서버 메모리에서 유지해야 한다. 이는 확장성이 떨어지고 웹사이트에 많은 유저들이 들어올 경우 오버헤드가 증가한다.
- 쿠키는 용량 제한이 있어 담을 수 있는 정보에 제한이 있다.
- 웹브라우저 마다 쿠키에 대한 지원 형태가 다르기 때문에 브라우저간 공유가 불가능하다.

# 🕯️ 세션 기반 인증

세션기반 인증은 Session과 Cookie가 사용된다. 쿠키를 통해 클라이언트 로그인 상태를 유지할 수 있었지만, 가장 큰 단점은 개인정보를 HTTP로 주고받기 때문에 보안에 취약하다는 점이다.

세션은 비밀번호 등 클라이언트의 인증정보를 쿠키가 아닌 서버에 저장한다.

```
HTTP/1.1 200
Set-Cookie: JSESSIONID=FDB5E30BF20045E8A9AAFC788383680C;
```

## ⏳ 인증 절차

1. 유저가 로그인을 하고 세션이 서버 메모리 상에 저장된다. 이때 세션을 식별하기 위한 Session ID를 기준으로 정보를 저장한다.
2. 브라우저에 쿠키로 Session ID가 저장된다.
3. 쿠키에 정보가 담겨있기 때문에 브라우저는 해당 사이트에 대한 모든 Request에 Session ID를 쿠키에 담아 전송한다.
4. 서버는 클라이언트가 보낸 Session ID와 서버 메모리로 관리하고 있는 Session ID를 비교하여 인증한다.
5. 로그아웃 시 서버의 세션정보를 삭제하고 클라이언트의 쿠키를 갱신한다.

## 👍 장점

- 쿠키를 포함한 Request가 외부에 노출되더라도 쿠키 방식과 달리 Session ID 자체는 유의한 개인정보를 의미하지 않는다.
- 각 사용자마다 고유한 Session ID가 발급되기 때문에 요청이 들어올 때마다 회원정보를 확인 하지 않아도 된다.
- 개발자가 구현하기 명확해서 좋다.

## 👎 단점

- 멀티 디바이스 환경에서 로그인 시 구현이 쉽지 않다.
- 서버 메모리에 유저들의 세션에 대한 정보를 유지해야 한다는 부담이 있다.
- 여전히 Session ID를 해커가 가로채 클라이언트인 척 위장할 수 있다는 위험이 있다.
- 서버에서 세션 저장소를 사용하기 때문에 요청이 많아지면 서버의 부하가 심해진다.

# ⚡ 토큰 기반 인증 - JWT

토큰 기반 인증에서는 유저 상태를 클라이언트에 저장한다. **JSON Web Token (JWT)** 는 클라이언트-서버간 JSON 객체를 이용해 안전하게 전송하는 방법이다.

[`jwt.io`](https://jwt.io/) 를 이용해 JWT 토큰을 인코딩, 디코딩 한다.

## 🛠️ JWT 토큰 구성

**JWT Token 예:**
![](https://tecoble.techcourse.co.kr/static/50692d28ac56af0c30039d81eaebeb01/244f0/2021-05-22-jwt-total.png){: .align-center}

.로 구분짓는 세가지 문자열의 조합이다. 세 부분은 각각 JWT header, JWT payload, signature(secret key를 포함해 암호화 되어있음 을 의미한다.

이것을 디코딩 한 결과는 다음과 같다.

**Header:**

```json
{
   "alg": "HS256",
   "typ": "JWT"
}
```

JWT 헤더는 토큰의 타입과 사용되는 알고리즘 (HMAC, SHA256, RSA)에 대한 정보를 담는다.

**Payload:**

```json
{
   "sub": "1234567890",
   "name": "John Doe",
   "admin": true
}
```

JWT Payload는 토큰에 담을 클레임(claim) 정보를 포함하고 있다. Payload에 담는 정보의 한 '조각'을 클레임이라고 부르고, 이는 name-value 한 쌍으로 이루어져 있다. 토큰에는 여러개의 클레임을 넣을 수 있다.

클레임의 정보는 등록된(registered) 클레임, 공개(public) 클레임, 비공개(private) 클레임으로 세 종류가 있다.

**Signatre:**

```json
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

`HMAC SHA256` 알고리즘을 이용해 JWT 토콘을 만든다는 내용이다. Header와 Payload는 단순히 인코딩 된 값이기 때문에, 제 3자가 복호화 및 조작을 할 수 있지만, Signature는 서버측에서 관리하는 비밀 키가 유출되지 않는 이상 복호화 할 수 없다. 따라서 Signature는 토큰의 위변조 여뷰를 확인하는 데 사용된다.

## ⏳ 인증 절차

1. 클라이언트 로그인 요청이 들어오면, 서버는 검증 후 클라이언트 고유 ID등의 정보를 Payload에 담는다.
2. 서버는 암호화된 비밀키를 이용해 JWT 토큰을 생성하고 클라이언트에 이를 전송한다.
3. 클라이언트 사이드에서 브라우저는 local storage, session storage 또는 cookie storage를 이용해 토큰을 저장한다.
4. 이후 요청 시에 JWT는 **bearer**에 의해 헤더 접두사에 인증정보를 추가하고 서버는 응답을 보내기 전에 디코딩 된 토큰을 이용해 signature를 검증한다. 헤더는 이런 모양이다:
   ```
   Authorization: Bearer <token>
   ``` 
5. 로그아웃 시에 서버와의 교류 없이 클라이언트의 토큰은 파기된다.


## 👍 장점

- 토큰은 무상태로 접근한다. 웹서버는 토큰의 유효성을 확인하고 클레임(Payload에 있음)을 통해 사용자 정보를 전달하는데 필요한 데이터를 포함해 각각이 JWT에 모두 포함되므로 토큰에 대한 기록을 별도로 할 필요가 없다. 서버는 로그인 성공 시에 토큰에 서명하고 Request에서 들어오는 토큰이 유효한지만 확인하면 된다.
- 분산 시스템에서의 확장성이 우수하다.
- 토큰 기반으로 다른 로그인 시스템에 접근 및 공유가 가능하다.
- OAuth의 경우 Facebook, Goole 등 소셜 계정을 이용해 다른 웹서비스에서도 로그인을 할 수 있다.
- JSON 기반이기 때문에 REST API에서도 잘 동작하는것이 아주 큰 장점이다.
- CORS가 활성화 된 토큰 기반 인증방식을 사용하면 API를 다른 서비스 및 도메인에 쉽게 노출 할 수 있다. 이는 API가 IOS와 안드로이드와 같은 웹 플랫폼과 모바일 플랫폼을 모두 지원할 수 있고 구현이 훨씬 쉬워 모바일과의 호환성이 좋다.
- 어느 타입인지에 무관하게 JWT에 정보를 저장 할 수 있어 확장성이 좋다.

## 👎 단점
- JWT는 토큰의 길이가 길어, 인증요청이 많아질수록 네트워크 부하가 심해진다.
- Payload자체는 암호화 되지 않기 때문에 유저의 중요한 정보는 담을 수 없다.
- 토큰을 따로 서버에서 저장하거나 하지 않기 때문에 토큰을 탈취당하면 추척하기 어렵다.
- 토큰은 한번 발급되면 유효기간이 만료 될 때까지 사용 가능하기때문에 꼭 유효기간을 설정해 주어야 한다.
- 특정 사용자의 접속을 강제로 만료하기 어렵다.


# 📃 참고자료
- [https://velog.io/@duarufp06/HTTP-Stateless-Connectionless-HTTP-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B0%9C%EB%85%90](https://velog.io/@duarufp06/HTTP-Stateless-Connectionless-HTTP-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B0%9C%EB%85%90)
- [https://www.section.io/engineering-education/cookie-vs-token-authentication/](https://www.section.io/engineering-education/cookie-vs-token-authentication/)
- [https://nordvpn.com/ko/blog/xss-attack/](https://nordvpn.com/ko/blog/xss-attack/)
- [https://gorokke.tistory.com/181](https://gorokke.tistory.com/181)
- [https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/](https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/)

<br>