---
published: true
title:  "[Android] VectorDrawable path별로 클릭리스너 구현하기 (Kotlin)"
excerpt: "VectorDrawable의 각 path별로 클릭리스너를 구현해 보았다."

categories:
  - Android
tags:
  - [Android, Kotlin]

toc: true
toc_sticky: true
 
date: 2021-12-30
last_modified_at: 2021-12-30
---

> 이전 블로그(velog)에서 옯겨 온 글입니다.

# 서론
안드로이드 **지도채우기** 어플을 개발하는 중이다.
<img src="https://images.velog.io/images/dogakday/post/253fb59e-8c9d-4ff8-b132-7a47d00a3fc8/image.png" width="300" height="300">{: .align-center}
이런 지도에 여행갔던 곳을 색칠하거나 사진으로 채우는 앱인데, 저 지도를 구현하는게 정말~ 골치아팠다. 포토샵으로 이미지뷰를 다 따서 조립하느냐,, 어떻게하지 하다가 **SVG** 라는 이미지 포맷이 있다는것을 알게되었다.

또한 SVG -> 안드로이드 Vector Drawable로 변환도 가능했다.
여기까진 생각해냈는데, 지역 하나하나 (Path별로)를 클릭하게 해주는 기능이 안드로이드에 없었다.. 그렇게 스택오버플로우를 전전하며.. [richpath](https://github.com/tarek360/RichPath)를 사용해 구현하는 데에 성공했다.

svg이미지 사용하는 것에 대한 자바스크립트 튜토리얼은 많은데, 안드로이드 관련 정보는 정말 찾기 어려웠다😰 그래서 안드로이드에서의 사용법을 한번 정리해 보려고 한다.

# 1. svg 이미지 vector asset으로 변환
지도 svg 이미지 같은경우엔 'OOO지도 svg' 라고 검색하면 많이 나오는데, 그중 [위키피디아](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%BC:Administrative_divisions_map_of_South_Korea.svg)의 svg 이미지를 사용해 보겠다.


drawable(에서 오른쪽 마우스) > New > Vector Asset
![](https://images.velog.io/images/dogakday/post/2530c179-565e-499c-9801-f11d2bb2aa56/image.png){: .align-center}

Local file 선택하고 SVG 이미지 Path에서 불러오기
![](https://images.velog.io/images/dogakday/post/23901ea7-170d-4bd3-9485-85c4b4c96204/image.png){: .align-center}

그럼 Drawable 에 xml파일이 하나 생겼을 것이다.
![](https://images.velog.io/images/dogakday/post/b3179f8d-b1b7-4d58-9aa6-2357baab9233/image.png){: .align-center}

# 2. RichPath 라이브러리 설정
> [RichPath : https://github.com/tarek360/RichPath](https://github.com/tarek360/RichPath)

build.gradle(:app)에 아래 내용을 추가하고 sync now 를 눌러준다.
```gradle
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
```
![](https://images.velog.io/images/dogakday/post/7e65f326-df40-4828-a33b-240c692446e4/image.png){: .align-center}
settings.gradle 에 아래 내용을 추가하고 sync now 한다.
```
dependencyResolutionManagement {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}

```
![](https://images.velog.io/images/dogakday/post/58678608-b94e-4960-b4b6-f2510ea34404/image.png){: .align-center}

# 3. activity_main.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.richpath.RichPathView
        android:id="@+id/ic_map_of_south_korea"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:fillType="nonZero"
        android:visibility="visible"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:vector="@drawable/ic_map_of_south_korea" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

# 4. path name 설정
path별로 클릭 리스너를 구현하려면 path에 `name`을 줘야 한다. 아까 불러온 svg를 변환한 xml 파일에서 예시로 "해남" 과 "진도" 지역만 `name`을 주고, 색을 다르게 해 보았다.

```xml
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="509dp"
    android:height="716.105dp"
    android:viewportWidth="509"
    android:viewportHeight="716.105">
  
  ...
  
<path
      android:name="haenam"
      android:strokeWidth="1"
      android:pathData="M71.083,608.939l-5.167,-3.334l-2.167,6l-3.167,2.668v9.166l3.167,1.666v3.334l3.667,4.166l0.167,1.5l9.333,2.668l0.833,3.332l4.5,-2.5l4.167,4.168l1,3.5l0.5,7.166l-1.333,1.666l3.833,4.168l3.667,-2.668l-0.833,4.334c0,0 -2.833,1.334 -3,2.166c-0.167,0.834 -1.667,7 -1.667,7l4.333,-0.332l0.833,4.166l0.667,5.334l4.833,-4.168l6,0.834l-0.167,-6.334l2.333,-1.832l-1.667,-3.668l5.167,-3l6.167,-3.832l3.667,-1.168l1.333,-2.5l-1.333,-1l-4,-0.832l-0.333,-8.834l-1.5,-1.666l2.5,-3.834l-2.167,-5l3.333,-6l-1,-1.166l0.667,-3.834l-1.5,-3l-2.667,-1.5l-3.833,2.5l-10.167,-0.834l0.333,3.5l7,4l-5.167,0.834l-3.667,-3l-3.167,-0.5l-0.167,3.834l-5.833,-2.668l-5.5,-4l2.667,-4.5l-2.667,-0.332l-1,1.666l-3.167,-1.666l-1.667,0.332l0.167,3l-0.167,4.668l3.667,-0.834l2,2.834l4.833,3.5l-1.333,3.832l-7,-3.666l-4.167,-1l-1.833,-7.166l-2.167,-4.668l0.833,-3.166l-1.5,-1.166L71.083,608.939z"
      android:fillColor="#B900B9"
      android:strokeColor="#FFFFFF"/>
  <path
      android:name="jindo"
      android:strokeWidth="1"
      android:pathData="M60.083,632.273l-1.667,3.5l2.833,1.166l0.667,3.666c0,0 -5.333,0.5 -5.833,0.5s-0.667,2.668 -0.667,2.668l-1.333,2.332l-2.333,-1.666l-1.167,4l-6.667,4.5l-4.167,4.334l3,5.832l3.333,1.5l-0.333,2.334l6.667,0.834l6.833,-2.5l6,-4.168l4.5,-2.5l-0.167,1.668l4.667,-5.5l-0.5,-4.668l3.5,-2l-1,-3.832l-6.5,-5.668l-3,-1l-0.167,-1.832L60.083,632.273z"
      android:fillColor="#0099B9"
      android:strokeColor="#FFFFFF"/>
  
  ...
  
</vector>
```
![](https://images.velog.io/images/dogakday/post/bbd44541-9acc-4016-98f2-559f044b05a9/image.png){: .align-center}
*해남, 진도지역에 색이 칠해졌다.*

# 5. MainActivity.kt
viewBinding을 사용하려면 build.gradle(:app)에 아래 내용을 추가하고 sync now한다.
```gradle
android { 
  viewBinding {
          enabled = true
      }
}
```
아래는 **MainActivity.kt** 코드이다.
```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var richPathView: RichPathView

    private lateinit var binding : ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        richPathView = binding.icMapOfSouthKorea

        richPathView.findRichPathByName("haenam")?.setOnPathClickListener {
            Snackbar.make(binding.root, "해남", Snackbar.LENGTH_SHORT).show()
        }

        richPathView.findRichPathByName("jindo")?.setOnPathClickListener {
            Snackbar.make(binding.root, "진도", Snackbar.LENGTH_SHORT).show()
        }

    }
}
```
![svg](https://user-images.githubusercontent.com/67352902/130834601-5eebc6b7-464f-4e05-bb1f-10c471d6820f.gif){: .align-center}
잘 작동한다😊

# 추가로..
잘 되는건 좋은데, 지역이 저렇게 많은데 하나하나 다 클릭리스너를 달기는 좀.. 그렇지 않나? 해서 생각한게 `string-array`를 이용한 방법이다.

```kotlin
richPathView = binding.icMapOfSouthKorea

val mapOfKoreaRegions = resources.getStringArray(R.array.map_of_korea_regions)
for (region in mapOfKoreaRegions) {
	richPathView.findRichPathByName("$region")?.setOnPathClickListener { mapName = "$region" }
}

richPathView.setOnPathClickListener {
	pathOnClicked()
}
```

클릭 했을 때, 그 지역이 어딘지 알아야 했다. 그래서 `mapName`이라는 변수를 하나 만들었고 지역 이름이 담겨있는`string-array` 에 대해 for문을 돌아 그 지역을 클릭하면 `mapName`이 바뀌게 해 주었다.

더 자세한 코드는 우리 프로젝트 [💙Github💙](https://github.com/HSUITContestTeam/map-app/blob/main/app/src/main/java/com/hsu/mapapp/map/MapSeoulFragment.kt#L144) 에서 볼 수 있다.


