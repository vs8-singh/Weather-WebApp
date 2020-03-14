const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnMtc2luZ2giLCJhIjoiY2s3b2kza2t6MDZzYzNscHByZGM4dmYzeSJ9.DwcUh9YuP675_7PYo_Xmxg&limit=1'
    request({url, json: true}, (error, response) =>{
        if(error){
            callback('Something went wrong :(',undefined)
        }else if(response.body.features.length == 0){
            callback('No such location, please enter valid location.',undefined)
        }else{
            callback(undefined,response.body.features[0])
        }
    })
}

module.exports = geocode