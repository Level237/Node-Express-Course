const users=[]

// Adduser,removeUser,getUser,getuserRoom
const addUser=({id,username,room})=>{

    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()

    // validate the data
    if(!username || !room){
        return {
            error:"Username and room are required"
        }
    }

    // Check for existing user
    const existingUser=users.find((user)=>{
        return user.room===room && user.username===username
        
    })

    //Validate username
  
    if(existingUser){
        return{
            error:'Username is in use'
        }
        
    }

    // store user
    const user={id,username,room}
    users.push(user)

    return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.index===id
    })

    if(index !==-1){
        return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    const user=users.find((user)=>user.id===id)

    if(user){
        return user
    }
}

const getuserRoom=(room)=>{
    room=room.trim().toLowercase()
    return users.filter((user)=>user.room===room)
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getuserRoom
}