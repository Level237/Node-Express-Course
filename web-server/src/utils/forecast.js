const axios=require('axios');

const forecast=(address,callback)=>{
    const url="http://api.weatherapi.com/v1/forecast.json"

    axios.get(url,{
        params: {
          q: encodeURIComponent(address)
          },headers:{
            key:"2495f968871c4b1db28123805232508",
            q:address
           }
     }).then((response)=>{
        //console.log(response.data.current.temp_c);
        callback(undefined,response.data.current.condition.text+".It is currently "+response.data.current.temp_c+" degrees out")
         
     }).catch(err=>{
        callback('Unable to connect to location services',undefined);
     })
}


 module.exports=forecast