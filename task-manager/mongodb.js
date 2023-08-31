const { MongoClient,ObjectId } = require('mongodb')

// Create Instance of MongoClient for mongodb
const client = new MongoClient('mongodb://localhost:27017')
const databaseName="task-manager"

const id=new ObjectId()
console.log(id);
console.log(id.getTimestamp());
// Connect to database
client.connect()
    .then(() => {
        console.log('Connected Successfully!')
        const db=client.db(databaseName)

        //db.collection("users").insertOne({
            //name:"martin lunel",
            //age:25
        //}).then((result)=>{
            //console.log(result);
        //}).catch((err)=>{
            //console.log("unable insert user");
       // })

       //db.collection('users').insertMany([{
        //name:"level",
        //age:25
       //},{
        //name:"michel",
        //age:12
       //}])

       //db.collection('tasks').insertMany([{
        //description:"Welcome my children how are you",
        //completed:true
       //},{
        //description:"many insert",
        //completed:false
       //}]).then((result)=>{
        //console.log(result.acknowledged);
       //})


    })
    .catch(error => console.log('Failed to connect!', error))