require('dotenv').config()
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html')

})
app.post('/',function(req,res){

  console.log(req.body.city)

  var city = req.body.city
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + process.env.ID
  https.get(url,function(response){


    response.on('data',function(data){
      const weatherData = JSON.parse(data)

      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon =weatherData.weather[0].icon

      res.write('the temp in '+city+' is = ' + temp + ' degree celcius')
      res.write('\n' + icon)
      res.send()
    })
  })
})



app.listen(3000,function(){
  console.log('panda server')
})
