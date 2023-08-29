console.log('client side javascript file is loaded');



const weather=document.querySelector('form')
const search=document.querySelector('input')


weather.addEventListener('submit',(e)=>{
    const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
messageOne.textContent="loading..."
messageTwo.textContent=''
    e.preventDefault()
    const location=search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        
        
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
        console.log(data);
    }).catch((err)=>{
        messageOne.textContent=err;
    })
})
})


