import {utcParse} from "d3-time-format";
import XLSX from 'xlsx';
import { subDays,subYears } from 'date-fns';


//注意！！！！这是测试的时候用的，上线需要更改
const yesterday = subDays(new Date(), 1);
// 获取上一年的昨天
const endDate = subYears(yesterday, 1);
const startDate = subDays(endDate, 7);




async function load() {
  const {readFile,utils} = XLSX;
  let mergedData = [];
    // 创建一个空工作表
   let ws = utils.aoa_to_sheet([[]]);
    //读取excel中的数据
  const workbook =  readFile("src/data/prevosDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: -1,raw:false});
       mergedData = mergedData.concat(jsonData);
   });
     //过滤出最近七天的数据
     const results = mergedData.filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate);

     //对这7天的数据进行汇总
     const total = results.map((obj)=>{
        return {date:obj.date,
          elec:parseInt(obj.electric),
          water:parseInt(obj.domesticWater)+parseInt(obj.fireWater),
          steam:parseInt(obj.steam),
          gas:parseInt(obj.companyDiningHall)+parseInt(obj.westernKitchen1)+parseInt(obj.westernKitchen2)+parseInt(obj.chineseKitchenEast2)+parseInt(obj.chineseKitchenEast1)+parseInt(obj.chineseKitchenWest2)+parseInt(obj.chineseKitchenWest1), 
        };
     });
   // 4. 将合并后的数据转换为CSV格式
  utils.sheet_add_json(ws, total);
  return utils.sheet_to_csv(ws);
  
}
  process.stdout.write(await load());