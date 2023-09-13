const socket=io()

socket.on("message",(message)=>{
    console.log(message);
})
document.getElementById('send').addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=e.target.elements.message.value;
    console.log(message);
    socket.emit("message",message,(error)=>{
        if (error) {
            return console.log(error)
        }
        console.log("the message was delivered");
    })
   
})

document.querySelector('#send-location').addEventListener("click",()=>{
   
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const positionObject={lat:position.coords.latitude,lon:position.coords.longitude}
        socket.emit("sendlocation",positionObject,()=>{
            console.log("location shared");
        })
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