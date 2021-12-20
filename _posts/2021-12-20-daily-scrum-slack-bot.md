---
title:  "[Project] 간단한 데일리 스크럼 슬랙 봇👾 개발 (Python, Heroku)"
excerpt: "매일 같은 시간에 정해진 내용을 보내는 슬랙 봇. Python과 Heroku로 만들었다!"

categories:
  - Project
tags:
  - [Python, Heroku]

toc: true
toc_sticky: true
 
date: 2021-12-20
last_modified_at: 2021-12-20
---

## 😜 서론
한이음 프로젝트를 진행하면서 Slack을 사용 중인데, 데일리 스크럼처럼 운영 해 볼까? 하는 생각이 들자 정한 시간에 맞춰서 한 일, 할 일, 어려운 일을 공유 할 수 있는 봇이 있으면 좋을 것 같다고 생각했다. 이 참에(~~시험공부도 하기 싫고 잠도 안오고~~) 간단한 슬랙 봇을 한번 개발 해보려 한다.

## 슬랙 봇 생성
1. https://api.slack.com/apps 에서 **Create an App** 클릭
![](https://images.velog.io/images/dogakday/post/0ec4efb5-f47b-4805-bad1-5c4ec682cc2c/image.png){: .align-center}
2. **App name**과 **Development Slack Workspace** 입력
![](https://images.velog.io/images/dogakday/post/b9e066dd-e175-4107-aa7f-326d4fbcfd81/image.png){: .align-center}
3. 만들어진 봇을 누르고, **Permission** 에서 권한 설정
![](https://images.velog.io/images/dogakday/post/ce18b579-ad0c-46e5-8019-82938d5bacde/image.png){: .align-center}
[링크](https://api.slack.com/methods) 에 API Method가 나와있는데, 일단 슬랙에 메세지를 보내는것이 필요하기 때문에 `chat:write` 권한을 추가해 주었다. 이는 수정할 수 있으므로 일단 이렇게 진행한다.
![](https://images.velog.io/images/dogakday/post/aab27694-c510-4fb6-94d1-4145c2784476/image.png){: .align-center}
4. 페이지 상단의 이 버튼을 눌러서 workspace에 봇을 install 한다.
![](https://images.velog.io/images/dogakday/post/23f49de2-42f9-4a9c-bd83-54fae47101c7/image.png){: .align-center}
이때 
![](https://images.velog.io/images/dogakday/post/8c705ccb-8c95-4380-8c33-04c0d6743c70/image.png){: .align-center}
여기서 토큰을 복사해 둔다.
5. 해당 슬랙 채널에서 꼭 **Add apps** 해줘야 한다.
![](https://images.velog.io/images/dogakday/post/f22348cb-9c8a-446d-b278-c5af84ab9351/image.png){: .align-center}


## 메세지 보내보기
`slacker` 를 설치하고 'Hello!'를 보내봤다.
![](https://images.velog.io/images/dogakday/post/1467b67c-369a-4a28-9922-f3c11754a3d2/image.png){: .align-center}
띠용쓰.. 찾아보니 슬랙의 정책이 바뀌어 이제는 slacker의 사용이 안된다고 한다. 


[여기](https://api.slack.com/messaging/sending#publishing){: .align-center} 나와있는 HTTP 방식으로도 가능하다. 파이썬의 `request` 모듈을 이용해 POST 방식으로 request 를 보냈다. 

```python
def post_message(slack_token, channel_id, msg):
    url = "https://slack.com/api/chat.postMessage"

    data = {'Content-Type': 'application/x-www-form-urlencoded',
        'token': slack_token,
        'channel': channel_id, 
        'text': msg
        }
     
    res = requests.post(url, data = data)
    print(res)
```
성공하면 이렇게 출력된다.
![](https://images.velog.io/images/dogakday/post/76dafab6-0849-4a9d-869b-1ba4b4f80961/image.png){: .align-center}

response 200 이 떴는데도 슬랙에 메세지가 가지 않아서 엄청 삽질했는데,
![](https://images.velog.io/images/dogakday/post/672e189b-eb55-485e-94a6-23f8bd755552/image.png){: .align-center}
채널에 따로 Add apps를 안해주어서 였다. 이걸 보시는 분들은 잊지 않고 꼭 꼭 해주세요!

![](https://images.velog.io/images/dogakday/post/1c80b4af-ac4f-4601-aed7-eebc8eef75ae/image.png){: .align-center}
이제 잘 된다. ㅋㅋㅋ
이제 남은것은 오늘 날짜를 포함해서 메세지를 보내고, 이걸 주기적으로 해주는 것.


## Heroku로 배포 (Python)
1. [여기](https://devcenter.heroku.com/articles/getting-started-with-python){: .align-center} 에 나와있는 순서대로 하면 된다.
2. 각 OS에 맞는 설치를 진행한다.
![](https://images.velog.io/images/dogakday/post/41c1b481-c256-44eb-9442-625f06f2eb05/image.png){: .align-center}
3. cmd창에서(window) 로그인 한다. 아무 키나 누르면 로그인 페이지가 뜨고 로그인 하면 아래 페이지가 보인다.
![](https://images.velog.io/images/dogakday/post/98f9aab1-cad0-4712-8380-ca8f46920fcf/image.png){: .align-center}
![](https://images.velog.io/images/dogakday/post/599da13b-b082-416f-b1d8-69fb555a50b7/image.png){: .align-center}
4. git clone 한다
```shell
git clone https://github.com/heroku/python-getting-started.git
cd python-getting-started
```
5. **requirments.txt** 가 있어야 한다. 이게 가상 환경에서 작업한 이유이다.
```shell
pip freeze > requirements.txt
```
6. create 해준다.
```shell
heroku create
```
7. Procfile 설정을 해 주어야 한다. 
```shell
echo "worker: python bot.py" > Procfile
```
어떤 파일을 실행 할 지 명시해준다.

8. 환경변수 설정을 해준다
```shell
heroku config:set SLACK_BOT_TOKEN=xoxb-아까 발급받은 토큰
```
![](https://images.velog.io/images/dogakday/post/633ced50-03e2-4b46-8bba-0c142d4353e9/image.png){: .align-center}
```shell
heroku config
```
로 환경변수가 잘 설정되었는지 확인한다.
![](https://images.velog.io/images/dogakday/post/b46e4141-7610-4edf-ae17-44e5c0b18b3c/image.png){: .align-center}
9. 주기적으로 실행해야 하니까 add-on tab에서 아래 스케줄러를 검색해서 추가해준다. 무료긴 하지만 카드 등록 해줘야한다.
![](https://images.velog.io/images/dogakday/post/7a33239b-9377-4247-ae63-83280cc17c77/image.png){: .align-center}
10. add jobs 해준다. 테스트할거라 10간격을 10분으로 설정해줬다.
![](https://images.velog.io/images/dogakday/post/5e2d586d-98cb-4ade-96db-c272117f206c/image.png){: .align-center}
![](https://images.velog.io/images/dogakday/post/6279e3b1-4f0d-4b59-86b7-00926324baf3/image.png){: .align-center}
11. 대망의 배포
```shell
git push origin main
```
## 에러해결
push 하는데 뭔가 문제가 있었다.
![](https://images.velog.io/images/dogakday/post/a4157e8c-0699-4b25-8ff4-49bb1be3b759/image.png){: .align-center}
![](https://images.velog.io/images/dogakday/post/7331b45d-b4b0-49d7-87c4-f6180a83935d/image.png){: .align-center}

- [공식문서](https://devcenter.heroku.com/articles/python-support) 를 따라 buildpack을 다시 설정해주고
- Prodcfile, requirements.txt, runtime.txt를 다시 설정해주었다.
  
```shell
# Procfile
web: gunicorn gettingstarted.wsgi
worker: python bot.py

# requirements.txt
aiohttp==3.7.4.post0
async-timeout==3.0.1
attrs==21.2.0
certifi==2021.5.30
chardet==4.0.0
idna==2.10
multidict==5.1.0
requests==2.25.1
slackclient==2.9.3
typing-extensions==3.10.0.0
urllib3==1.26.5
yarl==1.6.3

# runtime.txt
python-3.9.5
```

- Procfile root 디렉토리가 아니라, python-getting~ 에 있어야 함. (.gitignore 있는 그 곳)
- git init 부터 remote 다시 설정 ~
- `heroku git:remote -a [프로젝트id]` 도 꼭 해주도록 합시다!

![](https://images.velog.io/images/dogakday/post/aa66f6db-6525-43ea-af6d-e111fe81d5b4/image.png){: .align-center}
![](https://images.velog.io/images/dogakday/post/f9886870-cb76-46fd-9a4b-1fddf342145e/image.png){: .align-center}

성공했다😭

## 💕 완성된 소스코드
```python
import requests
from datetime import date

def post_message(slack_token, channel_id, msg):
    url = "https://slack.com/api/chat.postMessage"

    data = {'Content-Type': 'application/x-www-form-urlencoded',
        'token': slack_token,
        'channel': channel_id, 
        'text': msg
        }
     
    res = requests.post(url, data = data)
    print(res)

def make_msg():
    today = date.today()
    today_str = str(today.year) + "년 " + str(today.month) + "월 " \
        + str(today.day) + "일 Daily Scrum 입니다."

    msg = today_str + """
    - 오늘까지 내가 완수한 일
    - 내일까지 내가 하기로 한 일
    - 현재 곤란하고 어려운 일
에 대해 이야기 해 봅시다 :)
    """
    return msg

 
if __name__ == '__main__':
    slack_token = "토큰"
    channel_id = "C016HP1059B"
    post_message(slack_token, channel_id, make_msg())
```

> [❤ Github 링크 ❤](https://github.com/yuseon-Lim/daily-scrum-slack-bot)

## 참고자료
- https://ugaemi.com/slack/Deploy-simple-slack-bot/
- https://nanchachaa.tistory.com/77
- https://api.slack.com/methods/chat.postMessage
- https://velog.io/@chosh/Slack-%EB%B4%87-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%A9%94%EC%8B%9C%EC%A7%80-%EB%B3%B4%EB%82%B4%EA%B8%B0
- http://hleecaster.com/sending-messages-to-slack-channel-using-python/
- https://developerdk.tistory.com/96