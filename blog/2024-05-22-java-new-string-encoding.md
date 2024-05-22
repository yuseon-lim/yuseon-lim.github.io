---
title: Java에서 new String()으로 인코딩을 변환 할 수는 없다.
description: Java에서 new String()으로 인코딩을 변환 할 수는 없다.
hide_table_of_contents: false
toc_max_heading_level: 4
---

문자열 인코딩이 깨지는 문제를 해결하면서,
자바에서 문자열 인코딩 변환 시 하기 쉬운 실수에 대해 정리해 보았다.

<!-- truncate -->

## 📌 문제 상황 정리

어떤 파일을 읽어, UTF-8로 변환한 파일을 생성하는 부분에서 아래와 같이 문자열이 깨지는 현상이 발생했다.

```
�׽�Ʈ �غ���! ������
```

문제가 된 부분은 이부분 이였다.

```java
BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "EUC-KR"));
BufferedWriter bw = Files.newBufferedWriter(Paths.get(newFilePath), StandardOpenOption.APPEND);
String line = "";
while((line = br.readLine()) != null)
{
    // 생략
    bw.write(new String(line.getBytes("EUC-KR"),"UTF-8"));
    bw.newLine();
}
```

예를들어 파일 인코딩이 `EUC-KR`이라고 했을때 다음과 같은 일이 일어난다.

1. EUC-KR로 파일을 읽는다.
2. `br.readLine()` 으로 읽은 문자열(String)에서 EUC-KR 바이트 배열을 얻고, 이를 `new String()` 으로 UTF-8 캐릭터셋을 지정해 String을 생성한다.
3. 파일에 쓴다.

이 과정에서 문자열은 100% 깨지게 된다.

## 📌 Java String 생성자는 인코딩을 '변환'하지 않는다.

자바 인코딩을 변환하는 방법을 구글에서 검색하면

```java
new String(line.getBytes("EUC-KR"),"UTF-8");
```

이런 코드를 종종 볼 수 있다. String의 생성자로 바이트 배열과 캐릭터셋을 받는 생성자가 있어 마치 변환이 될것만 같다.

하지만 이는 틀렸다.

정확하게 알려면 자바의 String 클래스를 살펴보아야 한다.

### ✅ String 생성자 살펴보기

**String.java**를 뜯어보면, `byte[]`를 전달하는 생성자들은 결국

```java
private String(Charset charset, byte[] bytes, int offset, int length){//}
```

함수를 거치게 됨을 알 수 있다.

캐릭터셋이 UTF_8, ISO_8859_1, US_ASCII이 아닐경우 CharsetDecoder로 디코딩 하는데,
이때 주어진 캐릭터셋으로 디코더를 생성하고, 디코딩한다. 다른 캐릭터셋으로 인코딩된 바이트배열을 읽으려고 하면 당연히 정상적으로 수행되지 않는다.

단순히 해당 캐릭터셋으로 디코딩 할 뿐, 변환하는 기능까지 수행하지 않는다.

따라서 캐릭터셋 A로 인코딩된 바이트 배열로 만들고, 이를 캐릭터셋 B로 지정해 `new String(line.getBytes(A), B)` 하게 될 경우, 자바는 들어온 바이트 배열을 캐릭터셋 B로 읽을 수 없어, 깨진 문자열이 되어버린다.

### ✅ 테스트

눈으로 확인해보기 위해

- 각기 다른 캐릭터셋으로 바이트 배열을 생성하고
- 이를 출력하고
- new String으로 다른 캐릭터셋을 지정해 출력해 보았다.

```java
 String original = "테스트 문자열";

 // 각 인코딩 방식으로 바이트 배열 생성
 byte[] ms949Bytes = original.getBytes(Charset.forName("MS949"));
 byte[] utf8Bytes = original.getBytes(StandardCharsets.UTF_8);
 byte[] utf16Bytes = original.getBytes(StandardCharsets.UTF_16);
 byte[] eucKrBytes = original.getBytes(Charset.forName("EUC-KR"));

 // 바이트 배열 출력
 System.out.println("Original: " + original);
 System.out.println("MS949 Bytes: " + Arrays.toString(ms949Bytes));
 System.out.println("UTF-8 Bytes: " + Arrays.toString(utf8Bytes));
 System.out.println("UTF-16 Bytes: " + Arrays.toString(utf16Bytes));
 System.out.println("EUC-KR Bytes: " + Arrays.toString(eucKrBytes));

 // 각 바이트 배열을 다른 인코딩으로 디코딩
 String ms949ToUtf8 = new String(ms949Bytes, StandardCharsets.UTF_8);
 String utf8ToMs949 = new String(utf8Bytes, Charset.forName("MS949"));
 String utf16ToEucKr = new String(utf16Bytes, Charset.forName("EUC-KR"));
 String eucKrToUtf16 = new String(eucKrBytes, StandardCharsets.UTF_16);

 // 결과 출력
 System.out.println("MS949 to UTF-8: " + ms949ToUtf8);
 System.out.println("UTF-8 to MS949: " + utf8ToMs949);
 System.out.println("UTF-16 to EUC-KR: " + utf16ToEucKr);
 System.out.println("EUC-KR to UTF-16: " + eucKrToUtf16);
```

결과는 다음과 같다.

```
Original: 테스트 문자열
MS949 Bytes: [-59, -41, -67, -70, -58, -82, 32, -71, -82, -64, -38, -65, -83]
UTF-8 Bytes: [-19, -123, -116, -20, -118, -92, -19, -118, -72, 32, -21, -84, -72, -20, -98, -112, -20, -105, -76]
UTF-16 Bytes: [-2, -1, -47, 76, -62, -92, -46, -72, 0, 32, -69, 56, -57, -112, -59, -12]
EUC-KR Bytes: [-59, -41, -67, -70, -58, -82, 32, -71, -82, -64, -38, -65, -83]
MS949 to UTF-8: �׽�Ʈ ���ڿ�
UTF-8 to MS949: �뀒�뒪�듃 臾몄옄�뿴
UTF-16 to EUC-KR: ���L짚恬  �8�툐
EUC-KR to UTF-16: 엗붺욮₹껀�
```

이로써 `new String()` 생성자로 문자열 인코딩을 변환할 수 없다는 사실을 확인했다.

## 📌 한글을 인코딩/디코딩 할땐 주의하자.

new String()으로 잘못을 해도 영어는 대부분의 캐릭터셋이 1바이트 이기 때문에 문제가 될 일이 거의 없다.

하지만 한글의 경우 1에서 4바이트까지 가변형으로 저장되기 때문에 맞는 캐릭터셋을 지정해야 한다.

## 📌 수정한 코드

문제가 된 코드를 아래와 같이 수정하면 된다.

```java
BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "EUC-KR"));
BufferedWriter bw = Files.newBufferedWriter(Paths.get(filePath),StandardCharsets.UTF_8, StandardOpenOption.APPEND);
String line = "";
while((line = br.readLine()) != null)
{
    // 생략
    bw.write(line);
    bw.newLine();
}
```

- BufferedWriter 자체를 utf-8로 지정하여 생성한다.
- 따로 읽은 String을 byte array로 변환하여 인코딩을 변환하는 작업 없이, 바로 쓴다.

new String으로 인코딩을 변환하려면 이렇게 하면 된다.

```java
byte[] ms949Bytes = original.getBytes(Charset.forName("MS949"));
String ms949String = new String(ms949Bytes, "MS949");
byte[] utf8Bytes = ms949String.getBytes(StandardCharsets.UTF_8);
String utf9String = new String(utf8Bytes, StandardCharsets.UTF_8);
```

## 📌 정리

- 자바의 String 생성자는 인코딩을 변환하는 역할을 하지 않는다.

## 📌 참고자료

- [Java Character Set의 이해](https://kin.naver.com/knowhow/detail.nhn?docId=527939)
