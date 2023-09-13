const socket=io()

// elements

const $messageForm=document.getElementById('send')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector("button")
const locationButton=document.getElementById("send-location")
socket.on("message",(message)=>{
    console.log(message);
})
$messageForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute("disabled","disabled")
    const message=e.target.elements.message.value;
    console.log(message);
    socket.emit("message",message,(error)=>{
        $messageFormButton.removeAttribute("disabled")
        $messageFormInput.value=""
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log("the message was delivered");
    })
   
})

locationButton.addEventListener("click",()=>{
   
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser")
    }
    locationButton.setAttribute('disabled',"disabled")

    navigator.geolocation.getCurrentPosition((position)=>{
        const positionObject={lat:position.coords.latitude,lon:position.coords.longitude}
        socket.emit("sendlocation",positionObject,()=>{
            console.log("location shared");
            locationButton.removeAttribute('disabled')
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