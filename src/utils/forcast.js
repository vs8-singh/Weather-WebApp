const request = require('request')

const weather = (location, callback) => {
    const url = 'https://api.darksky.net/forecast/bba52e9e06cb1991a8539596bbe96e0e/'+encodeURIComponent(location.center[1])+','+encodeURIComponent(location.center[0])+'?units=si'
    request({url, json:true},(error, response)=>{
        if(error){
            callback('Something went wrong :(',undefined)
        }else if(response.body.error){
            callback('No such location, please enter valid location.',undefined)
        }else{
            callback(undefined,response.body)
        }
    })
}
module.exports = weather