const request = require('request');

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiamFnZGlzaHdvcms5NiIsImEiOiJjazFwYzlsa2kwb2EyM2xwZHRremYzaGJjIn0.KkUK7iQoY91_y0gNreyQOQ&limit=1';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to server!!', undefined);
        }else if (response.body.features.length === 0){
            callback('Unable to find location!!', undefined);
        }else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;