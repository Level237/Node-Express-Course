const doWorkPromise=new Promise((resolve,reject)=>{

    setTimeout(()=>{
        //resolve([7,4,1])
        reject("error")
    },2000)
})

doWorkPromise.then((result)=>{
    console.log("Sucess!",result);
}).catch((err)=>{
    console.log(err);
})
