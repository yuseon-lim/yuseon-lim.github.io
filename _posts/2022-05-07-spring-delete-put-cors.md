---
published: true
title:  "[Spring] PUT, DELETE시 CORS 에러 발생"
excerpt: ""

categories:
  - Spring
tags:
  - [Spring]

toc: true
toc_sticky: true
 
date: 2022-05-07 14:52:27
last_modified_at: 2022-05-07 14:52:32
---

# ⚠️ 문제 상황

![image](https://user-images.githubusercontent.com/67352902/167240697-a30e0706-693c-4e8a-844d-0e6b34c6cd2e.png){: .align-center}
*리엑트(:3000)에서 CORS에러가 발생했다.*

리액트(3000)에서 스프링(8080) api를 참조할때 발생하는 CORS에러를 방지하고자 `WebMvcConfigurer` 인터페이스를 구현해 특정 Origin에 대한 접근을 허용 해 놓았었습니다.

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000");
    }

}
```

그런데 DELETE 를 사용하는 API에서는 CORS 에러가 발생했습니다.

# 🔍 원인 찾기

![image](https://user-images.githubusercontent.com/67352902/167241640-443a7770-3381-4b97-91d7-8d7fa02d30e4.png){: .align-center}

*CorsRegistry* 의 `addMapping()`을 보니 *CorsRegistragion* 을 new로 생성했고, *CorsRegistration* 의 생성자에선 *CorsConfiguration* 의 `applyPermitDefaultValues()` 를 호출하는것을 볼 수 있었습니다.

![image](https://user-images.githubusercontent.com/67352902/167242802-b5b83fb4-e388-407a-853e-6abd1f7bdfa8.png){: .align-center}
*CorsConfiguration.java*
![image](https://user-images.githubusercontent.com/67352902/167242837-2d0f7441-3fae-4edd-837f-1417b5665593.png){: .align-center}
*CorsConfiguration.java*

`applyPermitDefaultValues()` 메소드가 있는 CorsConfiguration.java에서는 **allowedMethod** 설정을 하지 않은 경우 DEFAULT_PERMIT_METHODS 가 디폴트로 적용되는데, 이는 GET, HEAD, POST만 허용하는것을 볼 수 있습니다.

그래서 PUT이나 DELETE에서는 에러가 발생한 것입니다.

# 🔮 해결 방법

따라서 allowedMethod를 수동 설정 해주면 되는데, allowedMethod를 추가할 경우 DEFAULT 설정도 사라지기 때문에 GET, HEAD, POST에 대해서도 허용 설정을 해줘야 합니다.

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name());
    }

}
```