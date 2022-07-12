---
published: true
title:  "[Algorithm] 접미사 배열로 K번째 부분 문자열 구하기 (feat. swea 5254 부분 문자열) (Python)"
excerpt: ""

categories:
  - Algorithm
tags:
  - [문자열, Python]

toc: true
toc_sticky: true
 
date: 2022-07-12 14:58:19
last_modified_at: 2022-07-12 14:58:22
---
<br>

# 📌 부분 문자열

(SWEA 5254번 부분 문자열 문제)

길이가 K인 문자열 S가 있을 때, S의 연속된 일부분을 부분 문자열이라고 한다.

부분 문자열은 원래의 순서가 바뀌거나 중간에 있는 글자가 빠져서는 안된다.

예를 들어 abac의 부분 문자열은 사전순으로 정렬하면 다음과 같다.

a ab aba abac ac b ba bac c

K번째 부분 문자열은?

# 📌 접미사 배열

- 접미사(suffix)
  - 어떤 단어의 끝에 붙어 새로운 단어가 되게 하는 말
  - abc의 접미사는 c, bc, abc이다.
  
- 접미사 배열(suffix arrat=y)
  - 어떤 문자열의 모든 접미사를 사전순으로 나열한 배열
  - LCP와 함께 쓴다.
  - 문자열 검색이나 전문 검색에 많이 쓴다.

# 📌 접미사 배열 만들기

다음은 **banana** 의 접미사들이다.

|suffix|index|
|---:|:---:|
|banana|0|
|anana|1|
|nana|2|
|ana|3|
|na|4|
|a|5|

이걸 이제 오름차순으로 정렬하면 **접미사 배열**이 된다.

|suffix|index|
|:---|:---:|
|a|5|
|ana|3|
|anana|1|
|banana|0|
|na|4|
|nana|2|

# 📌 LCP가 필요한 이유

LCP 없이 부분 문자열을 구해보겠다.

- **a**
  - a

- **ana**
  - <u>a</u>
  - an
  - ana

- **anana**
  - <u>a</u>
  - <u>an</u>
  - <u>ana</u>
  - anan
  - anana

- **banana**
  - b
  - ba
  - ban
  - bana
  - banan
  - banana

- **na**
  - n
  - na

- **nana**
  - <u>n</u>
  - <u>na</u>
  - nan
  - nana

구해보면 접미사 배열의 a, ana, anana, banana, na, nana의 각 부분 문자열의 개수는 **접미사의 길이와 동일**하며, banana의 모든 부분 문자열을 구하려면 모든 접미사 배열의 부분 문자열에서 중복되는 개수를 빼면 된다는 것을 알 수 있다.

즉, 단어의 모든 부분 문자열을 구하려면 접미사 배열의 <mark style='background-color: #fff5b1'> '접미사의 길이만 알면 된다' </mark> !

더불어 중복되는 것이 몇개인지 알면 K번째 부분 문자열을 더 빠르게 구할 수 있을 것이다.

# 📌 LCP (Longest Common Prefix)

이 개념은 [KMP 알고리즘](https://devyuseon.github.io/algorithm/kmp-algorithm/#pattern-%EC%A0%84%EC%B2%98%EB%A6%AC---lps) 에서도 다룬 적 있다. 다만 여기선 이 LCP의 개념이 조금 다르다.

정렬된 접미사 배열에서 LCP는, **인접한 접미사와 몇 칸까지 겹치는지**를 의미한다.

위에서 밑줄친 부분이 겹치는 부분, 즉 **가장 긴 공통 접두사**이다.

첫번째 접미사는 앞의 접미사가 없기 때문에 0으로 써주면 된다. 구해보면 이렇게 된다.

|suffix|lcp|
|:---|:---:|
|a|0|
|ana|1|
|anana|3|
|banana|0|
|na|0|
|nana|2|

이제 이것을 활용해서 K번째 부분 문자열을 쉽게 구할 수 있다.

# 📌 K번째 부분 문자열 구하기

K = 2 일때,<br>
접미사 a의 길이는 1이고, lcp가 0이므로 1 (cnt = 1)<br>
접미사 ana의 길이는 3이고, lcp가 1이므로 3 - 1 (cnt = 1 + (3 - 1) = 3)<br>
우리는 2번째 문자열을 구하는 것이고, 접미사 ana까지 3번째 문자열이라는 것을 알았으니 종료한다.<br>
2번째 문자열은 해당 접미사 ana의 0번째부터 `접미사의 길이 3 - (cnt - k)`번째까지 자른 문자열인 an이 된다.

K = 12일떄,<br>
접미사 a의 길이는 1이고, lcp가 0이므로 `cnt = 1`<br>
접미사 ana의 길이는 3이고, lcp가 1이므로 `cnt = 1 + (3 - 1) = 3`<br>
접미사 banana의 길이는 6이고, lcp가 0이므로 `cnt = 1 + 2 + (6 - 0) = 9`<br>
접미사 na의 길이는 2이고, lcp가 0이므로 `cnt = 1 + 2 + 6 + (2 - 0) = 11`<br>
접미사 nana의 길이는 4이고, lcp가 2이므로 `cnt = 1 + 2 + 6 + 2 + (4 - 2) = 13`<br>
우리는 12번째 문자열을 구하는 것이고, 접미사 nana까지 13번째 문자열이라는 것을 알았으니 종료한다.<br>
12번째 문자열은 해당 접미사 nana의 0번째부터 `접미사의 길이 4 - (cnt - k)`번째까지 자른 문자열인 nan이 된다.

# 📄 소스코드

```python
def get_lcp(s1, s2):
    s = min(len(s1), len(s2))
    cnt = 0
    
    for i in range(s):
        if s1[i] != s2[i]:
            break
        cnt += 1
    
    return cnt

T = int(input())
for test_case in range(1, T + 1):
    n, string = input().split()
    n = int(n)
    leng = len(string)
    lcp = [0] * leng
    suffix = []
    result = ''
    
    # 접미사 배열
    for i in range(0, leng):
        suffix.append(string[i:leng])
    print(suffix)
    
    # 접미사 배열 사전순 정렬
    suffix.sort()
    print(suffix)
    
    # lcp 배열 구하기
    for i in range(0, leng):
        lcp[i] = get_lcp(suffix[i - 1], suffix[i])
    print(lcp)
    cnt = 0
    for i in range(0, leng):
        cnt += len(suffix[i]) - lcp[i] # lcp 배열을 이용해 부분 문자열의 중복 제거
        
        if cnt >= n: # n번째를 구할 수 있는 범위 안에 들어옴
            result = suffix[i][0 : len(suffix[i]) - (cnt - n)]
            break            
    
    print(f'#{test_case} {result[0]} {len(result)}')
```