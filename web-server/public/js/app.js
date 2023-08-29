console.log('client side javascript file is loaded');

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

fetch(`http://us1.locationiq.com//v1/search?key=pk.5662601f43f70d5ab4a2af452f4348bd&q=!&format=json`).then((response)=>{
    response.json().then((data)=>{
        if(data.err){
            console.log("unable");
        }
        console.log(data[0]);
    }).catch((err)=>{
        console.log(err);
    })
}).catch((error)=>{
    console.log(error);
})