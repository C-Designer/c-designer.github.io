---
emoji: 👀
title: google chart api 적용
date: '2020-11-01 00:00:00'
author: C-Designer
tags: 
categories: 코드리뷰
published: true
---

![gender_chart_4.png](gender_chart_4.png)

차트api의 한정된 구조에 맞춰 sql을 짜야하다보니 DB구조상 복잡하게 데이터를 추출해야 했다.

```java
//그래프에 표시할 데이터          
var dataRow = [];
          
for(var i = 0; i <= 29; i++){ //랜덤 데이터 생성            
		var total   = Math.floor(Math.random() * 300) + 1;            
		var man     = Math.floor(Math.random() * total) + 1;            
		var woman   = total - man;            
		
		dataRow = [new Date('2017', '09', i , '10'), man, woman , total];            
		data.addRow(dataRow);          
}
```

api 상에는 랜덤값으로 설정되어 차트가 나와있었지만 나는 DB에서 값을 받아와 집어 넣어야했기에

```java
//그래프에 표시할 데이터          
var dataRow = [];          
for(var i=1; i < ${carByMonthly}.length; i++){            
		var man     = ${carByMonthly}[i][1];            
		var woman   = ${carByMonthly}[i][2];            
		var total   = man + woman;            
		console.log(man, woman, total);            
		
		var year = ${carByMonthly}[i][0].substring(0,4);                    
		var month = Number(${carByMonthly}[i][0].substring(5,8)) -1;                   
		console.log(year, month);            
		
		dataRow = [new Date(year, month), man, woman , total];            
		data.addRow(dataRow);          
}
```

던질값에 맞춰 받을값을 변경하였다. 사실 프론트에서 받는건 크게 문제가 되지않는다.

```sql
-- 월별 차량대여현황
SELECT TO_CHAR(RENT_DATE, 'YYYY-MM') AS RENT_DATE,
	(SELECT count(*) FROM (SELECT * FROM MEMBER m LEFT OUTER JOIN RENT rent ON rent.ID = m.ID WHERE gender = 'F') WHERE RENT_DATE = r.RENT_DATE) AS F,
	(SELECT count(*) FROM (SELECT * FROM MEMBER m LEFT OUTER JOIN RENT rent ON rent.ID = m.ID WHERE gender = 'M')WHERE RENT_DATE = r.RENT_DATE) AS M

FROM RENT r
GROUP BY TO_CHAR(RENT_DATE, 'YYYY-MM'), RENT_DATE
ORDER BY RENT_DATE;
```

![gender_chart_2.png](gender_chart_2.png)

최대한 머리를짜내어 구현해봤지만, 메인 쿼리의 GROUP BY 에서 서브 쿼리를 받을 RENT_DATE를 적는순간 분류하는 기준이 날짜별로 갈린뒤 동일한 해당월이 컬럼이 2개가 된다

```sql
-- 월별 차량대여현황
SELECT TO_CHAR(RENT_DATE, 'YYYY-MM') AS RENT_DATE, WM_CONCAT(GENDER) AS GENDER    FROM MEMBER m JOIN RENT rent ON rent.ID = m.ID    
GROUP BY TO_CHAR(RENT_DATE, 'YYYY-MM')    
ORDER BY RENT_DATE;
```

![gender_chart_3.png](gender_chart_3.png)

스트링으로 받아 카운팅 하는 수밖에 떠오르질 않는다.

```java
do {        
		String gender = rs.getString("GENDER");        
		int man = 0;        
		int woman = 0;

		if(gender.length() > 1) { // 값이 여러개일시 ,로 잘라 배열로 구분            
				String[] array = gender.split(",");            
				for(int i=0; i<array.length; i++) {                
						if(array[i].equals("M")) { man++; }
						if(array[i].equals("F")) { woman++; }
				}

		} else { // 값이 한개일시 , 자를필요없이 구분
				if(gender.equals("M")) { man++; }
				if(gender.equals("F")) { woman++; }
		}

		JSONArray rowArray = new JSONArray();
		rowArray.put(rs.getString("RENT_DATE"));
		rowArray.put(man);
		rowArray.put(woman);
		jsonArray.put(rowArray);
} while (rs.next());
```

![gender_chart_1.png](gender_chart_1.png)

### 느낀점?

다듬을 시간도 구현할 시간도 부족했지만, 배움이 많이 부족한것같다 차차 공부하여 간결성, 재사용성, 이해도가 높은 코드를 짜야겠다.

```toc
```
