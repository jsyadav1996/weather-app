const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Jagdish'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jagdish'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jagdish',
        helpText: 'This is help text'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a address!!'
        });
    }
    let address = req.query.address;
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: address,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jagdish',
        errorMessage: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jagdish',
        errorMessage: 'Page not found',
    });
});

app.listen(port, (req, res) => {
    console.log('Server is up on port ' + port);
});