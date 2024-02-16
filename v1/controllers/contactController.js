const dateFormat = require('../../helper/dateformat.helper');
const Contact = require('../../models/contactmodel');
const constants = require('../../config/constants');
const { sendResponse } = require('../../services/common.service');
const { isValid } = require('../../services/blackListMail');
const { sendMail } = require('../services/emailservice');



exports.contact = async (req, res, next) => {

    try {

        const reqBody = req.body;
        const checkMail = await isValid(reqBody.email);

        if (!checkMail) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.blackList_mail', {}, req.headers.lang);
        }

        // Set timestamps
        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

        // Create a new Contact record in the database
        const user = await Contact.create(reqBody);

        let text = `Dear ${reqBody.full_name},

        Thank you for reaching out to Tours and Travels, a service provided by Livoso Technologies!
        
        We have received your inquiry and will get back to you as soon as possible.
        
        Here are the details you provided:
        - NAME: ${user.full_name}
        - EMAIL: ${user.email}
        - LOCATION: ${user.location}
        - ENQUIRY: ${user.enquery}
        - PHONE NUMBER: ${user.phoneNumber}
        - MESSAGE : ${user.message}

        We appreciate your interest in our services and look forward to assisting you with your travel plans.
        
        Best regards,
        Tours and Travels Team
        Livoso Technologies`

        await sendMail(text);

        // Respond with success message
        let resData = user;
        resData.__v = undefined;
        resData.password = undefined;

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'USER.contact', resData, req.headers.lang);

    } catch (err) {
        console.log("err(Contact)", err);
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
};