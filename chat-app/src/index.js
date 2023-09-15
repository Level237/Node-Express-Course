const express=require('express')
const http=require('http')
const path=require('path')
const socketio=require('socket.io')
const Filter=require('bad-words')
const {generateMessage,generateLocationMessage}=require('./utils/messages')
const {addUser,removeUser,getUser,getuserRoom}=require('./utils/users')
const app=express()
const server=http.createServer(app)
const io=socketio(server)
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

let name="martin"
io.on('connection',(socket)=>{
    console.log("New WebSocket message");
    
    socket.on("message",(message,callback)=>{
        const filter=new Filter()

        if(filter.isProfane(message)){
            return callback("profanity is not allowed")
        }
        io.to("center city").emit("message",generateMessage(message))
        callback()
    })

    socket.on("sendlocation",(position,callback)=>{
        const message=`https://www.google.com/maps?q=${position.lat},${position.lon}`
        io.emit("locationMessage",generateLocationMessage(message))
        console.log(position);
        callback()
    })
    socket.on("join",(options,callback)=>{
        const {error,user}=addUser({id:socket.id,...options})

        if(error){
            callback(error)
        }
        socket.join(user.room)
        socket.emit("message",generateMessage("welcome"))
        socket.broadcast.to(user.room).emit("message",generateMessage(`${user.username} has joined!`))
        
        callback()
    })

    socket.on("disconnect",()=>{
        const user=removeUser(socket.id)

        if(user){
            io.to(user.room).emit("message",generateMessage(`${user.username} has left!`))
        }
        
    })
})
/*
io.on('connection',(socket)=>{
    console.log("New WebSocket connection");
    socket.emit("CountUpdated",count)

    socket.on("increment",()=>{
        count++;
        //socket.emit("CountUpdated",count)
        io.emit("CountUpdated",count)
    })
})*/

const port=process.env.port || 3000
server.listen(3000,()=>{
    console.log("Server is up in port "+port);
})