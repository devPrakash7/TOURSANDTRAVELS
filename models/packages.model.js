
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({

    day: {
        type: String,
    },
    night: {
        type: String
    },
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
    }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
