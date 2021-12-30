---
published: true
title:  "[Android] Floating Action Button 만드는 방법 (Kotlin)"
excerpt: "FAB버튼을 만들고, 클릭시 애니메이션까지 구현해본다."

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

# Floating Action Button
> 플로팅 작업 버튼(FAB)는 앱 UI의 기본 작업을 트리거하는 원형 버튼이다. 화면을 움직여도 FAB 버튼은 화면의 최상위에 고정되어 떠다닌다. [(_안드로이드 디벨로퍼 설명 페이지)](https://developer.android.com/guide/topics/ui/floating-action-button?hl=ko)


# build.gradle

## build.gradle(project:~)
```gradle
allprojects {
    repositories {
      google()
      jcenter()
    }
  }
```
`google()`이 있는지 확인, 없으면 추가
## build.gradle(module:~)
```gradle
dependencies {
    // ...
    implementation 'com.google.android.material:material:<version>'
    // ...
  }
```
[Google's Maven Repository](https://maven.google.com/web/index.html#com.google.android.material:material) 에서 최신 버전을 확인하고 추가 한뒤, sync now!


# 레이아웃 xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:srcCompat="@drawable/base_map" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab_share"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="24dp"
        android:layout_marginEnd="24dp"
        android:src="@drawable/baseline_share_black_48"
        app:layout_constraintBottom_toBottomOf="@+id/fab_main"
        app:layout_constraintEnd_toEndOf="@+id/fab_main"
        app:layout_constraintStart_toStartOf="@+id/fab_main"
        app:layout_constraintTop_toTopOf="@+id/fab_main" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab_capture"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="24dp"
        android:layout_marginEnd="24dp"
        android:src="@drawable/baseline_add_photo_alternate_black_48"
        app:layout_constraintBottom_toBottomOf="@+id/fab_main"
        app:layout_constraintEnd_toEndOf="@+id/fab_main"
        app:layout_constraintStart_toStartOf="@+id/fab_main"
        app:layout_constraintTop_toTopOf="@+id/fab_main" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab_main"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="24dp"
        android:layout_marginEnd="24dp"
        android:layout_marginBottom="24dp"
        android:src="@drawable/baseline_add_black_48"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
- FAB 크기는 `app:fabsize` : mini, normal 지정 안하면 default
- FAB 리플 색상은 `app:rippleColor`
  -  리플 색상을 지정하면 (`app:rippleColor="@color/purple_500"`)
    ![](https://images.velog.io/images/dogakday/post/d73150ed-dd21-4530-bc77-efc0d6343d21/image.png){: .align-center}
    버튼을 눌렀을때 색이 나타난다.
- FAB 아이콘은 `android:src`
  -  나는 drawble에 png 파일을 가져와서 `android:src="@drawable/"파일이름"` 으로 사용했다.
- [Material Design 페이지](https://material.io/components/buttons-floating-action-button/android#using-fabs)를 보면, FAB 버튼은 세가지가 있는데
  -  순서대로 Regular FAB, Mini FAB, Extended FAB 이다.
    ![](https://images.velog.io/images/dogakday/post/ba8e9ac1-2c7f-4b4c-8aca-73f476634334/image.png){: .align-center}


# 이벤트 설정 코드 (`setOnClickListener`)
```kotlin
private fun setFABClickEvent() {
        // 플로팅 버튼 클릭시 애니메이션 동작 기능
        _binding.fabMain.setOnClickListener {
            toggleFab()
        }

        // 플로팅 버튼 클릭 이벤트 - 캡처
        _binding.fabCapture.setOnClickListener {
            Toast.makeText(this.context, "캡처 버튼 클릭!", Toast.LENGTH_SHORT).show()
        }

        // 플로팅 버튼 클릭 이벤트 - 공유
        _binding.fabShare.setOnClickListener {
            Toast.makeText(this.context, "공유 버튼 클릭!", Toast.LENGTH_SHORT).show()
        }
    }
```
- viewBinding을 사용했고, 프래그먼트에서 뷰바인딩 사용하는게 (나한테는) 조금 까다로웠는데, 전체 코드도 아래에 첨부하니 참고하세요!


# FAB 애니메이션 코드
```kotlin
private fun toggleFab() {
        Toast.makeText(this.context, "메인 버튼 클릭!", Toast.LENGTH_SHORT).show()
        // 플로팅 액션 버튼 닫기 - 열려있는 플로팅 버튼 집어넣는 애니메이션
        if (isFabOpen) {
            ObjectAnimator.ofFloat(_binding.fabShare, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabCapture, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabMain, View.ROTATION, 45f, 0f).apply { start() }
        } else { // 플로팅 액션 버튼 열기 - 닫혀있는 플로팅 버튼 꺼내는 애니메이션
            ObjectAnimator.ofFloat(_binding.fabShare, "translationY", -360f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabCapture, "translationY", -180f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabMain, View.ROTATION, 0f, 45f).apply { start() }
        }

        isFabOpen = !isFabOpen

    }
```
- [`ObjectAnimator.ofFloat`](https://developer.android.com/reference/android/animation/ObjectAnimator?hl=ko#ofFloat(java.lang.Object,%20java.lang.String,%20java.lang.String,%20android.graphics.Path)) 으로 애니메이션을 구현했다.
  - target에 view id `R.id.블라블라` 나 바인딩을 불러와준다.
  - PropertyName에는 애니메이션을 넣고자 하는 방향?을 설정해준다.
    - `TranslationY` 는 상하방향, `TranslationX`는 좌우 방향 ( 감이 안와서 숫자 넣어가면서 맞는 값을 찾았다.
    - `View.ROTATION`은 회전을 구현 할 수 있다. 45도를 돌렸다 원상복귀 할것이기 때문에 저렇게 설정 해 주었다.
    

# 전체 소스코드
```kotlin
class MapFragment : Fragment(R.layout.fragment_map) {
    private lateinit var _binding: FragmentMapBinding
    private var isFabOpen = false // Fab 버튼 default는 닫혀있음

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMapBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        setFABClickEvent()
    }

    private fun setFABClickEvent() {
        // 플로팅 버튼 클릭시 애니메이션 동작 기능
        _binding.fabMain.setOnClickListener {
            toggleFab()
        }

        // 플로팅 버튼 클릭 이벤트 - 캡처
        _binding.fabCapture.setOnClickListener {
            Toast.makeText(this.context, "캡처 버튼 클릭!", Toast.LENGTH_SHORT).show()
        }

        // 플로팅 버튼 클릭 이벤트 - 공유
        _binding.fabShare.setOnClickListener {
            Toast.makeText(this.context, "공유 버튼 클릭!", Toast.LENGTH_SHORT).show()
        }
    }

    private fun toggleFab() {
        Toast.makeText(this.context, "메인 버튼 클릭!", Toast.LENGTH_SHORT).show()
        // 플로팅 액션 버튼 닫기 - 열려있는 플로팅 버튼 집어넣는 애니메이션
        if (isFabOpen) {
            ObjectAnimator.ofFloat(_binding.fabShare, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabCapture, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabMain, View.ROTATION, 45f, 0f).apply { start() }
        } else { // 플로팅 액션 버튼 열기 - 닫혀있는 플로팅 버튼 꺼내는 애니메이션
            ObjectAnimator.ofFloat(_binding.fabShare, "translationY", -360f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabCapture, "translationY", -180f).apply { start() }
            ObjectAnimator.ofFloat(_binding.fabMain, View.ROTATION, 0f, 45f).apply { start() }
        }

        isFabOpen = !isFabOpen

    }
}
```
이제 뷰바인딩 안쓰고는 못하겠다 ㅜㅜ findViewID,,R.id 부르는거 귀찮아..
나중에 MVVM 에 대해서도 한번 정리 해봐야 겠다.


# ✨ 완성
![](https://images.velog.io/images/dogakday/post/d333b744-9e9f-4e99-88ba-6bbc09931613/Animation%20(1).gif){: .align-center}


# 참고자료
- [stickode.tistory.com](https://stickode.tistory.com/70)
- 안드로이드 디벨로퍼
  - [ObjectAnimator](https://developer.android.com/reference/android/animation/ObjectAnimator?hl=ko#ofFloat(java.lang.Object,%20java.lang.String,%20java.lang.String,%20android.graphics.Path))
  - [FAB](https://developer.android.com/guide/topics/ui/floating-action-button?hl=ko)
- 머터리얼 디자인
  - [Buttons: floating action button](https://material.io/components/buttons-floating-action-button)
  - [Buttons: floating action button](https://material.io/![](https://images.velog.io/images/dogakday/post/6040a334-9499-478b-909a-bc6773c4fd4b/image.png)components/buttons-floating-action-button/android#extended-fabs)