import XLSX from 'xlsx';
import {csvFormat} from 'd3-dsv';
import { format,addYears } from 'date-fns';
import {getDate} from "../components/getDate.js";

async function load() {
   const {readFile,utils} = XLSX;
   let mergedData = [];
   const worksheet = utils.aoa_to_sheet([[]]); 
    //读取excel中的数据
   const workbook =  readFile("src/data/prevosDaily.xlsx");
   const workbook2 =  readFile("src/data/curtDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
      let cData = jsonData.map((item)=>( {...item,copyDate:addYears(item.date, 1)}));
      mergedData = mergedData.concat(cData);
   });
   workbook2.SheetNames.forEach(sheetName => {
      let workSheet = workbook2.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
      let cData = jsonData.map((item)=>( {...item,copyDate:item.date}));
      mergedData = mergedData.concat(cData);
   });

   //获取时间维度数据
   const yestarday = getDate('yestarday');
   const month = yestarday.getMonth();//当前月份
   //const quarter =Math.floor(month/3)+1;//当前季度
   const quarter = 1;//**********测试用数据设置为第一季度  
   
   // 过滤出本季度的电力数据
const quarterData = mergedData.reduce((acc, item) => {
   const itemDate = new Date(item.date);
   const itemYear = itemDate.getFullYear();
   const itemQuarter = Math.floor(itemDate.getMonth()/3)+1;
  if (itemQuarter==quarter) {
    acc.push({date:itemDate,
         copyDate:item.copyDate,
         year:itemYear===getDate("yestarday").getFullYear()?"今年":"上一年",
         quarter:itemQuarter,
         total:item.steam,
         steam:item.steam
    });
  }
  return acc;
}, []);
   
   return csvFormat(quarterData);
}

process.stdout.write(await load());