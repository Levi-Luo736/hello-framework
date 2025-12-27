---
layout: dashboard
theme: dark
title: 测试消耗详情
toc: false
---

# 电力消耗详情
```js
const apiData = await (async () => {
  try {
    console.log('开始调用 API...');
    const response = await fetch('/api/data?name=张三');
    console.log('响应状态:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('获取到的数据:', data);
    return data;
    
  } catch (error) {
    console.error('API 调用失败:', error);
    // 返回模拟数据
    return {
      message: '模拟数据',
      items: [
        { name: '春节', value: 1200 },
        { name: '国庆', value: 980 }
      ]
    };
  }
})();

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