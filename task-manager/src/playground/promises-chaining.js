require('../db/mongoose')
const User=require('../models/User')

// 64f0c94d9d0f684ff9661ff

    User.findByIdAndUpdate('64f1a0d53e64fc3bcc69691b',{
        age:3
    }).then((user)=>{
        console.log(user);
        return User.countDocuments({age:3})
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })

