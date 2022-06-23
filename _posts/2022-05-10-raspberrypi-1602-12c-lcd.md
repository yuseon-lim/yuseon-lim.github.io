---
published: true
title:  "라즈베리파이 1602 I2C 캐릭터 LCD 사용 (Python, 파이썬)"
excerpt: ""

categories:
  - About Dev
tags:
  - [raspberrypi]

toc: true
toc_sticky: true
 
date: 2022-05-10 19:03:50
last_modified_at: 2022-05-10 19:03:53
---

## 준비물
- [라즈베리파이3 B+](https://www.devicemart.co.kr/goods/view?no=1385482)
- [아두이노 I2C 1602 LCD 모듈 [SZH-EK101]](https://www.devicemart.co.kr/goods/view?no=1327456)
- 브레드보드, 케이블
- 라즈비안 OS

## 설치, 환경설정
1. python3 설치

```bash
sudo apt-get install python3
```

2. I2C Enable 설정
```bash
sudo raspi-config
```
![](https://images.velog.io/images/dogakday/post/aea464e0-3ebf-48b1-8bdf-db4ca52ee08e/image.png){: .align-center}

> 3 Interface Options > P5 I2C > Enable 할거냐고 물어보면 YES!

3. smbus 설치
```bash
sudo apt-get install python3-smbus
```
4. i2c tools 설치
i2c 개발 중 디버깅을 도와준다고 한다.
```bash
sudo apt-get install i2c-tools
```
5. 모듈 추가
```bash
sudo vi /etc/modules
```
아래 내용 추가
```
i2c-bcm2708
i2c-dev
```
6. 설정파일 수정
```bash
sudo vi /etc/modprobe.d/raspi-blacklist.conf
```
![](https://images.velog.io/images/dogakday/post/817a3084-b963-4238-9e13-4ceecda1c544/image.png){: .align-center}
블랙리스트 주석처리 해줍니다

## 회로연결
![](https://images.velog.io/images/dogakday/post/c673d32d-93db-467b-9b3c-7b42c9125081/KakaoTalk_20210522_203407676_01.jpg){: .align-center}
Boy 시나요? 뒤에 GND, VCC, SDA, SCL에 선 꼽고 맞는 GPIO에 꽂아주면 됩니다. VCC는 5V에 꽂습니다.

![](https://images.velog.io/images/dogakday/post/fd640953-9c4c-49d7-84ca-eacfc7ff4aa6/KakaoTalk_20210522_214856667.jpg){: .align-center}
잘 연결하면 이쁘게 불도 들어옵니다.

## 연결 확인
```bash
lsmod | grep i2c
```
![](https://images.velog.io/images/dogakday/post/d94eb930-93e7-472e-8aeb-3816bd30d3ac/image.png){: .align-center}

```bash
i2cdetect -y 1
```
![](https://images.velog.io/images/dogakday/post/47951419-a9bd-4c52-8092-3bff4a3bce42/image.png){: .align-center}

## 라이브러리 설치
```bash
git clone https://github.com/the-raspberry-pi-guy/lcd.git
```
`ls` 명령어로 확인해보면 새 디렉토리가 만들어진 것 확인
![](https://images.velog.io/images/dogakday/post/b71a7b26-fb97-4aff-9ae6-c790614f4833/image.png){: .align-center}

```bash
cd lcd
sudo sh install.sh
```
![](https://images.velog.io/images/dogakday/post/e531555c-2790-4270-9334-b24698d9159e/image.png){: .align-center}

## demo_lcd.py
> 테스트 하기 전에 [파이썬 환경변수를 설정](https://velog.io/@dogakday/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95)해야 한다.

기본적으로 몇 개의 demo 파일을 제공해 준다.
**demo_lcd.py** 로 들어가보면 기본적인 코드들을 볼 수 있다.
```python
import drivers
from time import sleep

# Main body of code
try:
    while True:
        # Remember that your sentences can only be 16 characters long!
        print("Writing to display")
        display.lcd_display_string("Greetings Human!", 1)  # Write line of text to first line of display
        display.lcd_display_string("Demo Pi Guy code", 2)  # Write line of text to second line of display
        sleep(2)                                           # Give time for the message to be read
        display.lcd_display_string("I am a display!", 1)   # Refresh the first line of display with a different message
        sleep(2)                                           # Give time for the message to be read
        display.lcd_clear()                                # Clear the display of any data
        sleep(2)                                           # Give time for the message to be read
except KeyboardInterrupt:
    # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
    print("Cleaning up!")
    display.lcd_clear()

```
실행해보면,
```bash
python3 demo_lcd.py
```
![](https://images.velog.io/images/dogakday/post/56c42fbc-c5fe-4ca2-8382-ab588549f36f/image.png){: .align-center}
![](https://images.velog.io/images/dogakday/post/47a3ef4d-0eda-4073-a82c-cbd46a92b139/KakaoTalk_20210522_215329871.jpg){: .align-center}

😭😭😭😭😭 성공 😭😭😭😭😭

## Hello world! 프린트 해보기
```python
import drivers
from time import sleep

# Load the driver and set it to "display"
# If you use something from the driver library use the "display." prefix first
display = drivers.Lcd()

# Main body of code
try:
    while True:
        # Remember that your sentences can only be 16 characters long!
        print("print Helloworld")
        display.lcd_display_string("  Hello World!", 1)  # Write line of text to first line of display
        display.lcd_display_string("  * WELCOME * ", 2)  # Write line of text to second line of display
        sleep(2)                         
        display.lcd_display_string("  Hello World!", 1)                  # Give time for the message to be read
        display.lcd_display_string("    WELCOME   ", 2)   # Refresh the first line of display with a different message
        sleep(2)                                           # Give time for the message to be read                                          # Give time for the message to be read
except KeyboardInterrupt:
    # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
    print("Cleaning up!")
    display.lcd_clear()
```
![](https://images.velog.io/images/dogakday/post/5d60895a-faa0-4d33-a077-9107f161c678/ezgif.com-gif-maker.gif){: .align-center}
## 참고자료
- [sleep365.tistory](https://sleep365.tistory.com/74)
- [elepartsblog](https://blog.naver.com/elepartsblog/221583231746)
- https://www.youtube.com/watch?v=fR5XhHYzUK0
- https://www.youtube.com/watch?v=DHbLBTRpTWM
- https://www.youtube.com/watch?v=fR5XhHYzUK0