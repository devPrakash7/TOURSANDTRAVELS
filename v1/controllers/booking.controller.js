
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const booking = require('../../models/booking.model')
const constants = require('../../config/constants')
const { checkAdmin } = require('../services/user.service')
const User = require('../../models/user.model')




exports.addBooking = async (req, res) => {

    try {

        const reqBody = req.body
        const userId = req.user._id;

        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

        let objects = {
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            mobile_number: reqBody.mobile_number,
            address: reqBody.address,
            city: reqBody.city,
            country: reqBody.country,
            zipCode: reqBody.zipCode,
            userId: userId,
            packageDetails: {
                package: reqBody.package,
                date: reqBody.date,
                person: reqBody.person,
                children: reqBody.children
            },
        }

        const bookings = new booking(objects)
        await bookings.save();

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'BOOKING.add_booking', bookings, req.headers.lang);

    } catch (err) {

        console.log("err(addBooking)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.getAllBookings = async (req, res) => {

    try {

        const { page = 1, limit = 10, offset = 0 } = req.query;

        // Calculate skip for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);

        const bookings = await booking.find().populate('userId').sort()
            .skip(skip)
            .limit(parseInt(limit));

        if (!bookings || bookings.length == 0)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "BOOKING.not_found", {}, req.headers.lang);

        const countBookings = await booking.countDocuments();

        let data = {
            countBookings,
            bookings
        }

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'BOOKING.getAllBookings', data, req.headers.lang);

    } catch (err) {
        console.log("err(getAllBookings)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}

exports.getBookings = async (req, res) => {

    try {

        const userId = req.user._id;
        const { page = 1, limit = 10, offset = 0 } = req.query;

        // Calculate skip for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);

        const bookings = await booking.find({ userId: userId }).populate('userId')
            .sort()
            .skip(skip)
            .limit(parseInt(limit));

        if (!bookings || bookings.length == 0)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "BOOKING.not_found", {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'BOOKING.getAllBookings', bookings, req.headers.lang);

    } catch (err) {
        console.log("err(getAllBookings)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.UpdateBooking = async (req, res) => {

    try {

        const { bookingId } = req.params
        const userId = req.user._id;
        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        const bookings = await booking.findOneAndUpdate({ _id: bookingId }, { $set: { booking_status: constants.BOOKING_STATUS.STATUS_confirm } }, { new: true })

        if (!bookings)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "BOOKING.not_found", {}, req.headers.lang);

        bookings.updated_at = dateFormat.set_current_timestamp();

        await bookings.save();

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, "BOOKING.booking_status_updated", bookings, req.headers.lang);

    } catch (err) {
        console.log("err(UpdateBooking)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

}


exports.DeletedBooking = async (req, res) => {

    try {

        const { bookingId } = req.params

        const userId = req.user._id;
        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        const packages = await booking.findOneAndDelete({ _id: bookingId })

        if (!packages)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "BOOKING.not_found", {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, "BOOKING.booking_delete", packages, req.headers.lang);

    } catch (err) {

        console.log("err(DeletedBooking)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }

} 