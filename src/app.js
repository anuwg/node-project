const path = require('path')
//const request = require('request')

const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app= express()
const port = process.env.PORT|| 3000
//defines paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to use
app.use(express.static(publicDirectory))

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index',{
        title:'weatherApp',
        name: 'anu'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'aboutMe',
        name :'bill'
    })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        name:'Help message',
        title:'helpTitle',
        description: 'To get help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
           error: 'Please provide your address'
       })
    }
    
geocode(req.query.address,(error, {latitude, longitude,location}={})=>{
 if(error){
     return res.send({
         error
     })
 }
 forecast(latitude, longitude, (error, forecastData)=>{
     if(error){
        return res.send({error})
     }
     res.send({
         
         forecast:forecastData,
         location,
         address: req.query.address
     })
 })

})
    
})


app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({products:[]})
    req.query

})
app.get('/help/*', (req, res)=>{
    res.render('error',{title: '404 error',name: 'help article not found' ,
})
  })

app.get('*', (req, res)=>{
  res.render('error',{ title:'404 error',
      name:'Page not found'
  })
})
//app.com
//app.com/help
//app.com/about
//app.com/weather
app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})