# 기본 세팅
    - front: REACT / AXIOS / REACT-PLAYER
        1. npx create-react-app webpage
        2. npm i http-proxy-middleware --save
        3. npm i axios --save
        4. npm i react-router-dom --save
        5. npm i react-icons --save
        6. npm i react-player --save
    - back: NESTJS / TYPESCRIPT / TYPEORM (mysql)
        1. npm i nestjs -g
        2. nest new project_name ( 내부에 생성되는 .git 폴더 제거 )
        4. npm i @nestjs/typeorm typeorm --save
        5. npm i @nestjs/jwt passport-jwt --save
        6. npm i @types/passport-jwt --save-dev
        7. npm i dotenv --save
        8. npm i mysql --save
        
# 실행 방법
    * 실행 전에 각 폴더에서 "npm i" 실행 
    - front : npm start
    - back  : npm start / npm run start:dev

# webpage ( Front )
- setupProxy 는 src 내부에 존재해야 함
- .env 파일 작성할 것

# server ( Back )
- .env 파일 작성할 것
- 사용할 DATABASE 를 먼저 생성한 후 실행 필요
- 모듈 생성 절차
    1. nest g service 모듈명
    2. nest g controller 모듈명
    3. nest g module 모듈명
- TYPEORM 연동 절차
    1. entity 객체 생성 ( TABLE 정보를 선언 )
    2. 사용할 모듈에 TYPEORM 모듈 정보를 import

# NestJS
- nestjs 는 크게 3종류의 파일로 하나의 모듈이 구성됨
    1. module: 구성하는 파일을 묶는 정보용 파일
    2. controller: 주소, 방식에 따라 설정한 작업을 할당. 사용자에게 결과반환 (router)
    3. service: 실제 세부 작업이 이루어지는 파일. controller 에게 값을 반환

# 진행사항
1. 2021/02/03
    - 기본 형태 구축 (frame)
2. 2021/02/04
    - 버튼 구현, url 관련 환경 구축 (route)
3. 2021/02/05
    - 홈페이지 구축 진행
    - 가로 비율은 grid 를 따라서 구축이되지만, 세로도 가로와 비율을 맞춰 줄어들어야 함..( 썸네일 관련해서 크기조절 )
        => 현재 방법을 찾아보는 중, 근데 딱히 방법이 안보임
    - https://hyeonseok.com/blog/712
    - paddingTop / marginTop 은 % 비율로 조절이 가능하단 점을 이용
      실제 썸네일은 [ position: "absolute" ] 로 처리
4. 2021/02/08
    - 기초 DB 생성
    - 동영상 url 연동
      source 컴포넌트를 사용하는 경우, 상단 video 태그에 key 값으로 함께 연동 필요
5. 2021/02/09
    - 동영상 호출 관련 테스트 ( react-player 및 스트리밍 자료 참고 )
    a. https://www.youtube.com/watch?list=PLqvIfHb2IlKeZ-Eym_UPsp6hbpeF-a2gE&v=YjOEVamhah4&feature=youtu.be
    b. https://blog.kollus.com/?p=131
6. 2021/02/10
    - 비디오 처리는 일단 생략하기로.. 도저히 관련 질문이나 오류가 안보임
7. 2021/02/16
    - 썸네일이랑 비디오를 한 formData에 묶어서 전송할려고 했는데, 뭔가 잘 안됨..
    - UseInterceptors 는 가장 마지막에 선언된 내용만 적용됨 ( 덮어쓰기 )
8. 2021/02/17
    - 날짜값 출력되도록 수정 + User DB 구성중
9. 2021/02/18
    - 사이드메뉴 간략화 버튼
    - 다음 목표는 회원가입 / 유저 정보 처리 관련 기능 만들어야 함..
10. 2021/02/19
    - 회원가입 관련 손보기
11. 2021/02/23
    - 회원가입 관련 기본처리 / 에러처리
    - 로그인 페이지 구축
    - 고민할점:
        youtube 실제 로그인 페이지에선 1차적으로 email 확인 후, 비밀번호 입력 방식
        ==> 이걸 똑같이 구현할 것인가? 아니면 일반적인 방식을 쓸 것인가?
12. 2021/03/02
    - NestJs 에서 @Res() 를 선언한 경우, 단순 return 으론 값반환이 안됨. ( res 를 반드시 사용해야 함 )
    - 우선은 이메일 확인 후, 비밀번호 입력하는 방향으로 진행하려는 중. ( Router 사용 )
      이제 각 라우팅에 페이지를 옮기는 작업만 하면 됨.
13. 2021/03/03
    - 이메일 체크 후, 비밀번호 페이지로 이동하도록 수정
    - 현재는 비밀번호 확인 페이지 구축 진행 중. 프로필 사진 관련해서 약간 애먹는 중.
14. 2021/03/04
    - 로그인 기초 기능 구현완료. ( 로딩창 포함 )
      다만, 로그인을 유지하는 기능은 현재 고민 중
      ( history.push 로 정보를 넘겨서 1회용으로 쓸지, storage에 저장하는 방식을 쓸지.. )
    - 일단은 storage 쓰는걸로 구현을 해놓자.
    - 드랍다운 메뉴 만드는 중. paper 위치 바꾸는법좀 찾던가, 다른 대안을 찾아야할듯
15. 2021/03/05
    - 드랍다운 메뉴 구성 (로그아웃만 기본으로 세팅)
      ==> anchorEl 설정이 문제였음. 기준이 되는 위치를 잡아주는 역할인 듯 함.
    - 기본 화면 동영상 프로필 폼 수정
    - 영상이랑 프로필을 같이 등록하는건 힘들까..?
16. 2021/03/09
    - 비디오 영상과 작성자 정보 연결까진 끝냄
17. 2021/03/29
    - 수정 및 개선해야할 부분
        a. 게시글 작성페이지 구축 및 작성자 정보를 같이 담도록 수정 필요
        b. 구독 기능 구현 필요
        c. 비밀번호 암호화 기능 필요 (salt 값)
        d. 프로필 메뉴 리스트에서, 함수구현 및 페이지 이동기능 통일화
        e. typeORM 에서 transaction 사용하도록 개선 (https://velog.io/@hanjn2842/TypeORM-%EC%97%90%EC%84%9C-Transaction-%EC%9E%91%EC%84%B1-%EB%B0%A9%EB%B2%95)
        f. 파일 업로드 전, 검사 수행하도록 (http://hong.adfeel.info/frontend/nest-js-3/)
            ==> 혹은, 게시글 등록에 실패한 경우 파일 자체를 삭제하도록 해야함
18. 2021/04/02
    - 파일 업로드 메인화면 구성
      ( 파일이 선택되면, 다음 페이지로 넘어가도록 구현해야 함 )
    - upload 페이지를 switch-route 구조로 변경하긴 했는데, BrowserRouter 를 써야하는 이유를 모르겠음.
    - 또 browserRouter를 쓰니까 option 페이지로 렌더링이 안됨 핵답답..
19. 2021/04/13
    - 원인 찾음 (exact 때문에, 하위 route 가 제대로 동작을 안한 것)
      :params 을 명시해주는거로 해결이 되긴 하는데, 이건 이거대로 현재 구조랑 좀 꼬임
      OK 해결 완료
    - 비디오 게시글 정보 입력 페이지 구축 시작
      ( https://material-ui.com/components/text-fields/#customized-inputs )
20. 2021/04/20
    - redditTextField 작동 확인 ( useStyle이 hook 함수라서 오류가 났던 것 )
    - upload 페이지 구조를 좀 바꿔야할 것 같음
      (하위 컴포넌트에 state, dispatch 를 직접 전달하고, 그 내부에서 함수를 구축해야할 듯)
21. 2021/04/22
    - upload 하위페이지로 state, dispatch 를 직접 넘기도록 수정
    - redditText 랑 reducer 값이랑 연동 완료 + 기본 틀 대략 구축해둠
    - 업로드의 상단 진행바는 일단 구현이 불필요해보여서 생략하기로 함
      ( 원본에선 [ 세부정보, 동영상 요소, 검사, 공개 상태 ] 4단계로 구분됨 )
    - textOverflow: ellipsis 적용 시도 중 ( flex 떄문인지 적용이 제대로 안됨 )
22. 2021/04/28
    - flex 랑 textoverflow 관계 해결
      a. width 값이 고정되어 있어야함
      b. 길이의 영향을 주는 모든 컴포넌트는 overflow="hidden" 속성을 가져야함
      ==> 해당 실습에선 내부 컴포넌트의 길이가 텍스트 길이에 영향을 받고,
          부모의 길이에 전반적인 영향을 미침 (flex 이기 떄문)
          so, 마지막으로 길이에 영향을 받는 최상위 부모의 overflow 속성도 선언되어야 함
    - video 랑 image 를 같이 전송이 안되는 것 같음.
      유튜브에서도 영상을 먼저 서버에 전송해서 임시저장하고, 이미지 폼을 따로 구축하는 듯??
      ===>> 영상 등록에 임시저장 페이지를 따로 구축해야 할 것 같음
23. 2021/04/29
    - 비밀번호 암호화 완료 ( crypto 모듈 사용 )
24. 2021/04/30
    - 업로드 동영상 리스트 출력 페이지 기본폼 구축
      + 서버쪽 기능 추가

# 할 일 목록
- 영상 등록 페이지 구축 (임시등록 된 비디오 목록 + 신규등록 버튼)
- 인기 페이지 / 구독 페이지
- 비밀번호 salt 시키기 OK