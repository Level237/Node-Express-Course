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

 test('Should not create task with invalid description/completed', async() => { 
    const response=await request(app)
                .post('/tasks')
                .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                .send({
                    descriptio:"From my test"
                }).expect(400)
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

 test('Should get fail because UserTwo is not authorize to delete TaskOne',async()=>{
    const response=await request(app)
    .delete("/task/"+taskOne._id)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task=Task.findById(response.body._id)
    expect(task).not.toBeNull()
 })

 test('Should not update task with invalid description/completed', async () => {
    const response=await request(app)
        .patch('/task/'+taskOne._id)
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            descriptio:"le"
        }).expect(400)
 })

 test("Should delete user task",async()=>{
    const response=await request(app)
    .delete("/users/me")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    //const tasks=Task.find({response.body.})
 })


 //
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks