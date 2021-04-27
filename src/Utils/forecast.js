const request = require('request')
const forecast = (longitude, latitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=7391baa02b266d9df09799bcd8ecc2b7&query='+ longitude +','+ latitude +'&units=m'
    request({url:url, json:true}, (error, response) =>{
        if(error)
            callback("Chek your network", undefined)
        else if (response.body.error)
            callback("cant find your location, Chek your lati, long", undefined)
        else
            callback(undefined,
                `Weather: ${response.body.current.weather_descriptions[0]} 
                ... Its the currently ${response.body.current.temperature} 
                Degree its feel like ${response.body.current.feelslike} Degree`)
    })
}
module.exports = forecast