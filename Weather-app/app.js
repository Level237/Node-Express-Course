const axios=require('axios');
const { pbkdf2 } = require('crypto');


const url="http://api.weatherapi.com/v1/forecast.json"

axios.get(url,{
    params: {
        q: "london"
      },headers:{
        key:"2495f968871c4b1db28123805232508"
      }
}).then((response)=>{
    
    
}).catch(err=>{
    console.log(err);
})

const geoCodeUrl='http://us1.locationiq.com//v1/search?key=pk.5662601f43f70d5ab4a2af452f4348bd&q=Los Angeles&format=json'

axios.get(geoCodeUrl).then((response)=>{
    
    console.log(response.data[0]);
}).catch(err=>{
    console.log(err);
})

