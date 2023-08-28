const express=require('express')
const path=require('path')
const app=express()

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates")

app.set("view engine","hbs")
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{

    res.render('index',{
        title:"Weather app",
        name:"Balep martin"
    });
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Balep martin"
    });
})

app.get('/about',(req,res)=>{
   res.render('about',{
    title:"About",
    name:"Balep martin"
   })
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
