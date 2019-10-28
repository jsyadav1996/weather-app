const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4efa393128a6c0bd36ffe53e10dffcea/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude);
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to server!!', undefined);
        }else if (response.body.error){
            callback('Unable to find location!!', undefined);
        }else{
            const {temperature, precipProbability} = response.body.currently;
            callback(undefined, 'It is currently '+temperature+' degree out. There is a '+precipProbability+' chance of rain.');
            // callback(undefined, {temperature: temperature, precipProbability: precipProbability});
        }
    });
};

module.exports = forecast;