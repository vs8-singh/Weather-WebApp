const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/location')
const weather = require('./utils/forcast')
const app = express()

//setting up path for public directory
const publicDirPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirPath))  
hbs.registerPartials(partialspath)

app.set('view engine','hbs')
app.set('views',viewspath)
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
    name:'Vaibhav Singh'})
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Page',
    name:'Vaibhav Singh'})
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help Page',
    name:'Vaibhav Singh'})
})
app.get('/help/*',(req,res)=>{
    res.render('error',{errorMessage:'Help article not found :('})
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send('Please specify the address!')
    }
    geocode(req.query.address, (error, data1) =>{
        if(error){
            res.send({error:error})
        }else{
            const jagah = data1.place_name
            weather(data1, (error, condition) => {
                if(error){
                    return res.send({error:error})
                }
                res.send({
                    place: jagah,
                    summary: condition.daily.data[0].summary,
                    temperature: condition.currently.temperature,
                    rainProb: condition.currently.precipProbability
                })
            })
        }
    })
})
app.get('*',(req,res)=>{
    res.render('error',{title: 'Error',
        errorMessage:'Page not found :('})
})
app.listen(3000, ()=>{
    console.log('Connected!')
})