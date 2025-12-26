---
layout: dashboard
theme: dark
title: "天然气消耗详情"
toc: false
---
# 天然气消耗详情

```js
import {setYear,subDays, isWithinInterval} from "date-fns";
```

```js
  const quarterData = FileAttachment("../../data/gasQuarter.csv").csv({typed: true});
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
const categoryInput = Inputs.radio(new Map([["消耗总量",1],["员工餐厅",2],["西餐厅1",3],["西餐厅2",4],["中餐大灶",5],["中餐蒸箱/八眼灶",6],["中餐烧腊间",7],["中餐面点房",8]]), {label: "请选择类别:",value:1});
const category = view(categoryInput, value => value);
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
<div class="grid" style="height: 500px">
    <div class="card">
      <h2>最近30天然气消耗</h2>
      ${view(categoryInput)}
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
            category==1?Plot.lineY(recentData, {
              x:"copyDate",
              y: "total",
              stroke: "year"
            }):null,
            category==2?Plot.lineY(recentData, {
              x:"copyDate",
              y: "companyDiningHall",
              stroke: "year"
            }):null, 
            category==3?Plot.lineY(recentData, {
              x:"copyDate",
              y: "westernKitchen1",
              stroke: "year"
            }):null,
            category==4?Plot.lineY(recentData, {
              x:"copyDate",
              y: "westernKitchen2",
              stroke: "year"
            }):null,
            category==5?Plot.lineY(recentData, {
              x:"copyDate",
              y: "chineseKitchenEast1",
              stroke: "year"
            }):null,
            category==6?Plot.lineY(recentData, {
              x:"copyDate",
              y: "chineseKitchenEast2",
              stroke: "year"
            }):null,
            category==7?Plot.lineY(recentData, {
              x:"copyDate",
              y: "chineseKitchenWest1",
              stroke: "year"
            }):null,
            category==8?Plot.lineY(recentData, {
              x:"copyDate",
              y: "chineseKitchenWest2",
              stroke: "year"
            }):null
          ].filter(Boolean),
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