const express=require('express')
const path=require('path')
const app=express()

    const publicDirectoryPath=path.join(__dirname,'../views')

    app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index')
})
const port=process.env.port || 3000
app.listen(3000,()=>{
    console.log("Server is up in port "+port);
})