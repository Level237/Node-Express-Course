const app= require("express")
const router=app.Router();
const auth=require('../middleware/auth')
const Task=require('../models/Task')


router.get("/tasks",auth,async(req,res)=>{

    const match={}
    try{
        //const tasks=await Task.find({owner:req.user._id});

         req.query.completed ?  match.completed=req.query.completed==="true" : null

        console.log(req.query);
        await req.user.populate({
            path:'tasks',
           match
        })
        res.status(200).send(req.user.tasks);
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

router.get('/task/:id',auth,async(req,res)=>{
    const _id=req.params.id;

    try{
        //const task=await Task.findById(__id)
        const task=await Task.findOne({_id,"owner":req.user._id})
        console.log(task);
        if(!task){
            res.status(404).send({message:"Task Not found"})
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



router.patch("/task/:id",auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["description","completed"];
    const   isValidationOperation=updates.every((update)=>allowedUpdate.includes(update))
    const _id=req.params.id;
    if(!isValidationOperation){
        return res.status(400).send({error:"Invalid body"})
    }
    try{
       
        
        const task=await Task.findOne({_id,"owner":req.user._id})
        console.log(task);
        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) =>task[update]=req.body[update]);

        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})



router.delete("/task/:id",auth,async(req,res)=>{
    const _id=req.params.id;
    try {
        const task=await Task.findOneAndDelete({_id,"owner":req.user._id})
        //const task=await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports=router