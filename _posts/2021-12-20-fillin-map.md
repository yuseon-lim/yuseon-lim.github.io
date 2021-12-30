---
title:  "[Project] Fillin-Map 안드로이드 앱"
excerpt: "첫번째 안드로이드 앱 개발기🔥, 추억이 담긴 사진을 지도 형태로 저장하고 공유할 수 있는 지도 채우기 앱. Kotlin으로 개발했다.
어떤 앱이며, 어떻게 개발했고 개발 후에 느낀점은 무엇인지 까지 담았다😊"

categories:
  - Project
tags:
  - [Android, Kotlin, Firebase]

toc: true
toc_sticky: true
 
date: 2021-12-20
last_modified_at: 2021-12-20
---

# 🌝 앱 소개
Fillin-Map은 빈 지도를 사진이나 색으로 채우고, 그것을 친구들과 공유 할 수 있는 안드로이드 앱이다.

# 🌑 개발 동기
학교 공학경진대회를 나가게 되었고, 3-1에 안드로이드 수업을 들었는데 한 번 앱을 만들어 보고 싶었다.

한때 아이패드나 포토샵으로 빈 지도를 색이나 사진으로 채우는 것이 유행했었다. 나도 굿노트 형광펜 기능으로 지도를 채워 본 경험이 있다. 사진으로 채우고 싶었으나 픽스아트로 사진 불러와서 지우고.. 이런 과정이 귀찮아서 안했다.

요즘 코로나때문에 여행을 못가는데, 쉽게 여행을 지도 형태로 기록하고, 계획하고 그것을 친구들끼리 공유할 수 있다면 좋지 않을까? 하는 생각에서 만들게 되었다. 비슷한 앱이 있나 찾아봤는데, 잘 만든 앱이 하나 있었으나 이건 친구들과 공유 기능이 없었다. 그래서 우리가 만들었다!

# 🌒 Build With..
- 언어: Kotlin 1.5.21
- 환경: Android Studio 11.0
- DB: Firebase
- 라이브러리
  - [Glide](https://bumptech.github.io/glide/)
  - [Material Design Components](https://mvnrepository.com/artifact/com.google.android.material/material)
  - [RichPathView](https://github.com/tarek360/RichPath)
  - [ColorPicker](https://github.com/Dhaval2404/ColorPicker)
  - [Android Image Cropper](https://github.com/ArthurHub/Android-Image-Cropper)


# 🌓 전체적인 구조
<center>
<img src="https://images.velog.io/images/dogakday/post/1dae7e96-725b-4f2f-b356-06551ed5778d/image.png" width="90%">
</center><br>
bottom navigation 으로 세 개의 Fragment를 navigate 한다.


# 🌔 지도 화면
<p align="center">
<img src="https://user-images.githubusercontent.com/67352902/134122409-953b8ded-3d34-4eb0-9b63-bed2c9790f8e.png"></p><br>


## 지도 구현
앱에서 가장 메인 기능이다. 절차는 이렇다

1. 사용자가 지역 클릭
2. 사진으로 채우기 선택할 경우
2-1. 갤러리 액티비티에서 사진 선택
2-2. firebase에서 미리 올려놓은 pathData를 가져옴
2-3. 가져온 pathData 이용해 CustomView 이용해 Bitmap모양대로 Crop
2-4. Crop한 이미지 이미지뷰 부착
2-5. 부착된 이미지 firebase에 업로드
3. 색으로 채우기 선택할 경우
3-1. 색 팔레트가 나열되어있는 액티비티에서 색상 선택
3-2. path객체의 `fillcolor`로 선택한 색상 적용
3-3. txt형태로 firebase storage에 업로드
4. 지도 다시 로드 할 때(앱에 다시 접속하거나 할 때) firebase에서 이미지, 색상 정보 불러와 지도에 적용

여기서 짚고 넘어가야 할 것들에는..


## [지도별 클릭리스너 구현](https://devyuseon.github.io/android/clicklistener-by-path/)
블로그에 자세하게 정리 해 놓았다.


## 지도 목록 관리
![](https://images.velog.io/images/dogakday/post/6ef3a21e-f78b-4ab4-a622-c656af882208/image.png){: .align-center}
MVVM 패턴과 리사이클러뷰를 사용해 관리했다😋. 맵의 고유 아이디는 Java의 UUID 클래스를 이용했다.

![](https://images.velog.io/images/dogakday/post/c1cc6b94-84dd-4445-ba38-7df063d04461/image.png){: .align-center}
Firebase Cloud Firestore에 이렇게 올라가있는 `ArrayList<Map<MapListItem>>` 을 `MapViewModel`로 가져온다. 앱 전체를 소개하는 과정이기에 자세한 코드는 생략했다. 전체 소스코드는 [여기.](https://github.com/HSUITContestTeam/fillin-map/blob/main/app/src/main/java/com/hsu/mapapp/map/MapViewModel.kt)

```kotlin
class MapViewModel : ViewModel() {
    var mapLiveData: MutableLiveData<ArrayList<MapItemList>> =
        MutableLiveData()

    private var firestore: FirebaseFirestore? = null
    private var uid = FirebaseAuth.getInstance().currentUser?.uid

    init {
        mapLiveData = fetch()
    }

    fun fetch(): MutableLiveData<ArrayList<MapItemList>> {
        // 생략
        return mapLiveData
    }

    fun add(mapItem: MapItemList) {
       // 생략
    }

    fun delete(pos: Int, mapId: String) {
        // 생략
    }

    fun editTitle(pos: Int, title: String) {
		// 실패. 자세한 이유는 아래..
    }
}
```
이걸 Fragment에서 Observe한다.
```kotlin
 val dataObserver: Observer<ArrayList<MapItemList>> =
            Observer { liveData ->
                data.value = liveData
                mapAdapter = MapAdapter(data)
                binding.MapListRecyclerView.adapter = mapAdapter
                mapAdapter.notifyDataSetChanged()
		
        	// 생략...
            }

mapViewModel.mapLiveData.observe(viewLifecycleOwner, dataObserver)
```
이렇게 observe하고, 변경사항이 생기면 adapter에 notify한다.


## 지도 전환
![](https://images.velog.io/images/dogakday/post/9eda3656-cdfa-4f58-9b96-8774641011fd/image.png){: .align-center}

여기서 지도 목록은 리사이클러뷰이고, FragmentTransaction을 이용해 FragmentContainerView를 선택한 종류의 지도 프래그먼트로 교체했다.


# 🌕 프로필/친구목록/친구검색
![](https://images.velog.io/images/dogakday/post/5d73a981-68ca-4d3e-b4d6-1ec532d5d78c/image.png){: .align-center}

프로필 화면은 Image Cropper라이브러리로 사진을 크롭하여 설정하게 했고, 회원정보는 Firebase Cloud Firestore와 Firebase Authentication를 이용해 관리했다.

친구목록은 리사이클러뷰를 이용했다. 내가 구현 한 부분은 아니라 ;-; 라이브 데이터를 적용해서 실시간으로 바뀌게 하는것을 제안하고 싶었으나 개발 기간이 두달 미만이라.. 못했다.

검색 화면 또한 리사이클러뷰를 이용했다. 저기서 친구추가 버튼을 누르면 해당 user의 화면에서 dialog가 뜬다. 거기서 수락을 누르면 서로 친구가 된다. 이또한 Firebase로 관리했다.


# 🌖 지도 공유
친구 목록에서 친구를 클릭하면 지도 화면으로 넘어가는데, 이때 지도를 열람 할 수 있다. 이건 지도화면의 MVVM패턴을 그대로 재사용해서 지도 수정 기능만 제거했다.


# 🌗 아쉬운점..
개발 기간이 2개월도 채 되지 않았고, 안드로이드 개발이 팀원 모두 처음이며 깃 사용도 서툴었다. 그래서 아쉬운점은 정말 정말 많다. 지금 생각나는것만 적어보자면,

- 지도 목록 미리보기 이미지 실시간 적용, 지도제목 변경
  - 이건 앞에서 언급했는데, 이 기능을 구현하는걸 실패했다. 이유는
  ![](https://images.velog.io/images/dogakday/post/c1cc6b94-84dd-4445-ba38-7df063d04461/image.png){: .align-center}
  여기서 Array의 item을 삭제하거나 추가하는 것은 가능하다. 하지만 예를들어 mapList의 0번째 원소의 mapTitle을 수정하거나 하는 것은 firebase에서 허용하지 않았다;;.. 난 이걸 못하는게 내 실력 부족인줄 알고 계속 찾아보고 물어보고 검색했지만 프로젝트를 마무리 할 무렵 이걸 하는것 자체가 불가능 하다는 것을.. 알게되었다😥
  - 이건 Firebase의 Realtime Database를 사용하거나, Cloude storage 구조를 바꾸는것으로 해결 할 수 있다. 라는것을 알지만 시간관계상 못했다.
- MVVM패턴 구현하는 것에서 Repository 분리 안함
  - 분리해서 구현했을때 오류가 발생해서 뷰모델에 다 넣어버렸다. 다음에 개발 할 때는 뷰모델, 라이브데이터를 더 잘 이해해서 이런 일은 발생하지 않도록 할것이다.
- 앞에서도 언급했지만 친구목록 라이브데이터 사용을 안한것이 아쉽다.
- 친구 요청 목록을 따로 만들어 지금 당장 수락하지 않더라도 조금 더 생각했다가 수락하게끔 하고싶다.
- 이때는 스레드에 대한 개념이 부족했다. 다시 만든다면 스레드를 활용하여 다양한 기능이 동시에 이루어 질 수 있도록 할것이다.
- 핵심 View들을 모두 Fragment로 구현했다. 이것이 과연 이상적이고 깔끔한 안드로이드 아키텍쳐가 맞는지에 대한 의구심이 든다. 더 공부해야할 것 같다.


# 🌘 안드로이드 해보니까 어땠나~
지금 안드로이드를 해야하나 웹 백엔드를 해야하나 갈팡질팡 하는 중이다 ㅋㅋ 이것저것 다 해보고 결정하자 라고 생각해서 시작한건데, 안드로이드 꽤 재밌다! 안드로이드 스튜디오가 무거워서 답답한거 빼고 다 좋다. 코틀린도 아주 맘에드는 언어다. 코틀린으로 수업하는 학교는 거의 없는 것으로 알고있는데, 매학기 새롭게 업데이트 된 내용으로 수업 내용을 구성해주시는 교수님 덕이다. 매우매우 감사한다. 학기중 수업에서 배운 내용 덕에 추가적인 학습 없이도 바로 안드로이드 앱을 개발할 수 있었다.

다만 아직 안드로이드 기본만 해본거고 네트워크 통신이나 스레드 관리등 배울것이 아주 많기때문에 이걸로 다 안게 아니다. 더 공부해야한다 !! 🏃‍♂️


# [🧡 Github 링크 🧡](https://github.com/HSUITContestTeam/fillin-map)
아직은 미배포 상태이고, 배포할 생각이 있다.

그리고 공학경진대회 출품작이라.. 부끄럽지만 제출한 영상이 있다ㅎㅎ
- [🎤 시연영상](https://www.youtube.com/watch?v=bkH-0xRsxOM)
- [🎤 설명영상](https://www.youtube.com/watch?v=R4jrzsnGyE0)

+) 결과는 장려상 수상😊


