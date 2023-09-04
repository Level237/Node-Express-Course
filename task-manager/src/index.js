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

const jwt=require('jsonwebtoken')

const myFunction=async()=>{
const token=jwt.sign({ _id: 'abc123' },'thisismynewcourse',{expiresIn:"24 hour"})
console.log(token);

const data=jwt.verify(token,'thisismynewcourse')

console.log(data);
}

myFunction()

