const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/User')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose')

const userOneId=new mongoose.Types.ObjectId
const userOne={
    _id:userOneId,
    name:"martin",
    email:"bramslevel129@gmail.com",
    password:"levelvertos",
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async()=>{
    await User.deleteMany();
    await new User(userOne).save()
})


test('Should signup a new User',async()=>{
    await request(app).post('/users').send({
        name:"andrew",
        email:"andrew@gmail.com",
        password:"levelvertos"
    }).expect(201)
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
})

test('Should not delete for unauthenticated user',async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})