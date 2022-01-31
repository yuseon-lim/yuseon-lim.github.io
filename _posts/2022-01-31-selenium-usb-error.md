---
published: true
title:  "[Python] selenium 시스템에 부착된 장치가 작동하지 않습니다. (0x1F)"
excerpt: "USB: usb_device_handle_win.cc:1050 Failed to read descriptor from node connection: 시스템에 부착된 장치가 작동하지 않습니다. (0x1F) 해결"

categories:
  - Trouble Shooting
tags:
  - [Python, Trouble Shooting, Selenium]

toc: true
toc_sticky: true
 
date: 2022-01-31 23:58:15
last_modified_at: 2022-01-31 23:58:18
---

# ⚠️ 문제 상황

파이썬에 셀레니움 설치하고 실행시켰는데

**"USB: usb_device_handle_win.cc:1050 Failed to read descriptor from node connection: 시스템에 부착된 장치가 작동하지 않습니다. (0x1F)"**

이런 에러가 뜬다.. USB..? 사용한 적이 없는데 말이다.

# 🔮 해결 방법

기존 코드를 `option`을 사용하는 코드로 바꿔주면 해결된다.
```python
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
browser = webdriver.Chrome(options=options)
```
<br>