import XLSX from 'xlsx';

async function load() {
   const {readFile,utils} = XLSX;
   let mergedData = [];
   const worksheet = utils.aoa_to_sheet([[]]); 
    //读取excel中的数据
   const workbook =  readFile("src/data/curtDaily.xlsx");
   workbook.SheetNames.forEach(sheetName => {
      let workSheet = workbook.Sheets[sheetName];
      let jsonData = utils.sheet_to_json(workSheet,{ defval: -1,raw:false});
      mergedData = mergedData.concat(jsonData);
   });
   //提取电力数值
    const elec = mergedData.map((obj)=>{
        return {date:obj.date,
          year:new Date(obj.date).getFullYear(),
          quarter:Math.floor(new Date(obj.date).getMonth()/3)+1,
          totalElec:parseInt(obj.electric),
          electric:parseInt(obj.electric),
          totalWater:parseInt(obj.domesticWater)+parseInt(obj.fireWater),
          lifeWater:parseInt(obj.domesticWater),
          fireWater:parseInt(obj.fireWater),
          totalSteam:parseInt(obj.steam),
          steam:parseInt(obj.steam),
          totalGas:parseInt(obj.companyDiningHall)+parseInt(obj.westernKitchen1)+parseInt(obj.westernKitchen2)+parseInt(obj.chineseKitchenEast2)+parseInt(obj.chineseKitchenEast1)+parseInt(obj.chineseKitchenWest2)+parseInt(obj.chineseKitchenWest1),
          companyDiningHall:parseInt(obj.companyDiningHall),
          westernKitchen1:parseInt(obj.westernKitchen1),
          westernKitchen2:parseInt(obj.westernKitchen2),
          chineseKitchenEast2:parseInt(obj.chineseKitchenEast2),
          chineseKitchenEast1:parseInt(obj.chineseKitchenEast1),
          chineseKitchenWest2:parseInt(obj.chineseKitchenWest2),
          chineseKitchenWest1:parseInt(obj.chineseKitchenWest1)
        };
    });
   utils.sheet_add_json(worksheet, elec);
   return utils.sheet_to_csv(worksheet);
}

process.stdout.write(await load());