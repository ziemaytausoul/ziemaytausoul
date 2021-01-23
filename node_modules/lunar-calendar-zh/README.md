#LunarCalendar#

此為正體中文版本

請參閱[原始專案](https://github.com/zzyss86/LunarCalendar)

農曆（陰曆）萬年曆，是一款支持Node.js和瀏覽器端使用的全功能農曆和公曆日曆類庫。支持農曆與公曆之間相互轉換，含有二十四節氣，天干地支紀年紀月紀日，生肖屬相，公曆節假日及農曆傳統節假日信息等功能。自帶2013-2014節假日安排數據，並可自行配置。帶有黃曆數據，可自行選擇配置。支持1891-2100年。使用**LunarCalendar**可快速開發一款屬於自己的萬年曆產品，行動起來吧！

##Install##

1. Node.js服務器端(使用npm安裝)：
`npm install lunar-calendar`
2. 瀏覽器端使用，引用腳本：
`<script type="text/javascript" src="lib/LunarCalendar.min.js"></script>`


##Usage##
###Node.js###
var LunarCalendar = require("lunar-calendar");

###瀏覽器###
`window.LunarCalendar`是一個全局對象，可以全局作用域直接調用。

##DEMO產品：小推萬年曆（手機版）##
訪問方式：（手機掃瞄二維碼）

![二維碼](http://cdn.tuijs.com/upload/1956115939.png)

![小推萬年曆截圖](http://cdn.tuijs.com/upload/calendar_photo.png)

##方法列表##
###LunarCalendar.calendar(year,month[,fill])###
通過公曆獲取某月農曆數據

####參數說明####
- @param {Number} `year` 公曆年 範圍[1891-2100]
- @param {Number} `month` 公曆月 範圍[1-12]
- @param {Boolean} `fill`（可選） 是否填充當月日曆首尾日期，設為true時，會在首尾填入上下月數據，自動補全一個7*6陣列數據。（可更美觀的打造你的萬年曆產品）

####返回數據####
	{
	    "firstDay": 5, //該月1號星期幾（日曆開始位置）
	    "monthDays": 28, //該月天數
	    "monthData": [ //本月所有日曆數據
	        {
	            "year": 2014, //公曆年
	            "month": 2, //公曆月
	            "day": 1, //公曆日
	            "zodiac": "蛇", //生肖屬相
	            "GanZhiYear": "癸巳", //干支紀年
	            "GanZhiMonth": "乙丑", //干支紀月
	            "GanZhiDay": "癸卯", //干支紀日
	            "worktime": 2, //0無特殊安排，1工作，2放假
	            "lunarYear": 2014, //農曆年
	            "lunarMonth": 1, //農曆月（1-13，有閏月情況，比如當前閏9月，10表示閏9月，11表示10月）
	            "lunarDay": 2, //農曆日
	            "lunarMonthName": "正月", //農曆月中文名
	            "lunarDayName": "初二", //農曆日中文名
	            "lunarLeapMonth": 9, //農曆閏月所在月份，0表示無閏月
				"solarFestival": "", //公曆節假日，undefined或『勞動節』之類
				"lunarFestival": "", //農曆節假日，undefined或『除夕』之類
				"term": "" //二十四節氣名，undefined或『立春』之類
	        },
			...
	    ]
	}

###LunarCalendar.solarCalendar(year,month[,fill])###
獲取公曆某月日曆數據（不帶農曆信息）

####參數說明####
- @param {Number} `year` 公曆年 範圍[1-~]公元後
- @param {Number} `month` 公曆月 範圍[1-12]
- @param {Boolean} `fill`（可選） 是否填充當月日曆首尾日期，設為true時，會在首尾填入上下月數據，自動補全一個7*6陣列數據。（可更美觀的打造你的萬年曆產品）

####返回數據####
	{
	    "firstDay": 5, //該月1號星期幾（日曆開始位置）
	    "monthDays": 28, //該月天數
	    "monthData": [ //本月所有日曆數據
	        {
	            "year": 2014, //公曆年
	            "month": 2, //公曆月
	            "day": 1 //公曆日
	        },
			...
	    ]
	}

###LunarCalendar.solarToLunar(year,month,day)###
將公曆轉換為農曆

####參數說明####
- @param {Number} `year` 公曆年 範圍[1891-2100]
- @param {Number} `month` 公曆月 範圍[1-12]
- @param {Number} `day` 公曆日 範圍[1-31]

####返回數據####
	{
	    "zodiac": "蛇", //生肖屬相
	    "GanZhiYear": "癸巳", //干支紀年
	    "GanZhiMonth": "乙丑", //干支紀月
	    "GanZhiDay": "癸卯", //干支紀日
	    "worktime": 2, //0無特殊安排，1工作，2放假
	    "lunarYear": 2014, //農曆年
	    "lunarMonth": 1, //農曆月（1-13，有閏月情況，比如當前閏9月，10表示閏9月，11表示10月）
	    "lunarDay": 2, //農曆日
	    "lunarMonthName": "正月", //農曆月中文名
	    "lunarDayName": "初二", //農曆日中文名
	    "lunarLeapMonth": 9, //農曆閏月所在月份，0表示無閏月
		"solarFestival": "", //公曆節假日，undefined或『勞動節』之類
		"lunarFestival": "", //農曆節假日，undefined或『除夕』之類
		"term": "" //二十四節氣名，undefined或『立春』之類
	}

###LunarCalendar.lunarToSolar(year,month,day)###
將農曆轉換為公曆

####參數說明####
- @param {Number} `year` 農曆年 範圍[1891-2100]
- @param {Number} `month` 農曆月 範圍[1-13]（有閏月情況，比如當前閏9月，10表示閏9月，11表示10月）
- @param {Number} `day` 農曆日 範圍[1-30]

####返回數據####
	{
	    "year": 2014, //公曆年
	    "month": 1, //公曆月
	    "day": 31 //公曆日
	}

###LunarCalendar.setWorktime(data)###
設置某年的節假日安排信息（類庫已內置2013-2014年的數據）

####參數說明####
- @param {Object} `data` 節假日安排信息(以年為key，可設置多年)
- 0：無特殊安排，1：工作，2：放假

**參數data格式如下：**

	{
	    "y2014": {
	        "d0101": 2,
	        "d0126": 1,
	        "d0131": 2,
	        "d0201": 2,
	        "d0202": 2,
	        "d0203": 2,
	        "d0204": 2,
	        "d0205": 2,
	        "d0206": 2,
	        "d0208": 1,
	        "d0405": 2,
	        "d0407": 2,
	        "d0501": 2,
	        "d0502": 2,
	        "d0503": 2,
	        "d0504": 1,
	        "d0602": 2,
	        "d0908": 2,
	        "d0928": 1,
	        "d1001": 2,
	        "d1002": 2,
	        "d1003": 2,
	        "d1004": 2,
	        "d1005": 2,
	        "d1006": 2,
	        "d1007": 2,
	        "d1011": 1
	    }
	}

##黃曆數據##
在目錄/hl/下有2008-2020年的黃曆數據，用戶可自行選擇在自己萬年曆中進行添加。

##公用服務器API##
用Node.js搭載lunar-calendar類庫。

- API:http://api.tuijs.com/
- 請求類型：GET
- 返回數據：JSON 或 JSONP
- JSONP：支持，添加參數callback（僅支持數字，字母，下劃線）

###API列表###

- 通過公曆獲取某月農曆數據 http://api.tuijs.com/calendar
- 獲取公曆某月日曆數據（不帶農曆信息）http://api.tuijs.com/solarCalendar
- 將公曆轉換為農曆http://api.tuijs.com/solarToLunar
- 將農曆轉換為公曆http://api.tuijs.com/lunarToSolar

**例如：**

http://api.tuijs.com/lunarToSolar?year=2011&month=1&day=1&callback=fn

返回：
`fn({"year":2011,"month":2,"day":16})`

##其它##
- 項目主頁：[http://www.tuijs.com/](http://www.tuijs.com/ "項目主頁")
- 作者博客：[http://www.2fz1.com/](http://www.2fz1.com/ "作者博客")

JasonZhou