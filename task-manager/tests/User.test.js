const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/User')

const userOne={

    name:"martin",
    email:"bramslevel129@gmail.com",
    password:"levelvertos"
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