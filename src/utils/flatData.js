//扁平化数据
export const flatData = data => 
  data.flatMap(({ date,year,quarter, ...rest }) => 
    Object.entries(rest).map(([category, value]) => ({
      date,
      year,
      quarter,
      category,
      value
    }))
  ); 