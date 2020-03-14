// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

const empty = () =>{
    messageOne.textContent = ''
    messageTwo.textContent = ''
}

empty()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const myLoc = search.value
    if(myLoc == ""){
        empty()
        messageOne.textContent = messageOne.textContent + 'Please enter some location '
//        console.log('Enter some location moron! ')
    }else{
        fetch('http://localhost:3000/weather?address='+myLoc).then((response) =>{
            response.json().then((data) =>{
                if(data.error){
                    empty()
                    messageOne.textContent = messageOne.textContent + data.error
                }else{
                    empty()
                    messageOne.textContent = messageOne.textContent + 'Weather information of '+data.place
                    messageTwo.textContent = messageTwo.textContent + data.summary
                    messageTwo.textContent = messageTwo.textContent + 'The temperature here is '+data.temperature+' degree C,'
                    messageTwo.textContent = messageTwo.textContent + 'The probabitily of rain is '+data.rainProb+'%'
                    console.log(data.place)
                    console.log(data.summary)
                    console.log(data.temperature)
                    console.log(data.rainProb)
                }
            })
        })
    }
})