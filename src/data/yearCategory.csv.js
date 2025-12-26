import XLSX from 'xlsx';
import { csvFormat } from 'd3-dsv';
import {ELEC_PRICE,WATER_PRICE,STEAM_PRICE,GAS_PRICE } from "../__init__.js";
import {flatData} from "../utils/flatData.js";

//首页本年度能耗各类别占比图表数据
async function load() {
   const {readFile,utils} = XLSX;
   let mergedData = [];
   const worksheet = utils.aoa_to_sheet([[]]); 
    //读取excel中的数据
   const workbook =  readFile("src/data/curtDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
      mergedData = mergedData.concat(jsonData);
   });
   //汇总各个能源总消耗量
    const totalEny = mergedData.map((obj)=>{
        return {date:obj.date,
          year:new Date(obj.date).getFullYear(),
          quarter:Math.floor(new Date(obj.date).getMonth()/3)+1,
          totalElec:Math.round(Number(obj.electric)*ELEC_PRICE),
          totalWater:Math.round((Number(obj.domesticWater)+Number(obj.fireWater))*WATER_PRICE),
          totalSteam:Math.round(Number(obj.steam)*STEAM_PRICE),
          totalGas:Math.round((Number(obj.companyDiningHall)+Number(obj.westernKitchen1)+Number(obj.westernKitchen2)+Number(obj.chineseKitchenEast2)+Number(obj.chineseKitchenEast1)+Number(obj.chineseKitchenWest2)+Number(obj.chineseKitchenWest1))*GAS_PRICE)
        };
    });
    const energy = flatData(totalEny);
    return csvFormat(energy);
}

process.stdout.write(await load());