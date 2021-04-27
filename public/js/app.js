// const { response } = require("express")
// console.log("Clint side javasctipt is loaded!")
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{  
        if(data.error)
           messageOne.textContent=data.error
        else
        {
        //    messageTwo.textContent=data.address
            messageOne.textContent=data.weather.split('... ')[0]
            messageTwo.textContent=data.weather.split('... ')[1]
        }
    })
})
})