const axios=require('axios');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')




geocode("Boston",(err,data)=>{
console.log(data);
})



forecast("New York", (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

