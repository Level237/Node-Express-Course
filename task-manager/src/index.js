const express=require('express')
require('./db/mongoose')

const userRouter=require('./routers/User')
const taskRouter=require('./routers/Task')


const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)





app.listen(port,()=>{
    console.log('Server is up in port '+port);
})

const bcrypt=require('bcryptjs')

const myFunction=async()=>{
    const password="levelVertos";
    const hashedPassword=await bcrypt.hash(password,10)

    console.log(password);
    console.log(hashedPassword);

    const isMatch=await bcrypt.compare(password,hashedPassword)

    


}

