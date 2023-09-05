const express=require('express')
require('./db/mongoose')

const userRouter=require('./routers/User')
const taskRouter=require('./routers/Task')


const app=express()
const port=process.env.PORT || 3000

/*app.use((req,res,next)=>{
    if(req.method==="GET"){
        res.send('GET Request are disable')
    }else{
        next()
    }
})*/

//app.use((req,res,next)=>{
    //res.status(503).send({message:"Maintenance mode enable,comming soon"})
//})
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port,()=>{
    console.log('Server is up in port '+port);
})

const Task=require('./models/Task')
const User=require('./models/User')
const main=async()=>{

    //const task=await Task.findById('64f70b44ad0e6b608da5698e')
    //await task.populate('owner')
    //console.log(task.owner);
    const user=await User.findById("64f707cefbd4139b3edc6b24")
    await user.populate("tasks")
    console.log(user.tasks);

}

main()


