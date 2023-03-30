var express = require('express');
var router = express.Router();


const temperatureModel = require('../models/temperatures')

router.get('/test', async (req, res) => {

  let test = "test !!"

  let temps = await temperatureModel.findOne({ deciDegreCelius: 225 })
  console.log(temps)

  // db.collection('temperatures2')
  //   .find()
  //   .forEach(el => newArray.push(el))
  //   .then(() => res.json(newArray))

  res.json({ test });
});

router.post('/addTemp', async (req, res) => {

  let newTemp = await new temperatureModel({
    Type: req.body.Type,
    Date: req.body.Date,
    Value: req.body.Number,
  })

  let tempSaved = await newTemp.save();

  res.json({ tempSaved });
})

module.exports = router;
