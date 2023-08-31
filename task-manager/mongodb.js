const { MongoClient } = require('mongodb')

// Create Instance of MongoClient for mongodb
const client = new MongoClient('mongodb://localhost:27017')
const databaseName="task-manager"
// Connect to database
client.connect()
    .then(() => {
        console.log('Connected Successfully!')
        const db=client.db(databaseName)

        db.collection("users").insertOne({
            name:"martin lunel",
            age:25
        })
    })
    .catch(error => console.log('Failed to connect!', error))