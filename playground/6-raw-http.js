const https=require('http')

const url="http://api.weatherapi.com/v1/forecast.json"

const request=https.request(url,{
    params: {
      q: encodeURIComponent("philadelphia")
      },headers:{
        key:"2495f968871c4b1db28123805232508",
        q:"philadelphia"
       }
 },(response)=>{
    let data=''
    response.on('data',(chunck)=>{
        data=data+chunck.toString();
        console.log(data);
    })

    response.on('end',()=>{
    console.log(data);
    })
 })

 request.on("error",(error)=>{
    console.log("An error", error);
 })
 request.end()