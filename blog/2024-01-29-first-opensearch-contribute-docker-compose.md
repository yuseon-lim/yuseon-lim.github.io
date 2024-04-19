---
title: 오픈소스 첫 기여 ✨
description: 에러가 발생하지 않았는데, 클라이언트는 서버의 응답을 받지 못했다. 이유를 찾아보자 !
tags:
  - docker
  - opensource-contributions
hide_table_of_contents: false
---

비록 공식문서의 오류를 고치는 일이였지만,

처음으로 오픈소스에 기여했고 무려 Docker 문서 이다!!

머지 되었을때는 정말 뿌듯했고 이슈를 생성하고 PR을 날리는 과정도 재밌었다.

<!-- truncate -->

## 문제 발견, 이슈 생성

![](../static/img/post-img/20240205204509.png)

문서에 틀린 부분을 발견하고, 이슈를 생성했다.

수정이 필요한게 맞다면 내가 작업해도 되는지 물어봤다.

![](../static/img/post-img/20240205204536.png)

assgin 해주셨고, 문서 위치가 바뀌었으니 compose-spec 레포지토리에서 PR을 해달라는 친절한 가이드까지 주셨다.

## Pull Request 생성하기

먼저 compose-spec을 fork하고, 소스코드 수정 후 commit 했다.

![](../static/img/post-img/20240205204610.png)

다시 upstream으로 와서 pull request를 생성했다.

![](../static/img/post-img/20240205204624.png)

이건 내가 CONTRIBUTING.md를 꼼꼼히 보지 않아 생긴 일이다. ㅜㅜ

그냥 커밋할때 계정 정보를 확인해달라는 말인 줄 알았는데,

커밋 메세지에 sign-off를 포함하지 않으면 DCO check에 실패 하면서 오류가 난다.

친절히 알려주셔서 커밋 메세지 수정 후 강제 푸시했고,

이후 빌드에 한 번 실패해 한가지 수정을 더 하고 머지되었다.

![](../static/img/post-img/20240205204639.png)

![](../static/img/post-img/20240205204646.png)

이렇게 오픈소스 기여에 작지만 위대한 첫 걸음을 내딛었다.

앞으로도 문서 뿐만 아니라 코드 레벨까지 .. 더 많은 오픈소스에 기여할 수 있게 되면 좋겠다.
