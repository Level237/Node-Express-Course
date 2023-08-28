const express=require('express')

const app=express()

app.get('',(req,res)=>{

    res.send('<h1>Weather</h1>')
})

app.get('/help',(req,res)=>{
    res.send({
        name:"andrew",
        age:2
    });
})

app.get('/about',(req,res)=>{
    res.send('<h1>About</h1');
})

app.get('/weather',(req,res)=>{
    res.send({
        forecast:"it is snowing",
        location:"London"
    });
})
//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log("Server is up on server 3000");
})
