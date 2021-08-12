---
emoji: 👀
title: 기입일 기준 대여가능한 차량 리스트 반환
date: '2020-11-01 00:00:00'
author: C-Designer
tags: 
categories: 코드리뷰
published: true
---

![rent_date_1.png](rent_date_1.png)

---

### 기능구현 목표

처음에 대여테이블에 해당데이터를 그림과 같이 기입했다 월별로 보기 간단하게 값을 설정했고 2020.02~ 2020.08 사이에 대여가능한 차량을 구해야한다.

![rent_date_2.png](rent_date_2.png)

해당월 사이에 대여가능한 차량을 구하려면 단순하게 Between A and B로는 구현이안된다 산술연산자만 주고 반복문을 활용하라는 말과 같다. 왜냐하면 Between And 연산자는 해당컬럼을 1개로 밖에 다룰수없으며, 다른 연산자와 섞어 어떻게든 구현해도 훨씬 복잡해지기 마련이다.

---

![rent_date_3.png](rent_date_3.png)

여러방법을 구상해보고 시도해봤지만 논리적오류가 한두개씩 계속 발생했고, 끝에 도출한 가장 이상적인 방법은 대여일 이전과 반납일 이후의 차량들만 추출후 여집합을 구하는것이다.

```sql
SELECT DISTINCT CAR_NO -- 대여란에 중복된 차량 제거
  FROM rent r
 WHERE (TO_DATE(RENT_DATE) > TO_DATE('2020/02/01') 
AND TO_DATE(RENT_DATE) < TO_DATE('2020/08/01'));

  OR (TO_DATE(RETURN_DATE) > TO_DATE('2020/02/01')
AND TO_DATE(RETURN_DATE) < TO_DATE('2020/08/01'));
```

날짜 값을 던져 렌트 테이블 내에서의 차량들은 구했지만, 차량 테이블엔 있지만 렌트 테이블에 포함되지 않는 차량은 도출이 안된다.

![rent_date_4.png](rent_date_4.png)

트랜잭션처리 하려 했지만 값을 2번던지면 sql 및 메서드 구현이 더욱 번거로워지므로 서브쿼리문으로 도출하여 Not(여집합)을 두번써서 값도출 성공

```sql
SELECT *
  FROM CAR
 WHERE CAR_NO NOT IN ( -- 서브쿼리 시작
SELECT DISTINCT CAR_NO -- 대여란 에 중복된 차량 제거
  FROM rent r
 WHERE (TO_DATE(RENT_DATE) > TO_DATE('2020/02/01') 
AND TO_DATE(RENT_DATE) < TO_DATE('2020/08/01'));

  OR (TO_DATE(RETURN_DATE) > TO_DATE('2020/02/01')
AND TO_DATE(RETURN_DATE) < TO_DATE('2020/08/01'))
); --서브쿼리 끝
```

---

### Schema

테이블 안겹친다고 컬럼명 똑같이 쓰지말자 아예 Connetion이 없는 경우면 모를까. 에러가 안터져서 몰랐지만, sql query가 매우 번거로워지며, 유지보수 하기에도 불편하다.

---

### SQL

T0_CHAR()는 날짜를 숫자로 도출하여 활용할때 쓰지만 내가 알고자 했던부분은 어느 값이 더큰지라서 TO_DATE()만 써도 괜찮았다.

```sql
TO_CHAR(TO_DATE(RENT_DATE) - TO_DATE(기입일)) <= -1
```

이런형태로 번거롭고 어렵게 풀이하였고,

```sql
TO_DATE(RENT_DATE) > TO_DATE(기입일)
```

이렇게 다시 간소화하였다.

---

### JAVA

```java
public class Car {
  // 차량dto
	  private String no;		// 차번호(기본키)
	  private String name;	// 차량이름
		private String kind;		// 차량분류
		private String brand;		// 브랜드분류
	  private String remark;	// 차량비고
	  private String is_rent;	// 반납여부
	  private int counting;	// 대여횟수
	  private String image;	// 이미지
```

겹치는 외래키값을 DTO에서 값으로 받을때 SQL문으로 테이블 조인시킨뒤 클래스IN클래스 형태로 받는것이 아닌, DTO안의 외래키값을 String 이나 int로 받아와서 웹상에서 Get Post할때 받고 던질생각이였다.

```java
public class Car {
  // 차량dto
	  private String no;		// 차번호(기본키)
	  private String name;	// 차량이름
	  private Kind kind;		// 차량분류
	  private Brand brand;		// 브랜드분류
	  private String remark;	// 차량비고
	  private String is_rent;	// 반납여부
	  private int counting;	// 대여횟수
	  private String image;	// 이미지
```

Back End에는 그렇게 구현하는것이 편할거라 생각했다 하지만, Front End에서 값을 주고받을려니 너무 번거로워졌다.

---

### 느낀점?

DB정규화라는게 괜히 있는게 아닌것 같다.

알고리즘을 짤땐 무조건 IPO에 맞게 적어두고 코딩하자

편하게 대충 코딩하기전에 나중에 유지보수할 사람을 생각하자

```toc
```
