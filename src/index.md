---
title: "济源东方国际酒店能源消耗总览"
layout: dashboard
theme: dark
toc: false
---

```js
import {YearDailyPlot} from "./components/yearDailyPlot.js";
import {Trend} from "./components/trend.js";
import api from './utils/api.js';
```
# 济源东方国际酒店能源消耗总览

```js
  const data = FileAttachment("data/totalCostDaily.csv").csv({typed: true});//每天所有能源消耗的总和
  const data6 = FileAttachment("data/last7days.csv").csv({typed: true});
  const data7 = FileAttachment("data/prevosDaily.csv").csv({typed: true});
  const data8 = FileAttachment("data/curtDaily.csv").csv({typed: true});
   const energyCategory = FileAttachment("data/yearCategory.csv").csv({typed: true});
```


```js
display(energyCategory);
//const users = await api.get('/api/data.js');
const today = data6[data6.length-1];
const yestoday = data6[data6.length-2];
//display(users);

```

<div class="grid grid-cols-4">
  <a class="card" href="./detail/elecDetail/index" style="color:inherit;">
     <h2>今日电力消耗</h2>
     <span class="big">${today.elec} </span>
     ${Trend(today.elec-yestoday.elec)}  </span>
     <span class="muted">相比昨天</span>
  </a>
  <a class="card" href="./detail/gasDetail/index" style="color:inherit;">
     <h2>今日燃气消耗</h2>
     <span class="big">${today.gas}</span>
     ${Trend(today.gas-yestoday.gas)}</span>
     <span class="muted">相比昨天</span>
  </a>
  <a class="card" href="./detail/waterDetail/index" style="color:inherit;">
     <h2>今日用水消耗</h2>
     <span class="big">${today.water}</span>
     ${Trend(today.water-yestoday.water)}  </span>
     <span class="muted">相比昨天</span>
  </a>
  <a class="card" href="./detail/steamDetail/index" style="color:inherit;">
     <h2>今日蒸汽消耗</h2>
     <span class="big">${today.steam}</span>
     ${Trend(today.steam-yestoday.steam)}  </span>
     <span class="muted">相比昨天</span>
  </a>
</div>

<div class="card">
  <h2>年度能耗总览</h2>
  <h3>2024年 <b style="color: var(--theme-foreground);">-</b>2025年 <b style="color: var(--theme-foreground-focus);"></b> 能源消耗</h3>
    ${resize((width)=>
      Plot.plot({
        width,
        marginRight:40,
        color: {
            legend:true,
            domain: ["上一年", "今年"], 
            range: ["#D6D2CD", "#FF7568"]
        },
        marks:[
          Plot.ruleY([0]),
          Plot.lineY(data, {x: "copyDate",y: "cost",stroke:"year"})
        ],
        x:{
          type:"time",
          tickFormat:d => Number(d3.timeFormat("%m")(d))+"月",
          label:"月份",
          grid:true
        },
       y:{insetTop:20,label:"单位：元/人民币"}
    }))}
</div>
<div class="card">
 <h2>2025年各能源消耗占比总览</h2>
    ${resize((width)=>
      Plot.plot({
        width,
         marginLeft: 50,
         color: {
          legend: true,
          tickFormat: (value) => {
              const mapping = {
                'totalElec': '电能',
                'totalSteam': '蒸汽',
                'totalWater': '用水',
                'totalGas':'天然气'
              };
          return mapping[value] || value;
       }
         },
         x:{
          type:"time",
          domain:[new Date("2025-01-01"), new Date("2025-12-31")],
          tickFormat:d => Number(d3.timeFormat("%m")(d))+"月",
          label:"月份",
          grid:true
        },
         y: {
           grid: true,
           label: "↑ 单位：元/人民币"
        },
        marks: [
           Plot.areaY(energyCategory, {x: "date", y: "value", fill: "category",offset:"wiggle", curve: "natural",title: "category"}),
           Plot.ruleY([0])
        ]
})
      )}
</div>


