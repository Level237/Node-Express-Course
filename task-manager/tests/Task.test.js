const request=require('supertest')
const app=require('../src/app')
const Task=require('../src/models/Task')
const {userOneId,userOne,setupDatabase, userTwoId,userTwo,  taskOne,taskTwo,taskThree,}=require('./fixtures/db')


beforeEach(setupDatabase)

test('should create task for user', async() => { 
    const response=await request(app)
                .post('/tasks')
                .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                .send({
                    description:"From my test"
                }).expect(201)

                const task=await Task.findById(response.body._id)
                expect(task).not.toBeNull()
 })

 test('should get all task for UserOne',async()=>{

    const response=await request(app)
    .get("/tasks")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
 })

 test('Should get fail because UserTwo is not authorize to delete TaskOne',async()=>{
    const response=await request(app)
    .delete("/task/"+taskOne._id)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task=Task.findById(response.body._id)
    expect(task).not.toBeNull()
 })