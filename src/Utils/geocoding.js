const request = require("request")
const geocoding = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + decodeURI(address) +".json?access_token=pk.eyJ1IjoiaHVzc2Vpbm1vaG1hZWQiLCJhIjoiY2tscDEyeWloMHhjcTJ3bXN1Y3UxOHRzOSJ9.mJzf2hTwlkcvt4m0yvwzhA"
    request({url:url , json:true},(error, response)=>{
        if(error){
            callback("can't able to accsess to server , Check your network and try again",undefined)
        }else if(response.body.features.length === 0){
            callback("can't find your conutry , Chek country name!",undefined)
        }else{
            callback(undefined,{
                location : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            })
        }
    })
}
module.exports = geocoding
