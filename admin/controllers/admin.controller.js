
const { sendResponse } = require('../../services/common.service')
const constants = require('../../config/constants');
const User = require('../../models/user.model');





exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email: email, deleted_at: null });

        if (!user) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.invalid_username_password', {}, req.headers.lang);
        }
        if (!user.validPassword(password)) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.invalid_username_password', {}, req.headers.lang);
        }
        if (user.user_type !== constants.USER_TYPE.ADMIN) {
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);
        }

        await user.generateAuthToken();
        await user.generateRefreshToken();

       return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ADMIN.login_success', user, req.headers.lang);

    } catch (err) {
        console.log("err(admin_login)", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.logout = async (req, res) => {

    try {
     
        const reqBody = req.user
        let users = await User.findById(reqBody._id)
        users.tokens = null;
        users.refresh_tokens = null;
        await users.save()
        return  sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'ADMIN.logout_success', {} , req.headers.lang);

    } catch (err) {
        console.log("err(admin_logout)", err)
       return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
