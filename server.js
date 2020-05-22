const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/api/hello', (req, res) => {
    res.send({
        express: 'Hello From Express'
    });
});

app.post('/api/world', (req, res) => {
    let type="restaurant"
    let apiKey = process.env.GOOGLE_PLACES_API_KEY;
    let latitude = 51.485695400000004;
    let longitude = -0.20989819999999998;
    let radius = 1500;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
    
    axios.get(url)
    .then((response) => {
        res.send(response.data.results);
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));