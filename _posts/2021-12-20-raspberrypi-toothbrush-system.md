---
title:  "[Project] 라즈베리 파이를 이용한 간단한 프로젝트 (RaspberryPi, Python, Flask, MQTT)"
excerpt: "2-2 모바일&스마트 시스템 시간 기말 프로젝트 결과물. 초음파 센서와 LED를 사용했고 웹 서버와의 통신은 Flask와 MQTT브로커를 이용했다."

categories:
  - Project
tags:
  - [RaspberryPi, Python, Flask, MQTT]

toc: true
toc_sticky: true
 
date: 2021-12-20
last_modified_at: 2021-12-20
---


> 👀 2-2 모바일&스마트 시스템 시간 기말 프로젝트 결과물
기존 블로그(Tistory, Velog)에서 옮겨온 글 입니다.

[💙 Github 바로가기 💙](https://github.com/yuseon-Lim/tooth-brushing-monitoring-system)

## 주요 사용 기술

-   Flask(Python)
-   MQTT
-   Javascript
-   css

<br>

### 개발환경
- 라즈베리파이3 B+
-   Linux, 라즈비안

<br>

### 작품 동기

-   집에 부모가 없는 상황일 때, 아이가 양치질을 혼자 잘 하는지 걱정이 되는 부모를 위해 만든 장치이다. 집 화장실 칫솔 걸이가 있는 곳에 초음파센서를 자녀의 수 만큼 설치한다. 이 작품에서는 초음파센서와 LED를 각각 두 개를 사용하였다. 초음파센서를 활용하여 칫솔이 칫솔 걸이와 얼마만큼 떨어져 있는지를 측정하여 양치질하는 중인지, 안 하는 중인지 판단한다. 이 데이터를 토대로 양치질을 시작한 시간과 몇 분 동안 했는지에 대한 수행시간을 txt 파일에 기록한다. 또한, 각 초음파센서 옆에는 LED가 설치되어있어 칫솔 걸이에서 칫솔을 빼면 LED가 켜지게끔 하였다.데이터들을 원격 환경에서도 확인할 수 있도록 Python 프레임워크인 Flask와 Mosquitto MQTT broker를 사용했다. 이를 통해 웹 페이지에서 초음파센서별로 기록과 현재 상태를 확인할 수 있다.

<br>

### 시스템 구조

![](https://images.velog.io/images/dogakday/post/9931cfdd-e728-40f9-8742-35ee855288f8/image.png)

![](https://images.velog.io/images/dogakday/post/ef094308-4d6c-46e2-9692-5865f18b822f/image.png)

<br>

### 디렉터리 구조

![](https://images.velog.io/images/dogakday/post/a825e5bf-83d8-4db9-a2c8-e7dcb785e3d6/image.png)

<br>

### 구현 방법

-   라즈베리 파이에 초음파센서 2개, LED를 2개 사용
-   각GPIO핀은 다음과 같음
    
```python
LED(green) = 6
LED(red) = 13
trig1 = 23
echo1 = 24
trig2 = 12
echo2 = 16
```
    
-   **회로의 모습**  
   ![](https://images.velog.io/images/dogakday/post/3aa24e14-41b5-4da3-875e-60ae00561ba3/image.png)

<br>

### 소프트웨어

-   총 10개의 부분으로 설계(4개의 Python 코드)

#### **circuit.py**

```python
import time
import RPi.GPIO as GPIO

# 전역 변수 선언 및 초기화
trig1 = 23
trig2 = 12
echo1 = 24
echo2 = 16
green_led = 6  # 녹색 LED 첫째상태 표시
red_led = 13  # 적색 LED 둘째상태 표시

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(trig1, GPIO.OUT)
GPIO.setup(echo1, GPIO.IN)
GPIO.output(trig1, False)
GPIO.setup(trig2, GPIO.OUT)
GPIO.setup(echo2, GPIO.IN)
GPIO.output(trig2, False)
GPIO.setup(green_led, GPIO.OUT)
GPIO.setup(red_led, GPIO.OUT)

# 초음파 센서 값 측정


def measureDistance(child):

    global trig, echo

    # 초음파 센서 구분
    if child == 1:
        trig = trig1
        echo = echo1
    elif child == 2:
        trig = trig2
        echo = echo2

    GPIO.output(trig, True)  # 신호 1 발생
    time.sleep(0.00001)  # 짧은시간후 0으로 떨어뜨려 falling edge를 만들기 위함
    GPIO.output(trig, False)  # 신호 0 발생(falling 에지)

    while(GPIO.input(echo) == 0):
        pass
    pulse_start = time.time()  # 신호 1. 초음파 발생이 시작되었음을 알림
    while(GPIO.input(echo) == 1):
        pass
    pulse_end = time.time()  # 신호 0. 초음파 수신 완료를 알림

    pulse_duration = pulse_end - pulse_start
    return 340*100/2*pulse_duration

# 매개변수 'color'에 따라 다른 LED점등.

# 녹색 LED 켜기


def turnOnGreenLED():
    GPIO.output(green_led, True)

# 녹색 LED 끄기


def turnOffGreenLED():
    GPIO.output(green_led, False)

# 적색 LED 켜기


def turnOnRedLED():
    GPIO.output(red_led, True)

# 적색 LED 끄기


def turnOffRedLED():
    GPIO.output(red_led, False)

```

-   GPIO로 회로를 제어한다.

#### **calctime.py**

```python
import time
import circuit
from multiprocessing import Process

distanceStd = 4  # 양치질 유무의 기준이 되는 거리


# 각 초음파 센서의 정보를 각 파일에 저장
def storetotxt(nowTime, executionTime, child):

    if child == 1:
        filename = "./data/1.txt"
    elif child == 2:
        filename = "./data/2.txt"

    file = open(filename, 'a')
    data = "%s,%s\n" % (nowTime, executionTime)
    file.write(data)
    file.close()

# 자식 번호 구분하여 LED제어
def controlLED(onoff, child):
    if child == 1:
        if onoff == True:
            circuit.turnOnGreenLED()
        else:
            circuit.turnOffGreenLED()
    if child == 2:
        if onoff == True:
            circuit.turnOnRedLED()
        else:
            circuit.turnOffRedLED()

# 초음파 센서의 값으로 양치질 유무 판정 후 시간을 문자열로 변환함
def calcTime(child):
    active = False  # 현재상태 (False = 양치질 X)

    while(True):
        distance = circuit.measureDistance(child)  # 초음파 센서 측정
        global execution, nowTime, executionTime
        executionTime = None  # 실행 시간 init

        # 양치질 하고 있지 않을 때
        if active == False:
            # 양치질 시작
            if distance > distanceStd or distance == distanceStd:  # 초음파 센서에서 멀어짐 == 양치질 시작함
                active = True  # 양치질 하고 있는 상태
                controlLED(True, child)
                now = time.localtime()  # 시작 한 시간을 기준으로 타임라인 기록 위함
                # now로 받은 현재 시간을 nowTime에 저장
                nowTime = "%04d/%02d/%02d %02d:%02d" % (
                    now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min)
                start = time.time()  # 시작한 시간 초단위 저장

        # 양치질 안 할 때
        if active == True:
            # 양치질 끝남
            if distance < distanceStd:  # 초음파 센서에서 가까워짐 == 양치질 끝냄
                controlLED(False, child)
                end = time.time()  # 양치질 끝낸 시간 초단위 기록
                # 수행 시간 측정
                execution = end - start
                executionTime = "%2d분 %02d초" % (
                    execution / 60, execution % 60)
                active = False  # 양치질 멈춤 상태
                storetotxt(nowTime, executionTime, child)  # 파일에 저장

        time.sleep(1)


# calcTime(1)과 calcTime(2)를 동시에 돌리기 위해 사용
if __name__ == '__main__':
    Process(target=calcTime, args=(1,)).start()
    Process(target=calcTime, args=(2,)).start()

```

-   센서의 값을 가져와 계산하여 데이터를 저장하는 파이썬 코드이다. distanceStd로 기준 거리를 정의하고 이에 따라 distance를 계산하였다. active변수로 상태를 저장하고 이것이 변할 때의 시간을 data 디렉터리에 txt로 기록한다. 변하고, 다음으로 변할 때까지 시간이 얼마나 걸렸는지 또한 기록한다.

#### **app.py**

```python
from flask import Flask, render_template, request
app = Flask(__name__)

# 초기 홈페이지
@app.route('/')
def index():
    return render_template('index.html')

# 첫째 데이터 조회
@app.route('/old/', methods=['GET'])
def old():
    f = open('./data/1.txt', 'r')  # 파일 열기
    data = f.readline().strip()  # 한 줄씩 읽기
    dic = {}  # 빈 딕셔너리 생성

    while data:
        nowTime, executionTime = data.split(',')  # ',' 기준으로 문자열 분리
        dic[nowTime] = executionTime  # 딕셔너리에 저장
        data = f.readline().strip()

    f.close()
    return render_template('old.html', dict=dic)

# 둘째 데이터 조회
@app.route('/young/', methods=['GET'])
def young():
    f = open('./data/2.txt', 'r')  # 파일 열기
    data = f.readline().strip()  # 한 줄씩 읽기
    dic = {}  # 빈 딕셔너리 생성

    while data:
        nowTime, executionTime = data.split(',')  # ',' 기준으로 문자열 분리
        dic[nowTime] = executionTime  # 딕셔너리에 저장
        data = f.readline().strip()

    f.close()
    return render_template('young.html', dict=dic)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

```

-   웹 브라우저로부터 접속과 요청을 받아 처리하는 플라스크 앱이다.

#### **mqtt.py**

```python
# publisher

import time
import paho.mqtt.client as mqtt
import circuit  # 초음파 센서 입력 모듈 임포트

broker_ip = "localhost"  # 현재 이 컴퓨터를 브로커로 설정
distanceStd = 10

client = mqtt.Client()
client.connect(broker_ip, 1883)
client.loop_start()


def calcactive(distance):
    if distance > distanceStd or distance == distanceStd:
        return '하고'
    if distance < distanceStd:
        return '안 하고'


while(True):
    distance1 = circuit.measureDistance(1)
    msg1 = calcactive(distance1)
    distance2 = circuit.measureDistance(2)
    msg2 = calcactive(distance2)
    client.publish("old", msg1, qos=0)
    client.publish("young", msg2, qos=0)
    # client.publish("young", distance2, qos=0)
    time.sleep(1)

client.loop_stop()
client.disconnect()

```

-   Mosquitto MQTT broker로 실시간으로 publish/subscrib하여 토픽과 메시지를 주고받는 파이썬 코드이다. 토픽을 두가지로 설정하였다. 초음파센서의 값을 바로 보내는 것이 아니라 기준에 따라 한번 분류 한 후 정한 메시지를 보내도록 하였다.

#### **index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>충치 예방 프로그램</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js" type="text/javascript"></script>
        <script src="/static/mqttio.js" type="text/javascript"></script>  
        <link rel="stylesheet" type="text/css" href="/static/indexstyle.css">
        <script>
              window.addEventListener("load", function () {
                  // http://224..129:8080/에서 224...의 IP만 끊어내는 코드
                  var url = new String(document.location);
                  ip = (url.split("//"))[1]; // ip = "224...:8080/"
                  ip = (ip.split(":"))[0]; // ip = "224..."
                  document.getElementById("broker").value = ip
              });
        </script>
     </head>

<body>
    <h1>우리 아들,딸의 충치를 예방해 봅시다!</h1>
    <div class="manual"># 활용 방법 #
        <ol>
            <li>IP를 입력하세요. 포트 번호는 9001 입니다.(입력 할 필요 없음)</li>
            <li>첫째면 Topic에 "old", 둘째면 "young"을 입력하세요.</li>
            <li>"확인"버튼을 눌러 현재 활동 상태를 확인하세요.</li>
        </ol>
        <ul>
            <li>"기록조회"메뉴에서 버튼을 누르면 기록을 확인 할 수 있습니다.</li>
            <li>우측 상단의 버튼을 눌러 이 화면으로 다시 돌아오세요.</li>
        </ul>
    </div>
    <br><br>
    <div class="info-box">
    <div class="info-now">
    <span class="title">현재 상태 확인</span>
    <form id="connection-form">
        <input class="connection-input" id="broker" type="text" name="broker" placeholder="IP adress"><br>
        <input class="connection-input" id="port" type="text" name="port" value="9001"><br>
        <input class="connection-input" id="topic" type="text" name="topic" placeholder="old or young"><br>
        <input class="connection-input" type="button" onclick="startConnect()" value="확인"><br>
    </form>
    <p>
    <span id = "topicName"></span>는(은) 지금 양치질을 <span id="messages"></span>있습니다.
    </p><br>
    </div>

    <div class="info-history">
    <span class="title">기록 조회</span><br>
    <form class="view" action="/old/" method="get" >
        <input type="submit" value="첫째">        
    </form>
    <form class="view" action="/young/" method="get" >
        <input type="submit" value="둘째">        
    </form>
    </div>
    </div>

</body>
</html>
```

-   사용방법과 인덱스를 보여주는 웹페이지이다.

#### **old.html**

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>첫째 정보 조회</title>
<link rel="stylesheet" type="text/css" href="/static/tablestyle.css">
</head>
<body>
<h3>첫째 기록</h3>
<form action="/" method="get">
<input type="submit" value="처음으로 돌아가기">
</form>
<table>
    <thead>
        <tr><th>시작 시간</th><th>수행 시간</th></tr>
    </thead>
    <tbody>
        {% raw %}{% for key in dict : %}
    <tr>
        <td>{% print(key) %}}</td>
        <td>{% print(dict[key]) %}</td>
    </tr>
        {% endfor %}{% endraw %}
    </tbody>
</table>
</br>
</body>
</html>
```

-   자녀1의 정보를 보여주는 웹페이지이다.

#### **young.html**

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>둘째 정보 조회</title>
<link rel="stylesheet" type="text/css" href="/static/tablestyle.css">
</head>
<body>
<h3>둘째 기록</h3>
<form action="/" method="get">
<input type="submit" value="처음으로 돌아가기">
</form>
<table>
    <thead>
        <tr><th>시작 시간</th><th>수행 시간</th></tr>
    </thead>
    <tbody>
        {% raw %}{% for key in dict : %}
    <tr>
        <td>{% print(key) %}}</td>
        <td>{% print(dict[key]) %}</td>
    </tr>
        {% endfor %}{% endraw %}
    </tbody>
</table>
</br>
</body>
</html>
```

-   자녀2의 정보를 보여주는 웹페이지이다.

#### **mqttio.js**

```js
function startConnect() { // 접속을 시도하는 함수
    clientID = "clientID-" + parseInt(Math.random() * 100); // 랜덤한 사용자 ID 생성

    // 사용자가 입력한 브로커의 IP 주소와 포트 번호 알아내기
    broker = document.getElementById("broker").value; // 브로커의 IP 주소
    port = document.getElementById("port").value; // 브로커의 포트 번호

    // MQTT 메시지 전송 기능을 모두 가징 Paho client 객체 생성
    client = new Paho.MQTT.Client(broker, Number(port), clientID);

    // client 객체에 콜백 함수 등록
    client.onConnectionLost = onConnectionLost; // 접속이 끊어졌을 때 실행되는 함수 등록
    client.onMessageArrived = onMessageArrived; // 메시지가 도착하였을 때 실행되는 함수 등록

    // 브로커에 접속. 매개변수는 객체 {onSuccess : onConnect}로서, 객체의 프로퍼틴느 onSuccess이고 그 값이 onConnect.
    // 접속에 성공하면 onConnect 함수를 실행하라는 지시
    client.connect({
        onSuccess: onConnect,
    });
}

// 브로커로의 접속이 성공할 때 호출되는 함수
function onConnect() {
    topic = document.getElementById("topic").value; // 사용자가 입력한 토픽 문자열 알아내기
    client.subscribe(topic); // 브로커에 subscribe
}

// 접속이 끊어졌을 때 호출되는 함수
function onConnectionLost(responseObject) { // 매개변수인 responseObject는 응답 패킷의 정보를 담은 개체
    document.getElementById("messages").innerHTML = '<span>오류 : 접속 끊어짐</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML = '<span>오류 : ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// 메시지가 도착할 때 호출되는 함수
function onMessageArrived(msg) { // 매개변수 msg는 도착한 MQTT 메시지를 담고 있는 객체
    console.log("onMessageArrived: " + msg.destinationName);
    if (msg.destinationName == "old"){
        name = "첫째";
    }
    else if (msg.destinationName == "young"){
        name = "둘째";
    }
    // 도착한 메시지 출력
    document.getElementById("topicName").innerHTML = '<span>' + name + '</span>';
    document.getElementById("messages").innerHTML = '<span>' + msg.payloadString + '</span>';
}

// disconnection 버튼이 선택되었을 때 호출되는 함수
function startDisconnect() {
    client.disconnect(); // 브로커에 접속 해제
    document.getElementById("messages").innerHTML = '<span>Disconnected</span><br/>';
}

function getTopic(msg) { // 매개변수 msg는 도착한 MQTT 메시지를 담고 있는 객체
    // topic에따라 다른 메세지 출력
}
```

-   MQTT통신을 가능하게 이벤트를 처리 하는 자바스크립트 코드이다.

#### **indexstyle.css**

```css
.manual { /* 활용 방법 div박스 */
  box-sizing: content-box;
  border-style: solid;
  border-width: 2px 2px 2px 8px;
  border-color: rgb(61, 97, 255);
  background-color: rgb(228, 233, 255);
  padding: 12px;
  word-break: break-all;
}
.view { /* div박스를 나란히 한줄에 있게 해줌 */
  display: inline;
}

.info-box { /* 정렬을 위함 */
  text-align: center;
  width: 90%;
  margin: 10px auto;
  display: flex;
}

.info-now { /* MQTT통신 나타내는 박스 */
  border: 1px solid navy;
  float: left;
  width: 50%;
  box-sizing: border-box;
}

.info-history { /* 기록 조회 index */
  border: 1px solid navy;
  float: left;
  margin-left: 5%;
  width: 50%;
  box-sizing: border-box;
}

.title { /* 여백 주기 위함 */
  display: inline-block;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
}

#connection-form {
  margin: 10px;
}

.connection-input { /* ip,port,topic input스타일 */
  font-size: 15px;
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-bottom: 1.3px solid;
  border-color: rgba(93, 93, 93, 0.774);
  width: 70%;
}

.connection-input:focus { /* 클릭했을 때 효과 제거 */
  outline: none;
}

.connection-input[type="button"] { /* 확인 버튼 꾸미기 */
  border: none;
  padding: 10px;
  font-size: 15px;
  width: 75%;
}

input[type="submit"] { /* 자식 구분하는 submit버튼 */
  margin: 70px 10px;
  padding: 20px 20px;
  font-size: 18px;
  border: none;
  border-radius: 150px;
  background-color: rgb(255, 177, 168);
}

#topicName,
#messages { /* 강조를 하기 위함 */
  font-weight: 700;
  color: purple;
  display: inline;
}

```

#### **tablestyle.css**

```css
table { /* table 스타일 */
  width: 100%;
  border-collapse: separate;
  text-align: center;
  line-height: 1.5;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-spacing: 1px;
  margin: 20px 10px;
}
thead { /* 제목 부분 */
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  background-color: rgb(255, 123, 152);
  margin: 20px 10px;
}
th {
  width: 100px;
  padding: 10px;
}
td {
  width: 400px;
  padding: 10px;
}
tr { /* 애니메이션 효과 */
  transition: 1s;
}
tbody tr:nth-child(even) { /* 짝수 <tr>에 적용*/
  background: rgb(243, 243, 243);
}
tbody tr:hover { /* 마우스가 올라오면 pink 배경 */
  background: pink;
}

h3 {
  float: left;
  margin: 10px;
}

input { /* 처음으로 돌아가기 버튼 */
  float: right;
  border-radius: 10px;
  border: 0;
  outline: 0;
  background-color: rgb(205, 160, 226);
  padding: 10px;
}

```

<br>

### 실행 과정

```shell
mosquitto -c /etc/mosquitto/moquitto.conf&
python3 calctime.py&
python3 mqtt.py&
python3 app.py
```

-   실행 후 라즈베리파이 ip로 웹 브라우저에서 접속  
   ![](https://images.velog.io/images/dogakday/post/3e859666-6125-484d-82a6-f5381efd1ae9/image.png)
- 이런 화면이 나온다.

<br>

#### LED모습

-   **둘 다 켜짐 (둘 다 양치질 하는중)**

![](https://images.velog.io/images/dogakday/post/189aa666-4bd5-4b07-a52f-20a7cba40402/image.png)

-   **자녀1 양치질 함 / 자녀2 안함**

![](https://images.velog.io/images/dogakday/post/a18f5d08-adf8-4bb8-8011-efb5e1121620/image.png)

-   **자녀1 양치질 안함 / 자녀2 함**

![](https://images.velog.io/images/dogakday/post/ccbd6e0e-1a5a-4124-a000-0577856f5f82/image.png)

-   거리가 멀어지면 LED가 점등된다. (칫솔걸이와의 거리가 멀어지면 양치질을 하고 있는 중이기 때문)
-   가까워지면 LED 소등
-   초음파센서에 따라 각각 다른 LED제어
-   양치질 안하고있음 -> 하고있음, 하고있음 -> 안하고있음 각각 상태 바뀔때마다 이것의 기록을 /data/txt파일들에 저장. 양치질 시작 시간과 수행 시간을 저장한다.
-   **/data/1.txt (자녀1 데이터 저장 모습)**

![](https://images.velog.io/images/dogakday/post/8bc46436-9d9b-4e2e-9d93-dbe68f7da94e/image.png)

<br>

#### MQTT통신 모습

-   초음파 센서 종류와(2개니까) 초음파센서와의 거리에 따라 다른 메세지가 나타난다  
   ![](https://images.velog.io/images/dogakday/post/bac8d485-074f-4ca7-b112-2adb5192395b/image.png) 
   ![](https://images.velog.io/images/dogakday/post/430b7fb2-0a44-47a7-bf3c-2fcc5436dac1/image.png)
   ![](https://images.velog.io/images/dogakday/post/14fc18e8-a773-41f2-9b78-0f7539241956/image.png)![](https://images.velog.io/images/dogakday/post/c9c16533-e85a-4fe3-b776-e435f726bc09/image.png)

<br>

#### 기록 불러오는 모습

![](https://images.velog.io/images/dogakday/post/dd556fa1-fbfb-47f0-9499-8aa60c8ee59c/image.png)

![](https://images.velog.io/images/dogakday/post/2e4fcb93-3a98-4403-93b4-9b1909c24935/image.png)

<br>


## 끝내며
포스트를 옮겨 적는 지금 보면 매우 유치해보이는 미니미니 프로젝트이지만 생각해보면 이때 정말 열심히 했던거같다. 라즈베리파이를 만져보는게 매우 재미있었고.. 웹 서버 라는것을 처음 써봤다. 이걸 계기로 한이음 프로젝트까지 라즈베리파이로 하게 되었고 이 덕분에 좀 더 수월하게 프로젝트를 하고 있는 것 같다. 뭐든 열심히하면 도움이 된다 :) 지금 하고있는 한이음 프로젝트도 성공적으로 끝내서 요악하는 포스트를 적는 날이 왔으면..!

<br>

[💙 Github 바로가기 💙](https://github.com/devyuseon/tooth-brushing-monitoring-system)

<br>