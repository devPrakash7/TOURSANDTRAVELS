
const express = require('express');
const { getAllBookings, DeletedBooking, addBooking , getBookings, UpdateBooking } = require('../controllers/booking.controller');
const router = express.Router();
const { verifyAccessToken } = require('../../middleware/admin.autenticate')
const authenticate = require('../../middleware/authenticate')



router.post('/addBooking' , authenticate , addBooking)
router.get('/getAllBookings' , getAllBookings);
router.get('/getBookings' , authenticate , getBookings);
router.put('/updateBookingStatus/:bookingId' , verifyAccessToken , UpdateBooking)
router.delete('/deleteBooking/:bookingId' , verifyAccessToken , DeletedBooking);



module.exports = router;