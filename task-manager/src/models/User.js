const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const Task=require('../models/Task')
const userSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
email:{
type:String,
required:true,
lowercase:true,
unique:true
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
    /* alternative field unique
    email: {
        type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required']
      },*/
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
userSchema.statics.findByCredentials=async (email,password)=>{
    
    const user=await User.findOne({email})

    if(!user){
        throw new Error('Unable')
    }
    !user ? ()=>{throw new Error('Unable to login')} : ""

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return
    }
    !isMatch ? ()=>{throw new Error('Unable to login')} : ""

    return user;
}

userSchema.virtual('tasks',{
    ref:"Task",
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();

    delete userObject.tokens
    delete userObject.password
    return userObject;
}


userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id},'thisismynewcourse');
    
    user.tokens=user.tokens.concat({token})

    await user.save()
    //console.log(token);
    return token;
}
// Hash the plain text password before saving
userSchema.pre('save',async function (next) {
    const user=this;

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})


//delete user tasks when user is removed
/*
userSchema.pre("findById",async function(next){

    const user=this;
    //const del=await Task.deleteMany({owner:user._id})
    console.log(del);
    console.log(this);
    //console.log(user);
    next();
})*/
const User=mongoose.model('User',userSchema);



module.exports=User;


