const data = {
    message: "Hello from API",
    timestamp: new Date().toISOString(),
    items: [
        { id: 1, name: "春节", value: 1500 },
        { id: 2, name: "国庆节", value: 2000 },
        { id: 3, name: "中秋节", value: 1200 },
        { id: 4, name: "劳动节", value: 800 },
        { id: 5, name: "端午节", value: 900 }
    ]
};

process.stdout.write(JSON.stringify(data));