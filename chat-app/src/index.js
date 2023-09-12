const express=require('express')
const http=require('http')
const path=require('path')
const socketio=require('socket.io')

const app=express()
const server=http.createServer(app)
const io=socketio(server)
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

let name="martin"
io.on('connection',(socket)=>{
    console.log("New WebSocket message");
    socket.emit("message","welcome")
    socket.broadcast.emit("message","new user has joined")
    socket.on("message",(message)=>{
        io.emit("message",message)
    })

    socket.on("disconnect",()=>{
        io.emit("message"," A user has left!")
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