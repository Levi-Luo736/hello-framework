/**
 * 过滤出多个日期区间的数据
 * @param {Array} data - 要过滤的数据数组，每个元素应包含日期字段
 * @param {Array} dateRanges - 日期区间数组，每个元素是包含start和end的对象
 * @param {string} dateField - 数据中表示日期的字段名
 * @returns {Array} - 符合任一日期区间的数据
 */
export function filterDataByDateRanges(data, dateRanges, dateField = 'date') {
  // 将日期字符串转换为Date对象以便比较
  const parseDate = (dateStr) => new Date(dateStr);
  
  return data.filter(item => {
    const itemDate = parseDate(item[dateField]);
    
    // 检查是否在任一日期区间内
    return dateRanges.some(range => {
      const startDate = parseDate(range.start);
      const endDate = parseDate(range.end);
      
      // 检查日期是否在区间内（包含边界）
      return itemDate >= startDate && itemDate <= endDate;
    });
  });
}