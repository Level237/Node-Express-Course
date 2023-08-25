const axios=require('axios')


const url="http://api.weatherapi.com/v1/forecast.json"

axios.get(url,{
    params: {
        q: "london"
      },headers:{
        key:"2495f968871c4b1db28123805232508"
      }
}).then((response)=>{
    
    console.log(response.data);
}).catch(err=>{
    console.log(err);
})


