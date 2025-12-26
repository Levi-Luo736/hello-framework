class ApiClient {
    constructor(baseURL = ''){
      this.baseURL = baseURL;
    }

    async request(endpoint,options = {}){
      const url = `${this.baseURL}${endpoint}`;
      try{
        const response = await fetch(url,{
            headers:{
                'Content-Type':'application/json',
                ...options.headers
            },
            ...options
        });
        if(!response.ok){
            throw new Error(`HTTP ERROR! status:${response.status}`);
        }
        return await response.json();
      } catch(error){
        console.error('API request failed:',error);
        throw error;
      }
    }
    async get(endpoint,params={}){
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `$(endpoint)?${queryString}` : endpoint;
        return this.request(url);
    }
    async post(endpoint,data){
        return this.request(endpoint,{
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

export default new ApiClient();