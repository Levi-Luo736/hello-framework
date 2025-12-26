export function customDateFormat(date){
   const d = new Date(date);
  const day = d.getDate();
  
  // 每月第一天显示月份（如 "Jan"、"1月"）
  if (day === 1) {
    return d.toLocaleString('zh-CN', { month: 'short' });
  }
    return day.toString()+'号';
}