const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api').then(()=>{
    
    console.log("DB connection successfull!")
})

const User=mongoose.model('User',{
    name:{
        type:String
    },
    age:{
        type:Number
    }
});

const me=new User({
    name:"Martin",
    age:27
})

me.save().then(()=>{
    console.log(me);
}).catch((err)=>{
    console.log("Error!",err);
})