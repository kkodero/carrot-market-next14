#정리
1.git 생성

git init
git remote add origin https://github.com/kkodero/carrot-market-next14.git
git add .
git commit -m "처음"
git push -f origin

1.1 git 커밋하기
https://devgoat.tistory.com/12

 error: remote origin already exists.
=>>>>	git remote remove origin

1.2 git 커밋 취소 하기
 git reset --soft HEAD^

======================================================================
2.프로젝트 만들기

npx create-next-app@latest
project 만들기 Y
typescript 만들기 Y
ESLINT 만들기 Y
TAILWIND 만들기 Y

code carrot-market-next14
======================================================================
3.확장 프로그램 설치

3-1.Tailwind CSS IntelliSense
Tailwind CSS IntelliSense는 
Visual Studio Code 사용자에게 자동 완성, 구문 강조

3-2. headwind
Headwind는 Visual Studio Code용 Tailwind CSS 클래스 분류기입니다.
코드를 구문 분석하고 클래스 태그를 지정된 순서에 따라 다시 리페인팅하여 
일관된 클래스 순서를 적용합니다.

3-3.Tailwind CSS Explorer
프로젝트의 tailwind 설정에서 사용할 수 있는 클래스를 탐색
======================================================================

4. Tailwind의 ModiFiers 사용
-> 다크모드 or 라이트모드 
ex)dark:bg-gray-700

-> 스크린크기에 따른 CSS 적용
ex)sm:bg-red-100
   md:bg-green-100
   xl:bg-purple-100
   
-> 조건에따른 CSS 적용 
ex)hover:bg-green-500

-> 그라데이션 만들기
ex)bg-gradient-to-tr 
from-cyan-400 
to-purple-400 
peer-invalid:from-red-400 
peer-invalid:to-orange-400

-> inValid 체크(email)
ex)peer 추가 후
   peer-invalid:focus:bg-red-199

-> 반복사용 제거modifier
ex) 부모component로가서 '*:' 추가하여 child 모두 적용
    *:outline-none
ex) has-[:invalid]:bg-red-100
	has-[:invalid]:ring

-> Lists 적용
ex) border-b-2 pb-5 ~~~
	last:border-0
	first:pb-0

-> Group 적용
ex)	부모component로 가서 group 추가하여 child 모두 적용
	group-hover:text-red-red
	group-focus-within:block hidden

-> tailwind.config.ts 사용
extend 에서 class 추가 
plugins 추가 가능
ex)Typography

tailwindcss/forms(유틸리티를 사용하여 form 요소를 쉽게 재정의할 수 있도록 
form 스타일에 대한 기본 reset을 제공하는 플러그인)
'npm install -D @tailwindcss/forms

daisyUI(Tailwind CSS용 가장 인기있는 컴포넌트 라이브러리)
'npm i -D daisyui@latest

-> global.css 사용
@tailwind base;
=>tailwind가 기본적으로 제공해주는 css스타일들 모음
@tailwind components;
=>@apply 로 className을 공통화
@tailwind utilities;
=> generate후 모든 className 모음

@@아이콘 추가
'npm install @heroicons/react

======================================================================
5.NEXT 14 SERVER ACTIONS

1.Server Actions
../API/route.ts 파일 생성 필요없음
  
  async function handleForm(formData: FormData) {
    "use server";
    console.log(formData.get("email"), formData.get("password"));
    console.log("i run in the server baby!");
  }
  "use server"; 추가후
 해당 form에	action={handleForm} 추가 하면됨
 
2.useFormStatus(React)
마지막 form submit의 상태 정보를 제공하는 Hook
ex) const { pending, data, method, action } = useFormStatus();

3.useFormState
redirect("/")		=>Home으로 이동
조회후 에러가 났을때 바로 redirect시키지 않고 다른action을 해야함

useFormState는 form action의 결과에 따라 상태를 업데이트할 수 있는 Hook
ex) const [state, formAction] = useFormState(handleForm,초기값);

======================================================================
6.Zod 사용하기
=>유효성 검사하기
'npm i zod
z.object() 로 오브젝트 스키마생성
데이터가 유효한 경우 true값의 success와 데이터 정보가 담긴 data를 반환
유효하지 않은 경우에는 false값의 success와 에러 정보가 담긴 error를 반환

[.regax]
정규표현식으로 데이터 검증

[.toLowerCase]
String 타입의 데이터를 모두 소문자로 변환

[.trim]
String 타입의 데이터에서 맨앞과 뒤에 붙은 공백을 제거

[.transform]
메서드를 이용하면 해당 데이터를 변환
예시: .transform((username) => `🔥 ${username} 🔥`)

InputHTMLAttributes 이용하여 input 태그에 있는 기본 속성들을 props로 받을수 있음
[🔥 Super Recap 🔥]
1. input에 name을 넣어주어야 formData에서 get으로 해당 데이터 값을 가져올 수 있습니다.
2. safeParse는 스키마에 따라 데이터를 검사하고 변형시켜줍니다.
3. .refine으로 커스텀 validation을 만들 수 있습니다.
object자체에 refine을 해주면 객체 안에 있는 전체 데이터들을 대상으로 검증할 수 있습니다.
4. .transform으로 데이터를 변형시킬 수 있습니다.
5. safeParse는 parse와 다르게 검증에 실패해도 에러를 만들지 않습니다.
6. 에러 객체에 flatten 메서드를 사용하면 사용하기 쉽게 포맷팅됩니다.
7. 검증 성공시 원본 data를 사용하지 않고 result.data를 사용해야합니다.

[Coerce]
Zod는 coerce를 이용하여 값의 타입을 강제할 수 있습니다.
ex)
z.coerce.string(); // String(input)
z.coerce.number(); // Number(input)
z.coerce.boolean(); // Boolean(input)
z.coerce.bigint(); // BigInt(input)
z.coerce.date(); // new Date(input)

[Validator]
'npm i validator
'npm i @types/validator
다양한 유형의 문자열 입력을 검증

======================================================================
7.Prisma 사용하기
7.1
Node.js 및 TypeScript ORM
'npm i prisma
'npx prisma init
'Extension:Prisma 설치
'Extinsion SQLite Viewer 설치

=>prisma/schema.prisma
Model 생성

=>.env
DB환경 constants 설정
ex)DATABASE_URL="file:./database.db"

npx prisma migrate dev
1. 데이터베이스 변경 사항을 확인하고, 수정되었거나 삭제된 부분을 찾습니다.
2. 새로운 변경 사항이 있다면, 그것을 시험해 볼 수 있는 별도의 데이터베이스에 먼저 적용합니다. (테스트 목적)
3. 데이터 모델에 변화가 있으면, 그에 맞는 새로운 마이그레이션을 만듭니다.
4. 모든 새로운 마이그레이션을 실제 데이터베이스에 적용하고, 이를 기록합니다.
5. 필요한 코드를 자동으로 생성합니다. (Prisma Client 등..)
=> Model 동기화 필요
add_user 

.gitignore에 .env추가 필요
.gitignore에 *.db추가

7.2 
Prisma Client
Prisma Client는 데이터에 맞춰 자동 생성되는 type-safe 쿼리 빌더
java script를 이용해 prisma를 통해서 DB를 조회하거나 수정작업을 할 수 있도록 해주는 도구
손 쉽게 java script를 이용해서 DB에 접근하기 위해
'npm install @prisma/client

7.3
Prisma Studio
Prisma 프로젝트에서 데이터를 탐색하고 조작하는 가장 쉬운 방법입니다.
npx prisma studio

======================================================================
8. AUTHENTICATION

8.1 safeParseAsync
=> database에서 ID또는 email존재 하는지 check
refine => superRefine 사용

8.2 Hashing
=>비밀번호 hashing 하기
'npm i bcrypt
'npm i @types/bcrypt

8.3 session 관리
'npm i iron-session

getIronSession 사용하여 쿠키 생성하고
await cookie.save(); 쿠키 저장

1password password generator
https://1password.com/password-generator/

8.4 Middleware
=> 다른페이지로 redirect
=> 인증된 page or public page 구분하여 이동
Matcher
matcher를 사용하면 Middleware를 필터링하여 
특정 경로들에서만 실행되도록 할 수 있습니다.

======================================================================

9. 소셜 로그인 연동

9.1 GitHub Authentication

https://github.com/settings/applications/new
http://localhost:3000/github/complete

9.2 Token 관리
모르겠음

9.3 Twilio 사용하기
https://www.twilio.com/en-us
=>google로가입함
'npm install twilio

9.4 Next-Auth 사용해 보기#

'npm i next-auth 
'npm install @types/node

SECRET_KEY 만들기
'npx auth secret

#구글로그인
https://console.cloud.google.com/apis/dashboard
http://localhost:3000/api/auth/callback/google

#네이버로그인
https://developers.naver.com/products/login/api/api.md

서비스 URL: http://localhost:3000
Callback URL: http://localhost:3000/api/auth/callback/naver

#카카오로그인
https://developers.kakao.com/
Redirect URI: http://localhost:3000/api/auth/callback/kakao
REST API키 가 KAKAO_CLIENT_ID 
제품설정 > 보안 메뉴에 가면 카카오로그인 ON을 할 수 있는데, 거기에 나오는 코드가 KAKAO_CLIENT_SECRET


