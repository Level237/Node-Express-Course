const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/User')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose')
const {userOneId,userOne,setupDatabase}=require('./fixtures/db')




beforeEach(setupDatabase)


test('Should signup a new User',async()=>{
    const response=await request(app).post('/users').send({
        name:"andrew",
        email:"andrew@gmail.com",
        password:"levelvertos"
    }).expect(201)

    // Assert that the database was changed correctly
    const user=await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body.user.name).toBe("andrew")
})

test('should login existing user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
})

test('Should not login nonexistant user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:"martinrt"
    }).expect(400)
})

test('Should get profile for user',async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticate user',async()=>{
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})

test('Should delete account for user',async()=>{

    await request(app)
    .delete("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user= await User.findById(userOne)
    expect(user).toBeNull()
})

test('Should not delete for unauthenticated user',async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image',async()=>{
    await request(app)
    .post("/users/me/avatar")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .attach("avatar","tests/fixtures/logo.png")
    .expect(200)

    const user=await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))
    
})

test('Should update valid user fields',async()=>{
   
   await request(app)
    .patch("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:"louis"
    })
    .expect(200)

    const user=await User.findById(userOneId)
    expect(user.name).toEqual("louis")
})

test("Should not update invalid user field",async()=>{
    await request(app)
    .patch("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:"douala"
    })
    .expect(400)
})