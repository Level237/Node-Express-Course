const express=require('express')
require('./db/mongoose')
const User=require('./models/User')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user=new User(req.body)
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400).send({
            message:err.message
        })
    })
   
})
app.listen(port,()=>{
    console.log('Server is up in port '+port);
})