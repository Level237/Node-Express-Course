const app= require("express")

const User=require('../models/User')
const Task=require('../models/Task')
const auth=require('../middleware/auth')
const multer=require('multer')

const router=app.Router();
const upload=multer({

    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error('Please upload a image'))
        }
        cb(undefined,true)
    }
})
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

router.patch("/users/me",auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["name","email","password","age"];
    const   isValidationOperation=updates.every((update)=>allowedUpdate.includes(update))
    
    if(!isValidationOperation){
        return res.status(400).send({error:"Invalid body"})
    }
    console.log(req.params.id); 
    try{
        console.time('update')
        
        updates.forEach((update)=>req.user[update]=req.body[update])

        await req.user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        res.send(req.user)
        console.timeEnd('update')
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{

    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();

        res.send()
        console.log(req.user.tokens);
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{

    
    try {
        req.user.tokens=[]

        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.delete("/users/me",auth,async(req,res)=>{
    try {
        const user=await User.findOneAndDelete(req.user._id)
       
        if(!user){
            return res.status(404).send()
        }

        const tasks=await Task.deleteMany({owner:req.user._id})
        console.log(tasks);
        res.send({"message":"removed completed"})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    

    try{
        req.user.avatar=req.file.buffer
        await req.user.save()
        res.send()
    }catch(e){
        res.send(e)
    }
},(err,req,res,next)=>{
    res.send({error:err.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{

    req.user.avatar=undefined
    await req.user.save()

    res.send({message:"avatar has delete successfully"})
})


module.exports=router
