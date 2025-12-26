import XLSX from 'xlsx';
import { csvFormat } from 'd3-dsv';

async function load() {
   const {readFile,utils} = XLSX;
   let mergedData = [];
   const worksheet = utils.aoa_to_sheet([[]]); 
    //读取excel中的数据
   const workbook =  readFile("src/data/prevosDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: null,raw:false});
      mergedData = mergedData.concat(jsonData);
   });
   //提取能源总数值
    const elec = mergedData.map((obj)=>{
        return {date:obj.date,
         year:new Date(obj.date).getFullYear(),
         quarter:Math.floor(new Date(obj.date).getMonth()/3)+1,
          totalElec:parseInt(obj.electric),
          totalWater:parseInt(obj.domesticWater)+parseInt(obj.fireWater),
          totalSteam:parseInt(obj.steam),
          totalGas:parseInt(obj.companyDiningHall)+parseInt(obj.westernKitchen1)+parseInt(obj.westernKitchen2)+parseInt(obj.chineseKitchenEast2)+parseInt(obj.chineseKitchenEast1)+parseInt(obj.chineseKitchenWest2)+parseInt(obj.chineseKitchenWest1)
        };
    });
   return csvFormat(elec);
}

process.stdout.write(await load());