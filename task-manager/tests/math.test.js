const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit}=require('../src/math')

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