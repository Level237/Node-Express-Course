const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set("view engine","hbs")
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup Static directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{

    res.render('index',{
        title:"Weather app",
        name:"Balep martin"
    });
})

app.get('/help/*',(req,res)=>{

    res.render('notFound',{
        title:"404",
        error:"Help article not found",
        name:"Balep martin"
    }
    );
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        "helpText":"This is some helpful text",
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
    const address=req.query.address;
    if(!address){
        res.send({
            error:"you must provide an address"
        })
    }

    geocode(address,(err,{location})=>{
        if(err){
            res.send(err);
        }
    
    forecast(location, (error, forecastData) => {
        if(error){
            res.send(err);
        }
        res.send({
            forecast:forecastData,
            location,
            address
        })
        res.send(forecastData)
      })
    })
    //res.send({
        //forecast:"it is snowing",
        //location:"London",
        //address
    //});
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            search:"You must provide a search term"
        })
    }
    res.send({
        product:[]
    })
})
app.get('*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        name:"balep martin",
        error:"Page not Found"
    })
})
app.listen(3000,()=>{
    console.log("Server is up on server 3000");
})
