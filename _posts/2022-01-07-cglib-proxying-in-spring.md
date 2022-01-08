---
published: true
title:  "[Spring] @Configuration 클래스의 CGLIB 프록싱에 대해"
excerpt: ""

categories:
  - Spring
tags:
  - [Spring, Java]

toc: true
toc_sticky: true
 
date: 2022-01-07
last_modified_at: 2022-01-07
---

# 스프링의 Singleton(싱글턴)

스프링 빈은 싱글턴이 되도록 보장해준다. 이유는 **CGLIB**라는 라이브러리가 `@Configuration` 을 적용한 클래스를 상속받은 임의의 다른 클래스를 만들어 그 클래스를 스프링 빈으로 등록했기 때문이다. 이 포스팅에서는 CGLIB가 조작한 결과가 어떻게 되는지 예제를 통해 알아보고 몇가지 지켜야 하는 규칙들에 대해 소개한다.

> Java By Examples의 [CGLIB Proxying in Spring @Configuration](http://www.javabyexamples.com/cglib-proxying-in-spring-configuration)를 번역한 것이며 부족한 영어 실력으로 인해 제 맘대로 의역을 하였으니 오역이 있다면 알려주시면 감사하겠습니다 🙏

# 1. 개요

이 튜토리얼에서는, 우리는 스프링의 `@Configuration` class들의 **CGLIB proxying**에 대해 얘기할 것이다. 주로 몇가지 예제를 살펴보고,  `@Bean` 메서드 에서 *final*을 피하는 것과 같은 개발 규칙을 살펴볼 것이다.

# 2. 예제

첫번째 예제이다.

*PostRepository* 와 그것의 구현체인 *DefaultPostRepository*가 있다.
```java
public interface PostRepository {

    void save();
}

public class DefaultPostRepository implements PostRepository {

    @Override
    public void save() {
        System.out.println("Saving...");
    }
}
```

그리고 *PostService* 클래스와 그것의 단 하나의 구현체인 *DefaultPostService* 가 있다.

```java
public interface PostService {

    void save();
}

public class DefaultPostService implements PostService {

    private final String name;
    private final PostRepository postRepository;

    @Autowired
    public DefaultPostService(String name, PostRepository postRepository) {
        this.name = name;
        this.postRepository = postRepository;
    }

    @Override
    public void save() {
        // Do work
    }
    
    // Getters...
}
```

# 3. CGLIB 프록싱은 무엇인가?

프록싱 메커니즘에 대해 자세히 다루기 위해선, 먼저 bean을 정의하기 위해 `@Configuration` 클래스를 만들어야 한다.

```java
@Configuration
public class ApplicationConfiguration {

    @Bean
    public DefaultPostRepository postRepository() {
        return new DefaultPostRepository();
    }

    @Bean
    public DefaultPostService firstPostService() {
        return new DefaultPostService("First", postRepository(), logService());
    }

    @Bean
    public DefaultPostService secondPostService() {
        return new DefaultPostService("Second", postRepository(), logService());
    }
}
```

*postRepository*, *firstPostService*, *secondPostService* 이렇게 세 개의 빈이 정의되었다. *DefaultPostService* 인스턴스를 만들 때, `postRepository()` 메서드를 부른다는 것을 기억해둬라. 첫번째로, 이것은 마치 세 개의 다른 *PostRepository* 인스턴스로 끝나는 것으로 보인다. 하지만 반대로, 컨테이너에는 단 하나의 *PostRepository* 빈만 존재한다 :


```java
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = ApplicationConfiguration.class)
public class ApplicationConfigurationTest {

    @Autowired
    private ApplicationContext context;

    @Test
    public void testThatThereIsSinglePostRepository() {
        final PostRepository postRepository = context
          .getBean("postRepository", PostRepository.class);
        final DefaultPostService firstPostService = context
          .getBean("firstPostService", DefaultPostService.class);
        final DefaultPostService secondPostService = context
          .getBean("secondPostService", DefaultPostService.class);

        assertThat(firstPostService.getPostRepository()).isEqualTo(postRepository);
        assertThat(secondPostService.getPostRepository()).isEqualTo(postRepository);
    }
}
// first와 second 모두 같은 PostRepository를 참조하고 있는 것을 볼 수 있다.
```

스프링에서 `@Configuration` 클래스의 메서드 호출은 일반적인 자바의 의미를 따르지 않는다. 우리가 *postRepository()*를 세번 부를 때, 세번 다 새로운 *PostRepository*를 만들지 않는다. 이건 **스프링이 `@Configuration` 클래스들 주위에 CGLIB 프록시를 만들기**때문 이다. 호출은 우리가 새로운 빈을 만들기 전에 컨테이너를 확인할 때 intercept 된다.

다시 말하자면, 우리가 *postRepository()* 를 세번 호출하면, 첫번째 호출만 스프링 빈을 생성한다는 것이다. 다른 호출들은 컨테이너에 있는 기존 빈들만 가져온다. 이것은 개발자 입장에서 매우 편리하다. (스프링이 자동으로 Singleton을 보장해준다!!)

# 4. CGLIB 프록싱이 작동하는 규칙

우리는 이제 CGLIB 프록싱이 작동하는것을 보았고, 다음으로는 내부적으로 어떤 규칙이 연관되어 있는지 살펴볼것이다.

첫번째로, CGLIB 프록싱은 **상속**을 통해 작동한다. 상속이 되기 위해선, 우린 반드시 몇가지 자바 규칙을 따라야 한다:
- `@Configuration` 클래스는 *final*이 되면 안된다.
- `@Bean` 메서드는 *final*이 이 되면 안된다.
- `@Bean` 메서드는 *private*이 되면 안된다.

```java
@Configuration
public /*final*/ class ApplicationConfiguration {

    @Bean
    /*private*/ public /*final*/ DefaultPostRepository postRepository() {
        return new DefaultPostRepository();
    }
}
```

*private*과 *final* 는 주석처리했다.

예를들어, 우리가 *postRepository()* 메서드에 대해 *final*을 붙이면, 스프링은 이런 예외를 던진다:
```java
org.springframework.beans.factory.parsing.BeanDefinitionParsingException: Configuration problem: @Bean method 'postRepository' must not be private or final; change the method's modifiers to continue
```

## 4.1 정적 `@Bean` 메서드

마지막으로 정적 `@Bean` 메서드에 대해 살펴볼 것이다.

우리가 `@Bean`을 static 으로 선언하면, 스프링은 `@Configuration`으로 둘러싼 클래스를 초기화 할 필요가 없어진다. 이 행동은 *BeanPostProcessors* 클래스와 같은 몇가지의 경우엔 편리하다. 자바는 static 메서드에 대해 오버라이딩을 허용하지 않기 때문에, CGLIB proxying은 *static bean definition(정적 빈 정의)* 에 대해선 작동하지 않는다.

예제를 살펴보자. *LogService* 클래스가 있다:
```java
public class LogService {

    public void log(){
        System.out.println("Logging...");
    }
}
```

`@Configuration` 클래스에는 빈을 static method로 정의할 것이다:
```java
@Bean
public static LogService logService(){
    return new LogService();
}
@Bean
public DefaultPostService firstPostService() {
    return new DefaultPostService("First", postRepository(), logService());
}
@Bean
public DefaultPostService secondPostService() {
    return new DefaultPostService("Second", postRepository(), logService());
}
@Bean
public DefaultPostRepository postRepository() {
    return new DefaultPostRepository();
}
```

여기, 우리는 *DefaultPostService* 빈들을 정의할 때, *logService()*를 부르게 된다.(*postRepository()*에서 처럼)

이 설정이 끝난 뒤엔, 스프링은 세개의 인스턴스의 *LogService* 를 생성할 것이다.

```java
@Test
public void testThatThereAreMultipleLogService() {
    final LogService logService = context.getBean("logService", LogService.class);
    final DefaultPostService firstPostService = context
      .getBean("firstPostService", DefaultPostService.class);
    final DefaultPostService secondPostService = context
      .getBean("secondPostService", DefaultPostService.class);
    assertThat(firstPostService.getLogService()).isNotEqualTo(logService);
    assertThat(secondPostService.getLogService()).isNotEqualTo(logService);
    assertThat(firstPostService.getLogService()).isNotEqualTo(secondPostService.getLogService());
}
// CGLIB 프록싱이 작동했다면, logService 빈은 싱글톤으로 생성 되었어야 한다.
// 각 PostService에 대해, 다른 logService가 들어간 것을 볼 수 있다.
```

# 5. CGLIB 프록싱 해제하기

[Spring Framework 5.2](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-52)에 따르면, 빈 메서드에 대해 proxying을 해제 할 수 있다. *proxyBeanMethod* 속성을 *false* 로 주면, 스프링은 `@Bean`메서드를 부를 때 intercept 하지 않는다.

```java
@Configuration(proxyBeanMethods = false)
public class ApplicationConfiguration {
...
}
```
