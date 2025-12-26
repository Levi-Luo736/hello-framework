import XLSX from 'xlsx';
import { csvFormat } from 'd3-dsv';
import { format,addYears } from 'date-fns';
import {ELEC_PRICE,WATER_PRICE,STEAM_PRICE,GAS_PRICE } from "../__init__.js";
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
   //计算所有资源的能耗总花费（换算为人民币），
    const totalArr = mergedData.map((item)=>{
        return {date:item.date,
          copyDate:item.copyDate,
          year:new Date(item.date).getFullYear()===getDate("yestarday").getFullYear()?"今年":"上一年",
          cost:Math.round(Number(item.electric)*ELEC_PRICE
          +(Number(item.domesticWater)+Number(item.fireWater))*WATER_PRICE
          +Number(item.steam)*STEAM_PRICE
          +(Number(item.companyDiningHall)+Number(item.westernKitchen1)+Number(item.westernKitchen2)+Number(item.chineseKitchenEast2)+Number(item.chineseKitchenEast1)+Number(item.chineseKitchenWest2)+Number(item.chineseKitchenWest1))*GAS_PRICE)
        };
    });
   return csvFormat(totalArr);
}

process.stdout.write(await load());