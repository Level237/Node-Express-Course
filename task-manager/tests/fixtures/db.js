const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken');
const User=require('../../src/models/User')
const userOneId=new mongoose.Types.ObjectId
const userOne={
    _id:userOneId,
    name:"martin",
    email:"bramslevel129@gmail.com",
    password:"levelvertos",
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const setupDatabase=async()=>{
    await User.deleteMany();
    await new User(userOne).save()
}

module.exports={
    userOne,
    userOneId,
    setupDatabase
}