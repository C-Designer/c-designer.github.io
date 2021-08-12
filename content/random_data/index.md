---
emoji: 👀
title: 회원 및 대여기록 랜덤데이터 생성
date: '2020-11-01 00:00:00'
author: C-Designer
tags: 
categories: 코드리뷰
published: true
---

# 회원 랜덤 데이터

회원파트를 맡은 팀원이 dong1, dong2, dong3… dong20 이런식으로 첫째자리는 0없이 데이터값을 집어넣었었다.

```sql
-- 반복문 사용하여 나이수정
DECLARE
NUM NUMBER :=0;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1970/01/01') WHERE id = 'dong'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 5;
	END LOOP;
END;
-- dong1~5
DECLARE
NUM NUMBER :=6;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1980/01/01') WHERE id = 'dong'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 10;
	END LOOP;
END;
-- dong6~10
DECLARE
NUM NUMBER :=11;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1990/01/01') WHERE id = 'dong'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 20;
	END LOOP;
END;
-- dong11~20
```

![random_data_1.png](random_data_1.png)

일일이 값을 바꾸기 귀찮아 이런형태로, 데이터를 수정시키는 반복문을 썼다.

아이디값을 6자 이상이라 첫째자리는 01~09로 바꿔 반복문에 ‘dong1’~’dong9’까지 오류가 생겼다.

이문제를 해결하고자

```sql
-- 반복문 사용하여 나이수정
DECLARE
NUM NUMBER :=1;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1970/01/01') WHERE id = 'dong0'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 5;
	END LOOP;
END;
-- dong01~05
DECLARE
NUM NUMBER :=6;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1980/01/01') WHERE id = 'dong'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 9;
	END LOOP;
END;
-- dong05 ~ dong09
DECLARE
NUM NUMBER :=11;
BEGIN
	LOOP	
	UPDATE MEMBER SET BIRTH = TO_DATE('1990/01/01') WHERE id = 'dong'||NUM;
	NUM := NUM + 1;
	EXIT WHEN NUM > 20;
	END LOOP;
END;
-- dong10~20
```

이렇게 바꾸었고, 더나은 방법이 있을까 고민하였다.

1. 01~20까지 문자열로 쓰되 첫째자리는 포맷처리
2. 연령대 랜덤값 수정
3. 클린 코딩

![random_data_2.png](random_data_2.png)

오라클과 친하진 않아서 힘들었지만 결국 성공했다 ㅎㅎ

```sql
-- 반복문 사용하여 연령대 랜덤값 설정
DECLARE
NUM NUMBER :=1;
BEGIN
	LOOP
	UPDATE MEMBER
	SET BIRTH = TO_DATE ( ROUND (DBMS_RANDOM.VALUE (1, 28)) ||'-'|| -- 일
												ROUND (DBMS_RANDOM.VALUE (1, 12)) ||'-'|| -- 월
												ROUND (DBMS_RANDOM.VALUE (1960, 2000)),'DD-MM-YYYY') -- 연
	WHERE id = 'dong'||LPAD(NUM, 2, '0');	--'dong 01 ~ 20' 포맷처리
	NUM := NUM + 1;
	EXIT WHEN NUM > 20;
	END LOOP;
END;
```

# 대여 랜덤 데이터

![random_data_3.png](random_data_3.png)

회원 랜덤데이터보다 더욱 빡세졌다.

### 회원아이디

```sql
'dong' || LPAD(TRUNC(DBMS_RANDOM.VALUE(1,20)), 2, '0')
```

회원 랜덤데이터 기입한게 있어 간단히 구현했다

### 차량번호

```sql
SELECT *
FROM (SELECT CAR_NO
			FROM CAR
			ORDER BY DBMS_RANDOM.RANDOM)
WHERE rownum = 1
```

차량값을 받아와 랜덤으로 줄지은 뒤 제일 위에 것만 던지기

### 대여날짜

```sql
TO_DATE ( ROUND (DBMS_RANDOM.VALUE (1, 28)) || '-' || ROUND (DBMS_RANDOM.VALUE (1, 12)) || '-' || ROUND (DBMS_RANDOM.VALUE (2017, 2020)),'DD-MM-YYYY')
```

이것도 회원 생년월일 랜덤데이터에서 차용하였다.

### 통합

```sql
-- 반복문 사용하여 대여 랜덤데이터 기입
DECLARE
NUM NUMBER :=1;
RENTDATE DATE := sysdate; -- 변수선언
BEGIN
		LOOP
				RENTDATE := TO_DATE ( ROUND (DBMS_RANDOM.VALUE (1, 28)) || '-' || -- 대여일 초기화
				ROUND (DBMS_RANDOM.VALUE (1, 12)) || '-' ||
				ROUND (DBMS_RANDOM.VALUE (2017, 2020)),'DD-MM-YYYY');

		INSERT INTO RENT VALUES (RENT_NO_SEQ.NEXTVAL,	'dong' || LPAD(TRUNC(DBMS_RANDOM.VALUE(1,20)), 2, '0'),	-- 아이디 랜덤값
		(SELECT * FROM (SELECT CAR_NO FROM CAR ORDER BY DBMS_RANDOM.RANDOM) WHERE rownum = 1),	--차량번호 랜덤값
		1, RENTDATE, RENTDATE+7, 'n', 65000, '반납X');	--대여일 랜덤, 반납일은 7일후 설정
		NUM := NUM + 1;
		EXIT WHEN NUM > 10000;	-- 반복횟수
		END LOOP;
END;
```

다른값을 가진 10000개의 데이터가 한번에 들어갔다.

**느낀점?**

구현해야 할 것이 무엇인지 명시해두니 순차적으로 해결하기 쉬워졌지만, 기획하는 것에 비해 구현하는 코딩실력이 못 따라온다. RDBMS도 범위가 방대하구나 싶다.

```toc
```
