require('../db/mongoose')
const Task=require('../models/Task')

Task.findByIdAndDelete("64f1a543e043b4d8c8d6117a")
.then((task)=>{
    console.log(task);

    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
})