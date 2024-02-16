const mongoose = require('mongoose');
const constants = require('../config/constants')


const bookingSchema = new mongoose.Schema({

    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile_number: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    },
    packageDetails:{
       package:String,
       date:String,
       person:Number,
       children:Number
    },
    booking_status:{
        type:String,
        default:constants.BOOKING_STATUS.STATUS_PENDING
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    },
    deleted_at: {
        type: String,
        default: null,
    },
});



//Output data to JSON
bookingSchema.methods.toJSON = function () {
    const booking = this;
    const bookingObject = booking.toObject();
    return bookingObject;
};


const booking = mongoose.model('bookings' , bookingSchema)
module.exports = booking;