---
published: true
title:  "[Spring/Elasticsearch] SearchHits to Page"
excerpt: "엘라스틱서치 쿼리 결과에서 페이징을 포함해 컨텐트만 뽑아내는 방법"

categories:
  - Spring
tags:
  - [Spring, Elasticsearch, Springdataelasticsearch]

toc: true
toc_sticky: true
 
date: 2022-04-05 21:42:36
last_modified_at: 2022-04-05 21:42:42
---

## ✨ SearchHits, SearchPage, Page

![image](https://user-images.githubusercontent.com/67352902/161756566-7c96d2ba-3dc1-4029-9124-06ae9566a705.png){:. align-center}

**📌 SearchHits**

- Number of total hits
- Total hits relation
- Maximum score
- A list of SearchHit<T> objects
- Returned aggregations

**📌 SearchPage**

- `SearchHits<T>` 요소에 포함되며 페이징 엑세스에 사용되는 spring data `Page` 정의

`SearchOperations` 인터페이스 메소드를 이용해 쿼리를 날려 결과를 얻으면 `SearchHits<T>` 로 래핑되어 리턴 되는데, 나는 이렇게 구한 결과에서 original content(원래 얻으려 한 결과 리스트..) 만 API에 넘겨주면 되었고, 추가로 페이징 처리를 해야했다.

페이징 처리때문에 `SearchPage<T>` 로 변환하면 역시 페이지만 추가되고 클라이언트가 몰라도 되는 잡다한 SearchHits의 검색결과들이 여전히 남아있었다.

따라서 `Page<T>` 로 변환해야했는데, 이렇게 하면 된다.

```java
SearchHits<Campaign> searchHits =
                elasticsearchOperations.search(
                        query,
                        Campaign.class,
                        IndexCoordinates.of(CAMPAIGN_INDEX));

SearchPage<Campaign> searchPage = SearchHitSupport.searchPageFor(searchHits, query.getPageable());
Page<Campagin> page = (Page)SearchHitSupport.unwrapSearchHits(searchPage);
```

페이지 정보가 필요하기 때문에 `SearchPage<T>` 로 만들고, unwarp 하면 content를 제외한 `SearchHits<T>` 의 내용들이 사라진다.

<hr>

별 내용은 아니지만 쓰고 나면 더 잘 기억나니까 😊

# 참고자료

- [https://stackoverflow.com/questions/62115096/getting-innerhits-result-from-searchhits-class-at-spring-data-elastic-search-4-0](https://stackoverflow.com/questions/62115096/getting-innerhits-result-from-searchhits-class-at-spring-data-elastic-search-4-0)