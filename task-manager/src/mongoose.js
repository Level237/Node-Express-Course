const mongoose=require('mongoose');
const validator=require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api').then(()=>{
    
    console.log("DB connection successfull!")
})

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')) throw new Error("your password don't contains password value")
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid') 
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    }
});

const me=new User({
   name:"Balep martin",
  email:"BRAMSLEVEL@GMAIL.COM",
  password:"hash129"
})

me.save().then(()=>{
    console.log(me);
}).catch((err)=>{
    console.log("Error!",err.message);
})

const Task=mongoose.model('Task',{
    description:{
        type:String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})



const task=new Task({
    description:"Best Seller of the moment",
    completed:false
})

//task.save().then(()=>{
    //console.log(task);
//}).catch((err)=>{
    //console.log("Error",err);
//})