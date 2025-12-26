//处理excel中的日期
function excelNumberToDate(excelNum) {
    const startDate = parseISO('1900-01-01');
    const adjustedDate = addDays(startDate, excelNum - 1 - 2);
    return adjustedDate.toISOString().split('T')[0];
}

export default async function handler(request,response){

    try{
        //模拟数据获取
        const data = {
            message:"Hello from API",
            timestamp:new Date().toISOString(),
            items:[
                {id:1,name: "Item1",value:100},
                {id:2,name: "Item2",value:200}
            ]
        };

        //成功响应
        response.status(200).json(data);
    } catch(error){
        //错误处理
        response.status(500).json({
            error:"Internal Server Error",
            message:error.message
        });
    }
}