const app= require("express")
const router=app.Router();
const User=require('../models/User')
const auth=require('../middleware/auth')



router.get("/users/me",auth,async(req,res)=>{
res.send(req.user)
})

router.post('/users/login',async(req,res)=>{

    try {
        const user=await User.findByCredentials(req.body.email,req.body.password,8)
        const token=await user.generateAuthToken()
        //console.log({user,token});
        //console.log(token);
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error)
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
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
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
    console.log(req.params.id); 
    try{
        console.time('update')
        const user=await User.findById(req.params.id)
        
        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
        console.timeEnd('update')
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
