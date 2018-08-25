const express = require('express')
const bodyParser = require('body-parser')

const request = require('request')

const apiKey = 'cc9c2228269e9bd2e8c5aa1987e68af7'

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {
                    weather: weatherText,
                    error: null
                });
            }
        }
    });
})

app.listen(3001, function(){
    console.log("The server is running on port 3001")
})

