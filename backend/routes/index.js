var express = require('express');
var router = express.Router();

const temperatureModel = require('../models/temperature')

// BACKEND FRONTEND CONNECTION TEST
router.get('/test', async (req, res) => {
  let test = "test"
  res.json({ test });
});

// MONGOOSE POST TEST
router.post('/addTemp', async (req, res) => {
  let newTemp = await new temperatureModel({
    Type: req.body.Type,
    Date: req.body.Date,
    Temp: req.body.Temp,
  })
  let tempSaved = await newTemp.save();
  res.json({ tempSaved });
})


// GET CLOSEST TEMPERATURES FOR DASHBOARD
router.get('/closestTemperatures', async (req, res) => {
  let temperatures = await temperatureModel.find()

  const now = moment();
  const closest = temperatures.reduce((a, b) => {
    const adiff = a.Date - today;
    return adiff > 0 && adiff < b.Date - today ? a : b;
  });

  res.json({ closestTemperatures })
})




router.get('/allTemperatures', async (req, res) => {
  let allTemperatures = await temperatureModel.find()
  res.json({ allTemperatures })
})

module.exports = router;
