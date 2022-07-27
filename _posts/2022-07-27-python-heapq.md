---
published: true
title:  "[Python] heapq로 최소힙/최대힙 구현"
excerpt: ""

categories:
  - About Dev
tags:
  - [Python]

toc: true
toc_sticky: true
 
date: 2022-07-27 14:02:23
last_modified_at: 2022-07-27 14:02:26
---
<br>

# heapq

## 힙 자료구조

- heapq모듈은 이진 트리(binary tree)기반의 최소 힙(min heap)자료구조 제공.

- min heap을 사용하면 원소들이 항상 정렬된 상태로 삽입, 삭제되며 min heap에서 가장 작은 값은 언제나 인덱스 0, 즉 이진트리의 루트에 위치.  
- heap 자료구조를 이용해 데이터를 정렬하려면 heap[0]를 루프를 돌아 `heappop()` 해주면 된다.

## 파이썬의 우선순위 큐

이 heaqq는 우선순위 큐를 구현할때도 유용하다. 근데 파이썬에는 PriorityQueue 가 있다.

PriorityQueue는 사실 내부적으로 heapq로 구현되어 있다. (라이브러리 코드를 한번만 봐도 알 수 있다.) 이 포스팅에선 다루지 않겠지만, heapq와 PriorityQueue는 시간효율 차이가 크다. 따라서 코딩테스트 문제를 풀 때는 되도록 heaqp를 사용하는것이 좋다.

## 모듈 임포트

```python
import heapq
```

## 최소 힙 (min heap) 생성

```python
heap = []
```

별개의 자료구조가 아닌 리스트를 힙처럼 다룰 수 있도록 하는 것

## 힙에 원소 추가 - heappush()

`heap`의 `heappush()`함수를 이용하여 원소를 추가 할 수 있다.  
첫번째 인자는 원소를 추가할 대상 리스트이며 두번빼 인자는 추가할 원소를 넘긴다.

```python
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)
heapq.heappush(heap, 4)
heapq.heappush(heap, 2)
print(heap) # [1, 2, 3, 5, 4]
```

## 힙에서 원소 삭제 - heappop()

`heap`의 `heappop()`함수를 이용하여 힙에서 원소를 삭제 할 수 있다.  
원소를 삭제할 대상을 인자로 넘기면, 인덱스 0에 있는 원소를 삭제 후에 그 값을 리턴한다.

```python
heapq.heappop(heap)
print(heap) # [2, 4, 3, 5]
```

## 기존 리스트를 힙으로 변환

`heap`의 `heapify()`를 사용하면 기존의 리스트를 리스트 힙으로 만들 수 있다.

```python
heap = [5, 3, 4, 2, 1]
heapq.heapify(heap)
print(heap) # [1, 2, 4, 5, 3]
```

## [응용] 최대 힙, 우선순위 큐

`heapq`는 기본이 min heap인데, max heap을 구하려면 튜플(tuple)을 이용하면 된다.  
이렇게 우선순위를 정하여 구할 수 있다.

```python
num = [5, 3, 4, 2, 1]
heap = []

for n in num:
    heapq.heappush(heap, (-n, n))  # (우선순위, 값)

# 우선순위와 함께 출력
while heap:
    print(heapq.heappop(heap))

"""
(-5, 5)
(-4, 4)
(-3, 3)
(-2, 2)
(-1, 1)
"""
```

```python
# 우선순위에 따라 정렬된 값만 출력
while heap:
    print(heapq.heappop(heap)[1])

"""
5
4
3
2
1
"""
```

마찬가지로 절댓값 힙이나 다른 기준으로도 얼마든지 설정 가능하다.

## 시간 복잡도

<table style="height: 86px;" width="307" data-ke-style="style9" data-ke-align="alignLeft"><tbody><tr><td style="width: 132px; text-align: center;">메소드</td><td style="width: 133px; text-align: center;">시간복잡도</td></tr><tr style="height: 21px;"><td style="width: 132px; height: 21px;" align="left">heappush()</td><td style="width: 133px; height: 21px;" align="left">O(logN)</td></tr><tr style="height: 22px;"><td style="width: 132px; height: 22px;" align="left">heapop()</td><td style="width: 133px; height: 22px;" align="left">O(logN)</td></tr><tr style="height: 22px;"><td style="width: 132px; height: 22px;" align="left">heapify()</td><td style="width: 133px; height: 22px;" align="left">O(N)</td></tr></tbody></table>

- 힙 정렬을 하게 되면 `heappop()`를 N번 하므로 시간복잡도가 O(NlogN) 이 된다.

## Reference

- [https://www.daleseo.com/python-heapq/](https://www.daleseo.com/python-heapq/)
- [내 이전 블로그](https://velog.io/@dogakday/Python-heapq-%EB%AA%A8%EB%93%88)