const express=require('express')
const path=require('path')
const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{

    res.send('<h1>Weather</h1>')
})

app.get('/help',(req,res)=>{
    res.send();
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
