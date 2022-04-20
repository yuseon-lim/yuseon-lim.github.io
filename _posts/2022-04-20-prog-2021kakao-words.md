---
published: true
title:  "[프로그래머스] 2021 카카오 채용연계형 인턴십 - 숫자 문자열과 영단어(Python) "
excerpt: ""

categories:
  - Programmers
tags:
  - [Programmers, Python]

toc: true
toc_sticky: true
 
date: 2022-04-20 20:02:22
last_modified_at: 2022-04-20 20:02:24
---
# 🔎 문제
- [🔗 프로그래머스 2021 카카오 채용연계형 인턴십 - 문자열과 영단어](https://programmers.co.kr/learn/courses/30/lessons/81301)
- Lv.1

# 💡 풀이
![image](https://user-images.githubusercontent.com/67352902/164217091-d233f05d-6467-4f12-ac7e-94f39d2fec98.png){: .align-center}
*각 숫자에 대응되는 영단어 표*

처음에는 포문을 돌면서 문자인지 숫자인지 판단해줘야 하나 했는데 생각해보니 파이썬엔 편리한 함수들이 자료형, 함수들이 많다.

문제에서 주어진 영단어표를 딕셔너리로 만들고, 해당 딕셔너리에서 반복문을 돌며 문자열에 영단어가 있으면 숫자로 교체해주면 된다.

마지막에 int형으로 바꾸어서 리턴한다.

문제를 풀고, 다른 분 풀이에 달린 댓글에 '이건 O(N)처럼 보이지만 replace가 그 자체로 O(N) 이상이고 심지어는 O(N^2)까지도 가능한 메소드라 최악의 경우 O(N^3)까지 나옵니다. 풀이는 짧지만 시간 복잡도는 많이 커집니다' 라는 댓글이 달린것을 보고 `str.replace()`의 시간복잡도를 찾아보았는데, 의견이 분분했지만 `O(n)`인것은 맞는 것 같았다.

아무리 lv.1이라도 너무 쉽지 않은가 싶어서 `isdigit()`로 숫자인지 검사하는 방식으로도 풀어봤는데 시간 차가 크게 나지 않았다. 별다른 뜻은 없지 않았을까..? 내가 코테를 보는중이였다면 이렇게 풀고 바로 넘어갔을 것 같긴 하다 ㅋㅋ


# 📃 소스코드
```python
word_to_num = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

def solution(s):
    
    for key, value in word_to_num.items():
        if key in s:
            s = s.replace(key, value)
            
    return int(s)
```
![image](https://user-images.githubusercontent.com/67352902/164219925-99edef5d-82e4-4cd8-858a-12e13a762a8e.png){: .align-center}
<br>
