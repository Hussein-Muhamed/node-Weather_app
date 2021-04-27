const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocoding = require('./utils/Geocoding')
const forecast = require("./utils/forecast")

const port = process.env.PORT || 3000
const app = express()
//Define Paths for Express Config
const publicPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../views/views')
const partials = path.join(__dirname, '../views/partials')

//Setup handlebars engine and views location (to render templet)
app.set('views', viewpath)
app.set('view engine', 'hbs')
hbs.registerPartials(partials)
//Setup staitc directory to server
app.use(express.static(publicPath))

app.get('', (req, res)=>{
    res.render('index', {
        title:'weather',
        name:'Hussein'
    })
})
app.get('/weather', (req,res)=>{
        if(!req.query.address){
            return res.send({
                error:"you must provide a address term" 
            })
        }
        geocoding(req.query.address, (error, data)=>{
            if(error)
                return res.send({error})
            forecast(data.latitude, data.longitude, (error, forecastdata)=>{
                if(error)
                    return res.send({error})
                res.send({
                    weather:forecastdata,
                    address:req.query.address,
                    latitudes:data.latitude,
                    longitudes:data.longitude
                })
            })
        })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"ABOUT",
        name:"Hussein"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"HELP",
        name:"Hussein",
        helpmessage:"This page to help you"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"hussein",
        errormessage:"help arctical not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Hussein",
        errormessage:"page not found"
    })
})
app.listen (port,()=>{
    console.log("Server is up on port 3000.")
})
