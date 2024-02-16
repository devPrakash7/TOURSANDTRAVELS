const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dateFormat = require('../../helper/dateformat.helper');
const SmartIntern = require('../../models/smartInternmodal'); // Adjust the path accordingly
const constants = require('../../config/constants');
const { sendResponse } = require('../../services/common.service');
const { isValid } = require('../../services/blackListMail')
const { JWT_SECRET } = require('../../keys/development.keys');




exports.register = async (req, res, next) => {

    try {

        const reqBody = req.body;
        const checkMail = await isValid(reqBody.email);

        if (!checkMail) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.blackList_mail', {}, req.headers.lang);
        }

        const existingMobileNumber = await SmartIntern.findOne({ email: reqBody.email });

        if (existingMobileNumber) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.existing_mobile_number', {}, req.headers.lang);
        }

        // Hash the password
        reqBody.password = await bcrypt.hash(reqBody.password, 10);

        // Set timestamps
        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

        // Generate temporary token
        reqBody.tempTokens = await jwt.sign({
            data: reqBody.email
        }, JWT_SECRET, {
            expiresIn: constants.URL_EXPIRE_TIME
        });

        // Create a new SmartIntern user
        const user = await SmartIntern.create(reqBody);
        let resData = user;
        resData.__v = undefined;
        resData.password=undefined

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'USER.register_success', user, req.headers.lang);

    } catch (err) {
        console.error("Error during registration:", err);
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang);
    }
};
