---
published: true
title:  "[프로그래머스] 행렬과 연산(Python) "
excerpt: ""

categories:
  - PS
tags:
  - [Programmers, Python]

toc: true
toc_sticky: true
 
date: 2023-01-20 21:11:49
last_modified_at: 2023-01-20 21:11:53
---
# 🔎 문제
- [🔗 프로그래머스 행렬과 연산](https://school.programmers.co.kr/learn/courses/30/lessons/118670)

# 💡 풀이
rc의 행 길이 x rc의 열 길이 가 100,000 을 넘지 않으므로 모든 행열을 순회하는 것은 시간 초과가 나지 않는다.

하지만 operation은 최대 100,000번 일어날 수 있기때문에 연산을 O(1)이나 O(logN) 안에 해야 한다.

**deque의 popleft, pop, append, appendleft 연산은 O(1)이 소요된다.** 는 사실을 이용하면 된다.

이차원 배열을 left, mid, right 로 나누었다.<br>
left는 이차원 배열 `rc[n][0]` 으로 이루어져 있고,<br>
mid는 `[rc[n][1] ... rc[n][-2]]`로 이루어져 있고(-2는 맨 끝에서 두번째 원소),<br>
right는 `rc[n][-1]` 로 이루어져 있다.

이때 모든 자료형은 collections의 Deque로 처리한다. 리스트의 pop(0), insert(0) 는 시간복잡도가 O(n), Deque의 popleft, appendleft 는 시간복잡도가 O(1)이기 때문이다.

### Shift Row

단순히 맨 아래 행을 맨 위로 넣으면 된다.

### Rotate

![image](https://user-images.githubusercontent.com/67352902/213690816-e0485498-4f0e-4e82-9996-be43b5ff5af2.png)

위처럼 네번의 연산(O(1)로 처리) 으로 구할 수 있다.

# 📃 소스코드
```python
from collections import deque

def solution(rc, operations):
    
    left = deque([r[0] for r in rc])
    mid = deque([deque(r[1:-1]) for r in rc])
    right = deque([r[-1] for r in rc])
    
    def shiftrow():
        left.appendleft(left.pop())
        mid.appendleft(mid.pop())
        right.appendleft(right.pop())
        
    def rotate():
        mid[0].appendleft(left.popleft())
        right.appendleft(mid[0].pop())
        mid[-1].append(right.pop())
        left.append(mid[-1].popleft())
    
    for op in operations:
        if op == "ShiftRow": shiftrow()
        else: rotate()
    
    return [[left[i]] + list(mid[i]) + [right[i]] for i in range(len(rc))]
```
<br>