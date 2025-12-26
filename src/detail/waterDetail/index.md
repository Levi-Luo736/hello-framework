---
layout: dashboard
theme: dark
title: "用水消耗详情"
toc: false
---
# 用水消耗详情

```js
import {setYear,subDays, isWithinInterval} from "date-fns";
```

```js
  const quarterData = FileAttachment("../../data/waterQuarter.csv").csv({typed: true});
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
```js
const categoryInput = Inputs.radio(new Map([["用水总量",1],["生活用水",2],["消防用水",3]]), {label: "请选择类别:",value:1});
const category = view(categoryInput, value => value);
const opacityMap = {
    1: {a: 1, b: 0, c: 0},
    2: {a: 0, b: 1, c: 0},
    3: {a: 0, c: 1, b: 0}
  };
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
        <span style="flex-grow: 1;">${resize((width, height) =>
            Plot.plot({
              width,
              height,
              y: {grid: true, label: "rate (%)"},
              marks: [
                   Plot.ruleY([0])
              ]
            })
        )}</span>
  </div>
</div>
<div class="grid">
    <div class="card" style="height: 500px">
      <h2>最近30天用水消耗</h2>
      ${view(categoryInput)}
      ${resize((width) =>
        Plot.plot({
          width,
          color: {
            legend:true,
            domain: ["上一年", "今年"], 
            range: ["#D6D2CD", "#FF7568"]
          },
          marks:[
            Plot.ruleY([0]),
            Plot.lineY(recentData, {
              x:"copyDate",
              y: "total",
              stroke: "year",
              strokeOpacity:opacityMap[category].a
            }),
            Plot.lineY(recentData, {
              x:"copyDate",
              y: "lifeWater",
              stroke: "year",
              strokeOpacity:opacityMap[category].b
            }),
            Plot.lineY(recentData, {
              x:"copyDate",
              y: "fireWater",
              stroke: "year",
              strokeOpacity:opacityMap[category].c
            })
          ],
          x:{
            type:"time",
            label:"日期",
            grid:true,
            ticks: d3.utcSunday,
            tickFormat: d3.utcFormat("%m-%d")
          },
          y:{grid:true,label:"立方米 (m³)"}
        })
        )}
     </div>
</div>