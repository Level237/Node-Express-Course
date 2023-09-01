const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api').then(()=>{
    
    console.log("DB connection successfull!")
})




