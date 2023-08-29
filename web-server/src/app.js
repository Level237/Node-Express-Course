const express=require('express')
const path=require('path')
const hbs=require('hbs')

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
    res.send({
        forecast:"it is snowing",
        location:"London"
    });
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
