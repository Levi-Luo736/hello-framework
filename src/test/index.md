---
layout: dashboard
theme: dark
title: 测试消耗详情
toc: false
---

# 电力消耗详情
```js
const apiData = await FileAttachment("../api/data.json").json();
display(apiData);

```
```js
// const totalConsumption = apiData.items.reduce((sum, item) => sum + item.value, 0);
console.log(apiData)

```

<div class="dashboard-grid">
  <div class="card">
    <h2>总消耗</h2>
  </div>
  <div class="card">
    <h2>数据项数量</h2>
  </div>
  <div class="card detail-card">
    <h2>节假日能耗详情</h2>
   
  </div>
</div>