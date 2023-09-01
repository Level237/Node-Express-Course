const express=require('express')
require('./db/mongoose')
const User=require('./models/User')
const Task=require('./models/Task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user=new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send({
            message:err.message
        })
    })
   
})

app.post('/tasks',(req,res)=>{

    const task=new Task(req.body);

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((err)=>{
        res.status(400).send({error:err.message})
    })
})
app.listen(port,()=>{
    console.log('Server is up in port '+port);
})