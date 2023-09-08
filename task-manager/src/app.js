const express=require('express')
require('./db/mongoose')

const userRouter=require('./routers/User')
const taskRouter=require('./routers/Task')


const app=express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports=app