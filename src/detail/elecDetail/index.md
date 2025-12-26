---
layout: dashboard
theme: dark
title: 电力消耗详情
toc: false
---
# 电力消耗详情

```js
import {setYear,subDays, isWithinInterval} from "date-fns";
import {CURT_HOLIDAY,PREVOS_HOLIDAY} from "../../holidays.js";
```

```js
  const quarterData = FileAttachment("../../data/elecQuarter.csv").csv({typed:true});
  const holidayData = FileAttachment("../../data/holiday.csv").csv({typed:true}).then(rows=>
    rows.map((row)=>({
      date:row.date,
      year:row.year,
      totalElec:row.totalElec,
      name:row.name,
      number:row.number
    }))
  );
```

```js
//display(holidayData);
const grouped = d3.group(holidayData,d=>d.name);
display(grouped);
const categoryInput = Inputs.radio(new Map([["春节","spring"],["清明节","tomb"],["劳动节","labor"],["端午节","dragon"],["中秋节","moon"],["国庆节","national"]]), {label: "请选择类别:",value:"spring"});
const category = view(categoryInput, value => value);
```



```js
//获取时间维度数据
const today = new Date();
const month = today.getMonth();//当前月份
//const quarter =Math.floor(month/3)+1;//当前季度
const quarter = 1;//**********测试用数据设置为第一季度
  
//读取上一年和今年近30天的数据
//*********测试用的虚拟时间数据*******
const time1 = new Date("2025-02-20");
const thirtyDaysAgo1 = subDays(time1, 30);
const time2 = setYear(time1, 2024);
const thirtyDaysAgo2 = subDays(time2, 30);
//*********项目上线要改动************

 // 创建区间对象
const interval1 = { start: thirtyDaysAgo1, end: time1 };
const interval2 = { start: thirtyDaysAgo2, end: time2 };
const recentData = quarterData.filter(item => {
  const itemDate = item.date;
  return isWithinInterval(itemDate, interval1)||isWithinInterval(itemDate, interval2); // 检查 itemDate 是否在 thirtyDaysAgo 之后
});
```

<style type="text/css">
@container (min-width: 560px) {
  .grid-cols-2-3 {
    grid-template-columns: 1fr 1fr;
  }
  .grid-cols-2-3 .grid-colspan-2 {
    grid-column: span 2;
  }
}

@container (min-width: 840px) {
  .grid-cols-2-3 {
    grid-template-columns: 1fr 2fr;
    grid-auto-flow: column;
  }
}
</style>


<div class="grid grid-cols-2-3" style="margin-top:2rem;">
  <div class="card">开发中....</div>
  <div class="card">开发中....</div>
  <div class="card grid-colspan-2 grid-rowspan-2" style="display:flex;flex-direction:column;">
    <h2>节假日能耗详情</h2>
            <span style="flex-grow: 1;">
            ${view(categoryInput)}
            ${resize((width) =>
            Plot.plot({
              width,
              color:{legend:true},
              marks:[
                 Plot.rectY(grouped.get(category), Plot.binX({y:"totalElec"},{x:"number",fill:"year"})),
                 Plot.ruleY([0])
              ]
            })
        )}</span>
  </div>
</div>
<div class="grid">
    <div class="card">
      <h2>最近30天电力消耗</h2>
      ${resize((width)=>
        Plot.plot({
          width,
          color: {
            legend:true,
            domain: ["上一年", "今年"], 
            range: ["#D6D2CD", "#FF7568"]
          },
          marks:[
            Plot.ruleY([0]),
            Plot.lineY(recentData,{x:"copyDate",y:"totalElec",stroke:"year"})
          ],
          x:{
            type:"time",
            label:"日期",
            grid:true,
            ticks: d3.utcSunday,
            tickFormat: d3.utcFormat("%m-%d")
          },
          y:{grid:true,label:"千瓦时 (kwh)"}
        })
        )}
     </div>
</div>