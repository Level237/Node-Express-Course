const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken');
const User=require('../../src/models/User')
const Task=require('../../src/models/Task')


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

const userTwoId=new mongoose.Types.ObjectId
const userTwo={
    _id:userTwoId,
    name:"level",
    email:"bramslevel@gmail.com",
    password:"levelvertos",
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:"first Task",
    completed:false,
    owner:userOne._id
}

const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:"Second Task",
    completed:true,
    owner:userOne._id
}

const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:"Second Task",
    completed:false,
    owner:userTwo._id
}

const setupDatabase=async()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports={
    userOne,
    userOneId,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}