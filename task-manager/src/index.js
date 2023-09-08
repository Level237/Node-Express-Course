const app=require('./app')

const port=process.env.PORT

/*app.use((req,res,next)=>{
    if(req.method==="GET"){
        res.send('GET Request are disable')
    }else{
        next()
    }
})*/

//app.use((req,res,next)=>{
    //res.status(503).send({message:"Maintenance mode enable,comming soon"})
//})


app.listen(port,()=>{
    console.log('Server is up in port '+port);
})




