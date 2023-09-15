const socket=io()

// elements

const $messageForm=document.getElementById('send')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector("button")
const locationButton=document.getElementById("send-location")
const $messages=document.querySelector("#messages")

//Templates
const messageTemplate=document.querySelector("#message-template").innerHTML
const locationMessageTemplate=document.querySelector("#location-message-template").innerHTML

//Options
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})
socket.on("message",(message)=>{
    console.log(message);
    const html=Mustache.render(messageTemplate,{
        message:message.text,
        createdAt:moment(message.createdAt).format("h:mm a")
    })
    $messages.insertAdjacentHTML("beforeend",html)
})

socket.on("locationMessage",(position)=>{
    console.log(position);

    const html=Mustache.render(locationMessageTemplate,{
        message:position.url,
        createdAt:moment(position.createdAt).format("h:mm a")

    })

    $messages.insertAdjacentHTML("beforeend",html)
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

socket.emit("join",{username,room},(error)=>{
    if(error){
        alert(error)
        location.href="/"
    }
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