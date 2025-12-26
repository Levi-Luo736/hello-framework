import {csvFormat} from "d3-dsv";
import XLSX from 'xlsx';
import {filterDataByDateRanges} from "../components/filterDataByDateRanges.js";
import {CURT_HOLIDAY,PREVOS_HOLIDAY} from "../holidays.js";
import { isWithinInterval } from "date-fns";

async function load() {
  const {readFile,utils} = XLSX;
  let prevosData = [];
  let curtData = [];
  let holidayData = [];
    // 创建一个空工作表
   let ws = utils.aoa_to_sheet([[]]);
    //读取excel中的数据
  const workbook =  readFile("src/data/prevosDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
       prevosData = prevosData.concat(jsonData);
   });
   //过滤出当年的节假日数据
   //获取节假日的key
   let holidaykeys = PREVOS_HOLIDAY.keys();
   for(let key of holidaykeys){
      const interval = { start: new Date(PREVOS_HOLIDAY.get(key).start), end: new Date(PREVOS_HOLIDAY.get(key).end) };
      const result = prevosData.filter(item=>{
        return isWithinInterval(item.date,interval);
      })
      holidayData =holidayData.concat(result.map((item,index)=>{
        return {date:item.date,
               year:new Date(item.date).getFullYear(),
               totalElec:item.electric,
               totalWater:Math.round(Number(item.domesticWater)+Number(item.fireWater)),
               totalSteam:item.steam,
               totalGas:Math.round(Number(item.companyDiningHall)+Number(item.westernKitchen1)+Number(item.westernKitchen2)+Number(item.chineseKitchenEast2)+Number(item.chineseKitchenEast1)+Number(item.chineseKitchenWest2)+Number(item.chineseKitchenWest1)),
               name:key,
               number:index-Math.floor(result.length / 2)
        }
      }));
   }
  const workbook2 =  readFile("src/data/curtDaily.xlsx");
   workbook2.SheetNames.forEach(sheetName => {
      let workSheet = workbook2.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
       curtData = curtData.concat(jsonData);
   });
   holidaykeys = CURT_HOLIDAY.keys();
   for(let key of holidaykeys){
      const interval = { start: new Date(CURT_HOLIDAY.get(key).start), end: new Date(CURT_HOLIDAY.get(key).end) };
      const result = curtData.filter(item=>{
        return isWithinInterval(item.date,interval);
      })
      holidayData = holidayData.concat(result.map((item,index)=>{
        return {date:item.date,
               year:new Date(item.date).getFullYear(),
               totalElec:item.electric,
               totalWater:Math.round(Number(item.domesticWater)+Number(item.fireWater)),
               totalSteam:item.steam,
               totalGas:Math.round(Number(item.companyDiningHall)+Number(item.westernKitchen1)+Number(item.westernKitchen2)+Number(item.chineseKitchenEast2)+Number(item.chineseKitchenEast1)+Number(item.chineseKitchenWest2)+Number(item.chineseKitchenWest1)),
               name:key,
               number:index-Math.floor(result.length / 2)
        }
      }));  
   }
  return csvFormat(holidayData);
}
  process.stdout.write(await load());
