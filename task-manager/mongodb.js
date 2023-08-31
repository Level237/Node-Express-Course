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

        //db.collection('users')
        //.findOne({name:"leve"})
        //.then((result)=>{
           // console.log(result);
        //})

        db.collection('tasks').deleteOne(
            {
                description:"Welcome my children how are you"
            }
        ).then((result)=>{
            console.log(result);
        }).catch((err)=>{
            console.log(err);
        })


    })
    .catch(error => console.log('Failed to connect!', error))