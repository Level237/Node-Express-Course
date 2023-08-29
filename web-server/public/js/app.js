console.log('client side javascript file is loaded');



const weather=document.querySelector('form')
const search=document.querySelector('input')
weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        
        console.log(data);
        console.log(data.location);
        console.log(data.forecast);
    }).catch((err)=>{
        console.log(err);
    })
})
})


