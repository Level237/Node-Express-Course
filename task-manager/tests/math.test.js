const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add}=require('../src/math')

test('Should calculate total with tip',()=>{

    const total=calculateTip(10,.3)

   expect(total).toBe(13)
})

test('Should convert 32 F to 0 C',()=>{
    const convertCelsius=fahrenheitToCelsius(32)
    expect(convertCelsius).toBe(0)
})

test('Should convert 32 F to 0 C',()=>{
    const convertFahrenheit=celsiusToFahrenheit(0)
    expect(convertFahrenheit).toBe(32)
})

//test('Async test demo',(done)=>{
    //setTimeout(() => {
        //expect(1).toBe(2)
        //done()
    //}, 2000);
//})

test('Should add two numbers',(done)=>{
   add(2,3).then((sum)=>{
    expect(sum).toBe(5)
    done()
   })
})

test('Should add two numbers async/await',async()=>{
    const sum=await add(2,3)
    expect(sum).toBe(5)
 })