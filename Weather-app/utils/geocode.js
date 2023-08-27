const axios=require('axios');

const geocode=(address,callback)=>{
    const geoCodeUrl='http://us1.locationiq.com//v1/search?key=pk.5662601f43f70d5ab4a2af452f4348bd&q='+encodeURIComponent(address)+'&format=json'


    axios.get(geoCodeUrl).then((response)=>{
    
       callback(undefined,{
        latitude:response.data[0].lat,
        longitude:response.data[0].lon,
        location:response.data[0].display_name
       })
       
    }).catch(err=>{
        callback('Unable to connect to location services',undefined);
    })

}

module.exports=geocode