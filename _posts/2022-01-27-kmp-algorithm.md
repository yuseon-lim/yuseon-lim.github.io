---
published: true
title:  "[Algorithm] KMP 알고리즘 (Python)"
excerpt: "문자열 검색 알고리즘인 KMP 알고리즘에 대해 알아보자!"

categories:
  - Algorithm
tags:
  - [KMP, Python]

toc: true
toc_sticky: true
 
date: 2022-01-27
last_modified_at: 2022-01-27
---
<br>

# 문자열 검색

문자열 검색 알고리즘엔 대표적으로 4가지가 있다.

- Naive
- Rabin Karp
- KMP (Knuth-Morris-Pratt)
- Boyer Moore

오늘은 이중 **KMP 알고리즘**에 대해 정리해 보려고 한다. KMP알고리즘을 설명하기에 앞서, Navie방식을 알아보자.

**Navie** 방식은 처음부터 끝까지 패턴의 위치를 하나씩 옮겨가며 패턴과 비교해 찾는 방법이다. 
![image](https://user-images.githubusercontent.com/67352902/151298422-9e3ce8ae-e43a-4ae2-ad2b-79e6beb0eef5.png){: .align-center}


길이가 N인 txt에 대해 길이가 M인 pat을 찾는다면 M개의 문자열을 N번씩 탐색해 주어야 하므로 *O(NM)*의 시간 복잡도가 나오게 된다. 쉽지만 매우 비효율적이다.

하지만 KMP 알고리즘은 이러한 문자열 검색을 *O(N + M)*으로 단축시킬 수 있다.

# KMP(Knuth, Morris, Pratt) 알고리즘
문자열 검색시에 불필요한 문자열 비교를 없애기 위해 고안한 알고리즘이다.

두가지를 알아야 하는데, **접두사**와 **접미사**의 개념과, pattern을 전처리 하는 방법이다.

## 접두사와 접미사 (prefix and suffix)
패턴인 ABAABA 라는 문자열에서, 접두사(prefix)와 접미사(suffix)는 다음과 같다.

| 접두사 | 접미사 |
| :----: | :----: |
|   A    |   A    |
|   AB   |   BA   |
|  ABA   |  ABA   |
|  ABAA  |  AABA  |
| ABAAB  | BAABA  |
| ABAABA  | ABAABA  |

## pattern 전처리 - lps
실패함수 **pi** 배열 이라고도 하고 the longest proper prefix of pat이라고 해서 **lps** 배열 이라고도 한다. 이 글에선 lps로 부르도록 하겠다.

lps는 주어진 문자열의 0~index 까지의 부분 문자열중에서 `prefix == suffix` 가 될 수 있는 문자열 중 가장 긴 것의 길이 이다.

패턴 'ABAABA' 문자열에 대해 lps 배열을 구해보면 이렇게 된다.

| index | substring | lps[index] | 설명                                                |
| :---: | :-------: | :--------: | :-------------------------------------------------- |
|   0   |     A     |     0      | prefix와 suffix가 없으므로 0                        |
|   1   |    AB     |     0      | prefix와 suffix가 일치하지 않으므로 0               |
|   2   |    ABA    |     1      | prefix(A)와 suffix(B) 가 일치, 길이가 1이므로 1     |
|   3   |   ABAA    |     1      | prefix(A)와 suffix(B) 가 일치, 길이가 1이므로 1     |
|   4   |   ABAAB   |     2      | prefix(AB)와 suffix(AB) 가 일치, 길이가 2이므로 2   |
|   5   |  ABAABA   |     3      | prefix(ABA)와 suffix(ABA) 가 일치, 길이가 3이므로 3 |


⬇️ 완성된 lps 배열

```python
lps = [0, 0, 1, 1, 2, 3]
```
이런식으로 lps 배열을 구할 수 있다. 

```python
pat = "AAAA"
lps[] is [0, 1, 2, 3]

pat = "ABCDE"
lps[] is [0, 0, 0, 0, 0]

pat = "AABAACAABAA"
lps[] is [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]

pat = "AAACAAAAAC"
lps[] is [0, 1, 2, 0, 1, 2, 3, 3, 3, 4]

pat = "AAABAAA"
lps[] is [0, 1, 2, 0, 1, 2, 3]
```

## 그래서 어떻게 하는건데?
> 예제 출처는 [geeksforgeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)입니다.

```python
txt = AAAAABAAABA
pat = AAAA
lps = [0, 1, 2, 3]
```
이런 상황에서 KMP 알고리즘을 이용해 문자열을 검색해보자

```python
i = 0, j = 0
txt = "A"AAAABAAABA
pat = "A"AAA
txt[i] 와 pat[j] 가 일치, i++, j++

i = 1, j = 1
txt = A"A"AAABAAABA
pat = A"A"AA
txt[i] 와 pat[j] 가 일치, i++, j++

i = 2, j = 2
txt = AA"A"AABAAABA
pat = AA"A"A
txt[i] 와 pat[j] 가 일치, i++, j++

i = 3, j = 3
txt = AAA"A"ABAAABA
pat = AAA"A"
txt[i] 와 pat[j] 가 일치, i++, j++

i = 4, j = 4
j = len(pat), pattern found
```

패턴을 찾았다! 그러므로 j를 reset한다.
Naive와는 다르게 KMP에선 lps 배열을 이용해 j를 초기화 한다.
```python
j = lps[j - 1] = lps[3] = 3
```
앞 세글자에 대한 탐색을 건너 뛰어 버렸다. 

```python
i = 4, j = 3
txt = AAAA"A"BAAABA
pat =  AAA"A"
txt[i] 와 pat[j] 가 일치, i++, j++
```

`lps[3] = 3` 이라는 사실은 패턴의 index 3까지의 부분 문자열 'AAAA'에서 prefix 'AAA'와 suffix 'AAA'가 같다는 것을 의미한다.

문자열 탐색을 진행하기 위해서 패턴을 한 칸 옮겨 다시 패턴의 앞 부분부터 탐색하게 될텐데, 이때 이미 일치 하고 있는것을 알고 있는 'AAA' 대한 검색을 건너뛰는 것이다.

```python
i = 5, j = 4
j = len(pat), pattern found
j = lps[j - 1] = lps[3] = 3
```
위와 같은 로직으로 j에 대한 초기화를 lps를 이용해 진행했다.

```python
i = 5, j = 3
txt = AAAAA"B"AAABA
pat =   AAA"A"
txt[i] 와 pat[j] 가 '불'일치, j > 0, j만 변경
j = lps[j - 1] = lps[2] = 2
```
불일치 하는 index(j = 3) 바로 앞 index 2의 lps를 본다. `lps[2] = 2` 이므로 앞의 'AA'는 검사하지 않는다.

```python

```i = 5, j = 2
txt = AAAAA"B"AAABA 
pat =    AA"A"A
txt[i] 와 pat[j] 가 '불'일치, j > 0, j만 변경
j = lps[j - 1] = lps[1] = 1
```
불일치 하는 index(j = 2) 바로 앞 index 1의 lps를 본다. `lps[1] = 1` 이므로 앞의 'A'는 검사하지 않는다.

```python
i = 5, j = 1
txt = AAAAA"B"AAABA
pat =     A"A"AA
txt[i] 와 pat[j] 가 '불'일치, j > 0, j만 변경
j = lps[j-1] = lps[0] = 0
```
불일치 하는 index(j = 1) 바로 앞 index 0의 lps를 본다. `lps[0] = 0` 이므로 lps로 덕 보는것이 없다. 그냥 패턴의 앞부분부터 검사하게 된다.

```python
i = 5, j = 0
txt = AAAAA"B"AAABA
pat =      "A"AAA
txt[i] 와 pat[j] 가 '불'일치, j == 0, i++
```
이 경우엔 패턴 첫번째부터 안맞으니까 더 검사할 필요도 없다. i를 증가시킨다.

```python
i = 6, j = 0
txt = AAAAAB"A"AABA 
pat =       "A"AAA
txt[i] 와 pat[j] 가 일치, i++, j++

i = 7, j = 1
txt = AAAAABA"A"ABA
pat =       A"A"AA
txt[i] 와 pat[j] 가 일치, i++, j++
```

이렇게 탐색을 해 나가면 된다.

# 📃 전체 소스코드
[🔗 백준 16916](https://www.acmicpc.net/problem/16916) 문제를 KMP 알고리즘을 사용해 푼 풀이이다.

```python
import sys
input = sys.stdin.readline

def kmp(pat, txt):
    N = len(txt)
    M = len(pat)
    lps = [0] * M
    compute_lps(pat, lps)
    
    i = 0 # index of txt
    j = 0 # index of pat
    while i < N:
        if pat[j] == txt[i]:
            if j == M - 1:
                return True
            else:
                i += 1
                j += 1
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
        if j == M:
            return True
            # 이 문제에서는 일치하는게 있는지만 검사
        

def compute_lps(pat, lps):
    leng = 0
    i = 1
    while i < len(pat):
        if pat[i] == pat[leng]:
            leng += 1
            lps[i] = leng
            i += 1
        else:
            if leng != 0:
                leng = lps[leng - 1]
            else:
                lps[i] = 0
                i += 1
                
if __name__ == "__main__":
    txt = input().strip()
    pat = input().strip()
    if kmp(pat, txt):
        print(1)
    else:
        print(0)
```

# 끝내며

나름 이해하기 쉽게 설명한다고 하긴 했는데 A는 A이기 때문에 A이다 이런식으로 설명해 버린 것 같기도 하다.🤣 나한테는 이해하기 매우 어려운 알고리즘이였다. 추후에 이에 대한 이해가 깊어지면 설명을 더 보충해야겠다.