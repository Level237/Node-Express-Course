const socket=io()

socket.on('CountUpdated',(count)=>{
    console.log("The Count has been updated",count);
})

document.querySelector("#increment").addEventListener('click',()=>{
    console.log("clicked");

    socket.emit("increment")
})