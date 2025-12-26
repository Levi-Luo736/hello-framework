import * as Plot from "npm:@observablehq/plot";

export function YearDailyPlot(data,{round=true,...options}={}){
    return Plot.plot({
        ...options,
        round,//round 是一个可选的布尔参数（true/false），用于控制图形元素是否对齐到像素边界（pixel grid），以减少渲染时的抗锯齿模糊效果。
        marks:[
            Plot.lineY(data, {x:"date",
                 y: "cost",stroke:"year"})
        ],
        x: {
           type: "time", // 确保x轴被识别为时间轴
           tickFormat: (date) => {}, // 只显示月份缩写
           ticks: "month", // 确保刻度在每个月的开始
           grid: true
        }
    })

}