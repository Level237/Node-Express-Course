const request=require('supertest')
const app=require('../src/app')

test('Should signup a new User',async()=>{
    await request(app).post('/users').send({
        name:"andrew",
        email:"andrew@gmail.com",
        password:"levelvertos"
    }).expect(201)
})