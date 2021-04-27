const request = require('request')
const getweather = (address,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7391baa02b266d9df09799bcd8ecc2b7&query="+ decodeURI(address)
    request({url:url , json:true},(error , response) =>{
        if(error)
        callback("unable to sccsses network",undefined)
        else if (response.body.error)
        callback("cant find your location, chek your address", undefined)
        else
        callback(undefined,'Weather is:'+response.body.current.weather_descriptions[0] + '.\nIts the currently '+ response.body.current.temperature +' Degree its feel like '+ response.body.current.feelslike +' Degree')
    })
}
module.exports= getweather