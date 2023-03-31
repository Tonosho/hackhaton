const express = require('express');
const moment = require('moment');
const router = express.Router();

const temperatureModel = require('../models/temperature')

// BACKEND FRONTEND CONNECTION TEST
router.get('/test', async (req, res) => {
  let test = "test"
  res.json({ test });
});

// LOGIN CHECK
router.post('/login', async (req, res) => {
  let userPassword = req.body.password;
  if (userPassword === "test") {
    res.json({ validation: 'success' })
  }
  else {
    res.json({ validation: 'error' });
  }
})

// GET CLOSEST TEMPERATURES FOR DASHBOARD
router.get('/closestTemperatures', async (req, res) => {
  const allTemperatures = await temperatureModel.find()
  const now = moment();

  const roomTemperatures = allTemperatures.filter(temp => temp.Type === "roomTemp")

  const closestRoomTemp = roomTemperatures.reduce((a, b) => {
    const accumDate = moment(a.Date);
    const currentDate = moment(b.Date);
    if (currentDate > now) {
      return a; // Ignore values from future
    }
    return accumDate.diff(now) > currentDate.diff(now) ? a : b;
  });

  const outsideTemperatures = allTemperatures.filter(temp => temp.Type === "outsideTemp")

  const closestOutsideTemp = outsideTemperatures.reduce((a, b) => {
    const accumDate = moment(a.Date);
    const currentDate = moment(b.Date);
    if (currentDate > now) {
      return a; // Ignore dates from future
    }
    return accumDate.diff(now) > currentDate.diff(now) ? a : b;
  });

  res.json({ room: closestRoomTemp, outside: closestOutsideTemp })
})

// BRING ALL TEMPERATURES BY TYPE
router.get('/allTemperatures', async (req, res) => {

  const roomTemperatures = await temperatureModel.find({ Type: "roomTemp" })
  const outsideTemperatures = await temperatureModel.find({ Type: "outsideTemp" })

  res.json({ room: roomTemperatures, outside: outsideTemperatures })
})

module.exports = router;
