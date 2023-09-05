const app= require("express")
const router=app.Router();
const auth=require('../middleware/auth')
const Task=require('../models/Task')


router.get("/tasks",async(req,res)=>{

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

router.post('/tasks',auth,async(req,res)=>{

    try{
        const task=new Task({
            ...req.body,
            owner:req.user._id
        })
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

router.get('/task/:id',async(req,res)=>{
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



router.patch("/task/:id",async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["description","completed"];
    const   isValidationOperation=updates.every((update)=>allowedUpdate.includes(update))
    
    if(!isValidationOperation){
        return res.status(400).send({error:"Invalid body"})
    }
    try{
        const task=await Task.findById(req.params.id)

        updates.forEach((update) =>task[update]=req.body[update]);

        await task.save()
        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})



router.delete("/task/:id",async(req,res)=>{
    try {
        const task=await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports=router