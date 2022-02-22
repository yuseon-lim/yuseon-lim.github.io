---
published: true
title:  "[ElasticSearch] search() got an unexpected keyword argument 'doc_type' (Python)"

categories:
  - Trouble Shooting
tags:
  - [Python, Trouble Shooting, ElasticSearch, Python]

toc: true
toc_sticky: true
 
date: 2022-02-23 01:30:01
last_modified_at: 2022-02-23 01:29:59
---

# ⚠️ 문제 상황
ElasticSearch에 `es.index()`를 이용해 insert를 하던 도중에

**"search() got an unexpected keyword argument 'doc_type'"**

에러가 났다.

# 🔮 해결 방법

코드에 문제가 있는 것은 아니고, 엘라스틱서치 버전과 pip로 설치한 엘라스틱서치 모듈의 버전이 맞아야 되는것 같다.

```shell
pip uninstall elasticsearch
pip install elasticsearch==[엘라스틱서치 version]
```

이렇게 지웠다가 본인이 설치한 엘라스틱 버전으로 다시 설치해주면 된다.

# 참고자료

- [https://github.com/Yelp/elastalert/issues/2204](https://github.com/Yelp/elastalert/issues/2204)
<br>