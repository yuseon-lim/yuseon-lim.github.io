---
published: true
title:  "[Spring] 좋아요 기능 구현"
excerpt: "Spring + JPA + Spring Data Elastic으로 좋아요 기능을 구현해 보았다."

categories:
  - Spring
tags:
  - [Spring, Elasticsearch, Springdataelasticsearch, JPA]

toc: true
toc_sticky: true
 
date: 2022-04-05 22:25:35
last_modified_at: 2022-04-05 22:25:38
---

> 개발 환경
> - Window
> - SpringBoot 3.6.3
> - MySQL
> - JPA
> - Elasticsearch 7.15.2

> **❗주의** : 이 게시글은 JPA + Spring Data Elastic 조합으로 User와 Heart정보는 MySQL에, 
> 흔히 게시글로 구현하는 'Campagin'은 Elasticsearch에 있기 때문에 좋아요 수를 기록하시려면 게시글 테이블에 칼럼을 추가하셔야 합니다!

# 📌 시나리오

- 로그인 한 상태에서 유저가 좋아요 누르면 좋아요 정보 저장됨.
  - 해당 좋아요 (글 id + 유저 id) 레코드가 하나 생김 
- 유저가 좋아요를 한번 더 누르면 좋아요가 취소됨.
  - 위에서 만들어진 레코드 삭제됨

![image](https://user-images.githubusercontent.com/67352902/161769824-ed59d210-fe3b-4d77-8dcb-5cb93251d810.png){: .align-center}
*ERD*

# 📌 Entity

일단 유저 엔티티가 있어야 합니다. 원본 코드엔 권한(authority) 외 다른 잡다한 정보들이 있는데 좋아요 기능 구현하는 데에는 필요 없기 때문에 이 글에선 제외했습니다.

참고로 ~~귀찮아서~~ MySQL에 테이블을 먼저 만들지 않고 엔티티 구현한 뒤에

**application.yml**

```yml
hibernate:
    ddl-auto: create-drop
```

옵션 이용해 테이블 자동생성하여 사용했습니다!

**📄 User.java**

```java
@Getter
@Setter
@Builder
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String nickname;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime create_date;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modify_date;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    private List<Heart> hearts;
}
```
- `cascade = CascadeType.ALL` 옵션으로 User가 삭제될때 연관된 엔티티인 Heart도 같이 삭제되도록 설정해줍니다.


**📄 Heart.java**

```java
@Entity
@Table(name = "heart")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Heart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "campaign_id")
    @NonNull
    private String campaignId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
```

- '좋아요'면서 like가 아니라 왜 heart냐 하실텐데 like가 MySQL의 예약어라 안됩니다.


# 📌 Dto

**📄 HeartDto.java**

```java
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HeartDto {
    private String campaignId;
    private String userId;
}
```

# 📌 Controller

**📄 HeartController.java**

```java
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heart")
public class Heartcontroller {

    private final HeartService heartService;

    @PostMapping
    public ResponseEntity<HeartDto> heart(@RequestBody @Valid HeartDto heartDto) {
        heartService.heart(heartDto);
        return new ResponseEntity<>(heartDto, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<HeartDto> unHeart(@RequestBody @Valid HeartDto heartDto) {
        heartService.unHeart(heartDto);
        return new ResponseEntity<>(heartDto, HttpStatus.OK);
    }

}
```

- `POST` 로 보내면 좋아요, `DELETE`로 보내면 좋아요 취소입니다.

# 📌 Repository

**📄 HeartRepository.java**

```java
public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findHeartByUserAndCampaignId(User user, String campaignId);
}
```

- campaignId(게시글) + user 조합으로 찾습니다.

# 📌 Service

**📄 HeartSearvice.java**

```java
@Slf4j
@RequiredArgsConstructor
@Service
public class HeartService {

    private final HeartRepository heartRepository;
    private final UserRepository userRepository;
    private final CampaignRepository campaignRepository;
    private final RestHighLevelClient elasticsearchClient;
    private final JwtTokenProvider jwtTokenProvider;
    private User user;

    public void heart(HeartDto heartDto, String jwtToken) throws IOException {
        validateToken(heartDto, jwtToken);

        // 이미 좋아요 된 캠페인일 경우 409 에러
        if (findHeartWithUserAndCampaignId(heartDto).isPresent()) {
            throw new CustomException(ALREADY_HEARTED);
        }

        Heart heart = Heart.builder()
                .campaignId(heartDto.getCampaignId())
                .user(userRepository.findUserById(heartDto.getUserId()).get())
                .build();
        heartRepository.save(heart);

        updateHeartCount(heartDto.getCampaignId(), 1);

    }

    public void unHeart(HeartDto heartDto, String jwtToken) throws IOException {
        validateToken(heartDto, jwtToken);

        Optional<Heart> heartOpt = findHeartWithUserAndCampaignId(heartDto);

        if (heartOpt.isEmpty()) {
            throw new CustomException(HEART_NOT_FOUND);
        }

        heartRepository.delete(heartOpt.get());

        updateHeartCount(heartDto.getCampaignId(), -1);
    }

    public void validateToken(HeartDto heartDto, String jwtToken) {
        // 생략 ... 유효한 토큰인지 검증하는 부분
    }

    public Optional<Heart> findHeartWithUserAndCampaignId(HeartDto heartDto) {
        return heartRepository
                .findHeartByUserAndCampaignId(user, heartDto.getCampaignId());
    }

    public void updateHeartCount(String campaignId, Integer plusOrMinus) throws IOException {
        // Elasticsearch 업데이트 하는 부분
        // 필요한 분들이 별로 없을것같아 생략합니다. 필요하시면 맨아래 깃헙 링크 참고하세요!
        // MySQL만으로 구현하실때에는 JPA로 업데이트 하는 코드 넣어주세요~!
    }

}
```

- 중복을 막기 위해서 이미 좋아요 된 캠페인인지 확인합니다.
  - 이 과정에서 `userId` 와 일치하는 User가 없다면 MEMBER_NOT_FOUND 에러 (커스텀 에러 처리 함)
  - 이미 좋아요 된 캠페인일 경우 ALREADY_HEARTED 에러
- `heart()`는 Heart객체를 새로 만들어 저장합니다.
- `unHeart()`는 DB에서 Heart객체를 찾아 삭제합니다.
  - Heart가 없다면 없는 좋아요를 취소하는 것이기 때문에 HEART_NOT_FOUND 에러


# 🩺 테스트

**📄 HeartControllerTest**

```java
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Import(JpaConfig.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class HeartControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CampaignRepository campaignRepository;

    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, String> input = new HashMap<>();

    @BeforeEach
    void setBody() {
        Optional<Campaign> campaign = campaignRepository.findDistinctBySiteType("happybean");
        if (campaign.isEmpty()) {
            throw new ResourceNotFoundException("캠페인을 찾을 수 없음");
        }

        input.put("campaignId", campaign.get().getId());
        input.put("userId", "550e8400-e29b-41d4-a716-446655440000"); // testUser
    }

    @Test
    @Order(100)
    @DisplayName("좋아요 테스트 - 성공")
    public void doHeart() throws Exception {

        mockMvc
                .perform(post("/api/heart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))

                .andExpect(status().isCreated());
    }

    @Test
    @Order(101)
    @DisplayName("좋아요 테스트 - 실패 :: 이미 좋아요 된 캠페인")
    public void doHeartFailDuplicate() throws Exception {

        mockMvc
                .perform(post("/api/heart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))

                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_HEARTED"))
                .andExpect(jsonPath("$.message").value("이미 좋아요 된 캠페인 입니다."));
    }

    @Test
    @Order(200)
    @DisplayName("좋아요 취소 테스트 - 성공")
    public void unHeart() throws Exception {

        mockMvc
                .perform(delete("/api/heart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))

                .andExpect(status().isOk());

    }

    @Test
    @Order(201)
    @DisplayName("좋아요 취소 테스트 - 실패 :: 없는 좋아요 취소 시도")
    public void unHeartFailNotFound() throws Exception {

        mockMvc
                .perform(delete("/api/heart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))

                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("HEART_NOT_FOUND"))
                .andExpect(jsonPath("$.message").value("해당 좋아요 정보를 찾을 수 없습니다."));


    }

}
```
  
![image](https://user-images.githubusercontent.com/67352902/161777578-d23e2cac-18b2-4e47-8c46-c193de489a61.png){: .align-center}
*테스트 성공*

**📸 DB 결과**

![image](https://user-images.githubusercontent.com/67352902/161777816-238a4e91-46c9-46bf-b5d3-756a3b7a7c59.png){: .align-center}
*좋아요 한 heart들이 잘 들어가있다.*

# [🔗 GITHUB LINK](https://github.com/2E2I/mamomo-server/blob/main/src/main/java/com/hsu/mamomo/service/HeartService.java)

원본 코드 입니다.

# 참고자료

- [https://velog.io/@ohjs813/Spring-FrameWork-좋아요기능-정리](https://velog.io/@ohjs813/Spring-FrameWork-%EC%A2%8B%EC%95%84%EC%9A%94%EA%B8%B0%EB%8A%A5-%EC%A0%95%EB%A6%AC)
- [https://gimmesome.tistory.com/175](https://gimmesome.tistory.com/175)