
const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const Contact = require('../../models/contact.model')
const constants = require('../../config/constants')
const { checkAdmin } = require('../services/user.service')
const User = require('../../models/user.model')
const { sendMail } = require('../../services/email.service')
const { isValid } = require('../../services/blackListMail')





exports.addNewContact = async (req, res) => {

    try {

        const reqBody = req.body;
        const checkMail = await isValid(reqBody.email);

        if (!checkMail) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.blackList_mail', {}, req.headers.lang);
        }

        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

       let text =  `Dear ${reqBody.firstName},

        Thank you for reaching out to Tours and Travels!
        
        We have received your inquiry and will get back to you as soon as possible.
        
        Here are the details you provided:
        - FIRST NAME :  ${reqBody.firstName}
        - LAST NAME : ${reqBody.lastName},
        - EMAIL : ${reqBody.email}
        - MOBILE NUMBER : ${reqBody.mobile_number},
        - DESCRIPTION : ${reqBody.descripation}
        
        We appreciate your interest in our services and look forward to assisting you with your travel plans.
        
        Best regards,
        Tours and Travels Team`

        await sendMail(text);
        const contacts = await Contact.create(reqBody);
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'CONTACT.add_contact', contacts, req.headers.lang);

    } catch (err) {
        console.log("err(addNewContact)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}



exports.getAllContact = async (req, res) => {

    try {

        const { page = 1, limit = 10, offset = 0 } = req.query;
        const userId = req.user._id;

        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        // Calculate skip for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);

        const contacts = await Contact.find().sort()
            .skip(skip)
            .limit(parseInt(limit));

        if (!contacts || contacts.length == 0)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "CONTACT.not_found", {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'CONTACT.get_all_contact', contacts, req.headers.lang);

    } catch (err) {
        console.log("err(getAllPackages)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.DeleteContact = async (req, res) => {

    try {

        const { contactId } = req.params
        const userId = req.user._id;
        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        const contacts = await Contact.findOneAndDelete({ _id: contactId })

        if (!contacts)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "CONTACT.not_found", {}, req.headers.lang);

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, "CONTACT.delete_contact_form", contacts, req.headers.lang);

    } catch (err) {
        console.log("err(DeleteContact)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
} 