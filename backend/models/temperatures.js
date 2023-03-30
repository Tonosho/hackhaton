const mongoose = require('mongoose');

const temperatureSchema = mongoose.Schema({
    Type: String,
    Date: String,
    Value: Number,
})

const temperatureModel = mongoose.model('tempadd', temperatureSchema);

module.exports = temperatureModel;

