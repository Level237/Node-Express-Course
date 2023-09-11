const socket=io()

document.getElementById('send').addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=e.target.elements.message.value;
    console.log(message);
    socket.emit("message",message)
})

/*
socket.on('message',(name)=>{
    
    const message=`welcome ${name}`
    document.querySelector("#message")=message
    
    console.log(message);
})
socket.on('CountUpdated',(count)=>{
    console.log("The Count has been updated",count);
})

document.querySelector("#increment").addEventListener('click',()=>{
    console.log("clicked");

    socket.emit("increment")
})*/