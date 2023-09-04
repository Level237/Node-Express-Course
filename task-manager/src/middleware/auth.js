const jwt=require('jsonwebtoken')
const User = require('../models/User');


const auth=async(req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'thisismynewcourse')
        console.log(token);
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
console.log(user);
        if(!user){
            throw new Error()
        }
        //res.send(user)
        req.user=user
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }
}

module.exports=auth;