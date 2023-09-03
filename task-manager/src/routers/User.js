const app= require("express")
const router=app.Router();
const User=require('../models/User')



router.get("/users",async(req,res)=>{

    try{
        const user=await User.find({})
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/users/:id",async(req,res)=>{
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

router.post('/users',async (req,res)=>{
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

router.patch("/user/:id",async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["name","email","password","age"];
    const   isValidationOperation=updates.every((update)=>allowedUpdate.includes(update))
    
    if(!isValidationOperation){
        return res.status(400).send({error:"Invalid body"})
    }
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/users/:id",async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})


module.exports=router
