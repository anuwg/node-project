
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7f8175e2ec949418ad4f87bf50760cdb/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.' + 'The temperature high is ' + body.daily.data[0].temperatureMax + ' and temperature low is ' + body.daily.data[0].temperatureMin)
        }
    })
}

module.exports = forecast






