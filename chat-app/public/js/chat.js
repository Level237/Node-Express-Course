const socket=io()

socket.on("message",(message)=>{
    console.log("hi "+message);
})
document.getElementById('send').addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=e.target.elements.message.value;
    console.log("hi "+message);
    socket.emit("message",message)
   
})

document.querySelector('#send-location').addEventListener("click",()=>{
   
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const positionObject={lat:position.coords.latitude,lon:position.coords.longitude}
        socket.emit("sendlocation",positionObject)
        console.log(position.coords.latitude);
    })
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