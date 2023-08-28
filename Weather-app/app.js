const axios=require('axios');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const address=process.argv[2];

if(!address){
console.log("Please provide an address");
}else{
    geocode(address,(err,data)=>{
        if(err){
            console.log(err);
        }
    
    forecast(data.location, (error, forecastData) => {
        if(error){
            console.log(err);
        }
        console.log(data.location)
        console.log(forecastData)
      })
    })
}






