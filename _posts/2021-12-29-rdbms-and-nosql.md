---
published: true
title:  "SQL vs NoSQL (관계형DB vs 비관계형DB)"
excerpt: "SQL과 NoSQL이 무엇인지, 어떤 데이터베이스를 선택해야 할 지 알아본다."

categories:
  - Database
tags:
  - [Database, RDBMS, SQL, NoSQL]

toc: true
toc_sticky: true
 
date: 2021-12-29
last_modified_at: 2022-01-03
---

<br>

요즘 NoSQL을 사용하는 기업들이 많아지고 있다. Facebook, Twitter, Netflix, Instagram, Apple의 iCloud 등 많은 기업들이 NoSQL을 채택했다. 왜 NoSQL을 사용할까? 그럼에도 불구하고 SQL(관계형DB)는 여전히 주류 DB로 통용된다. 두 데이터베이스는 무엇이 다르고 어떤 경우에 무엇을 채택해야 할까?

# Database, DBMS

📍 **Database**
- 관련된 데이터의 모임 또는 집합
- 정형화되고 조작 가능한(처리하기에 용이한) 컴퓨터에 저장된 데이터의 모임
- 특정 목적을 위해 계산, 저장, 검색, 정렬 등의 "데이터 처리" 작업을 수행
- 한마디로, 어떤 특정 조직의 응용 시스템에 사용되는 조작 가능한 저장 데이터의 모습

📍 **DBMS**
- DBMS, DataBase Management System의 약자.
- 컴퓨터에 저장되는 데이터베이스를 관리해주는 소프트웨어 시스템
- 종류
  - Oracle, MySQL, PostgresSQL ...

<br>

# SQL: 관계형 DB
데이터를 Row(필드, field)와 Column(레코드, record)이라는 일종의 이차원 테이블 형태로 저장한다. 각 테이블/관계는 하나의 엔티티 타입을 대표, 로우는 그 엔티티 종류의 인스턴스를 대표, 컬럼은 그 인스턴스의 속성이 되는 값들 대표한다.

- 신뢰성이 높고 데이터의 분류, 정렬, 탐색 속도가 빠름
- 그 어떤 상황에서도 무결성을 보장
- 관계를 나타내기 위해서 '외래 키(foreign key)' 사용
- 외래키 이용한 테이블 간 Join이 가능한 것이 특징
- SQL을 이용하는 DBMS는 ACID 트랜잭션을 준수해야 한다.

> 🤖 **무결성이란?**
> 
> 완전한 수명주기를 거치며 데이터의 정확성과 일관성을 유지하고 보증하는 것

> 🤖 **ACID (Atomic, Consistency, Integrity, Duarabity)**
> 
> 데이터 트랜잭션이 안전하게 수행된다는 것을 보장하기 위한 성질

<br>

# NoSQL: 비관계형 DB
NoSQL, Not Only SQL 또는 non SQL, non relation 의미한다. 기존 관계형DB보다 더 융통성 있는 데이터 모델을 사용하고, 데이터의 저장 및 검색을 위한 특화된 매커니즘을 제공한다.

- 관계형DB 와는 달리 테이블 정의 X. 데이터 테이블은 그냥 하나의 테이블이며 테이블 간 관계를 정의하지 않아 일반적으로 테이블간 Join 불가능
- 비 SQL 인터페이스를 통한 데이터 액세스
- 대부분 여러 대의 데이터베이스 서버를 묶어(클러스터링) 하나의 데이터베이스 구성
- Data처리 완결성(Transaction ACID 지원) 미보장
- 데이터베이스의 중단 없는 서비스와 자동 복구 기능 지원
- 확장성, 가용성, 높은 성능

## NoSQL 종류
NoSQL은 저장되는 데이터 구조에 따라 다양하게 분류 할 수 있다.

- Key Value DB
  - Key와 Value의 쌍으로 데이터가 저장되는 가장 단순한 형태의 솔루션
- Wide Columnar Store
  - Big Table DB라고도 하며, Key Value 에서 발전된 형태의 Column Family 데이터 모델 사용
- Document DB
  - JSON, XML과 같은 Collection 모델 구조 채택
- Graph DB
  - Nodes, Relationship, Key-Value 데이터 모델 채용

![image](https://user-images.githubusercontent.com/67352902/147574623-f8abfada-0464-4898-8167-a73dc858e439.png){: .align-center}

## 종류별 성능

![image](https://user-images.githubusercontent.com/67352902/147574730-3df040ec-0f06-4dde-a8b8-07e07cd1c97b.png){: .align-center}

<br>

# SQL vs NoSQL 언제 사용할까?

## SQL 데이터베이스를 사용하는 이유

📌 **ACID를 보장해야 할 때**<br>
ACID 보장은 트랜잭션이 데이터베이스와 상호작용 하는 방식을 정확히 규정해 에러를 줄이고 데이터베이스의 무결성을 보호한다. 그래서 많은 전자상거래 및 금융 애플리케이션의 경우 ACID 보장 데이터베이스를 선호한다.



📌 **한 번 구조화된 데이터가 변경되지 않을 때**<br>
일관된 데이터로만 작업하는 경우, 다양한 데이터 유형과 높은 트래픽 볼륨을 지원하도록 설계된 관계형 DB를 사용한다.



📌 **'관계를 맺고 있는' 데이터가 자주 변경 될 때**<br>
NoSQL은 관계를 맺고 있는 데이터를 수정하려면 여러 컬렉션을 수정해야 한다. 따라서 비효율적이다.<br>
관계형 DB는 중복된 데이터가 없어(데이터 무결성) 변경이 용이하기 때문에 관계를 맺고 있는 데이터가 자주 변경이 이루어지는 시스템에 적합하다.


## NoSQL 데이터베이스를 사용하는 이유

📌 **구조화되지 않은 대용량 데이터를 저장해야 할 때**<br>
NoSQL 데이터베이스는 함께 저장할 수 있는 데이터 유형에 제한이 없다. 필요에 따라 다양한 유형을 추가 할 수 있다. Document 기반 데이터베이스를 사용하면 '유형'을 미리 정의하지 않고 데이터를 한곳에 저장할 수 있다. 따라서 소프트웨어 개발에 정형화 되지 않은 많은 양의 데이터가 필요할 경우 사용한다.


📌 **빠른 개발이 필요할 때**<br>
NoSQL은 구조화를 먼저 하지 않기 때문에, 짧은 스프린트 내에서 개발중이거나, 데이터 구조를 자주 변경할 때 사용한다.

📌 **클라우드 컴퓨팅 및 스토리지를 최대한 활용할 때**<br>
클라우드 기반으로 데이터베이스 저장소를 구축하면, 저렴한 비용의 솔루션을 제공받을 수 있다.<br>
따라서 소프트웨어에 데이터베이스의 확장성이 중요하다면, 별다른 번거로움 없이 확장할 수 있는 NoSQL 데이터베이스를 사용하는 것이 좋다.

<br>

# 참고자료
- [khj93, Tistory](https://khj93.tistory.com/entry/Database-RDBMS%EC%99%80-NOSQL-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- [SQL, 위키백과](https://ko.wikipedia.org/wiki/SQL)
- [데이터베이스, 나무위키](https://namu.wiki/w/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4?from=RDBMS#s-5.1)
- [관계형 데이터 베이스, 위키백과](https://ko.wikipedia.org/wiki/%EA%B4%80%EA%B3%84%ED%98%95_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)
- [NoSQL이란 무엇인가? 대량데이터 동시처리위한 DBMS 종류와 특징, 삼성 SDS](https://www.samsungsds.com/kr/insights/1232564_4627.html)
- [livenow, Tistory](https://livenow14.tistory.com/65)

<br>