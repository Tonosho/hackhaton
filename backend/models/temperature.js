const mongoose = require('mongoose');

const temperatureSchema = mongoose.Schema({
    Type: String,
    Date: String,
    Temp: Number,
})

const temperatureModel = mongoose.model('temperatures', temperatureSchema);

module.exports = temperatureModel;

