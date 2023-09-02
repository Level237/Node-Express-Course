const express=require('express')
require('./db/mongoose')
const User=require('./models/User')
const Task=require('./models/Task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.get("/users",async(req,res)=>{

    try{
        const user=await User.find({})
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get("/users/:id",async(req,res)=>{
    const __id=req.params.id;

    try{
        const user=await User.findById(__id);

        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
   
    //User.findById(__id).then((user)=>{
        //if(!user){
            //res.status(404).send()
        //}
        
        //res.status(200).send(user)
    //}).catch((e)=>{
        //res.status(500).send()
    //})
   
})

app.get("/tasks",async(req,res)=>{

    try{
        const tasks=await Task.find({});
        
        res.status(200).send(tasks);
    }catch(e){

    }
    //Task.find({}).then((task)=>{
        //res.status(200).send(task)
    //}).catch((e)=>{
        //res.status(500).send(e)
    //})
})
app.post('/users',async (req,res)=>{
    const user=new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
   
    //user.save().then(()=>{
        //res.status(201).send(user)
    //}).catch((err)=>{
        //res.status(400).send({
            //message:err.message
        //})
    //})
   
})

app.post('/tasks',async(req,res)=>{

    try{
        const task=new Task(req.body);
        await task.save()

        res.status(201).send(task)
    }catch(e){
        res.status(400).send({error:e.message})
    }

    //task.save().then(()=>{
        //res.status(201).send(task)
    //}).catch((err)=>{
        //res.status(400).send({error:err.message})
    //})
})

app.get('/task/:id',async(req,res)=>{
    const __id=req.params.id;

    try{
        const task=await Task.findById(__id)

        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }

    //Task.findById(__id).then((task)=>{
        //if(!task){
            //res.status(404).send()
        //}
        
        //res.status(200).send(task)
    //}).catch((e)=>{
        //res.status(500).send()
    //})
})
app.listen(port,()=>{
    console.log('Server is up in port '+port);
})