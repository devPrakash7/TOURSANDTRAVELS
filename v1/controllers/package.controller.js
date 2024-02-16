const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const Package = require('../../models/packages.model')
const constants = require('../../config/constants')
const { checkAdmin } = require('../services/user.service')



exports.addpackages = async (req, res) => {

    try {

        const reqBody = req.body
        const userId = req.user._id;

        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        reqBody.created_at = await dateFormat.set_current_timestamp();
        reqBody.updated_at = await dateFormat.set_current_timestamp();

        const package = new Package(reqBody);
        await package.save();

        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'PACKAGES.add_package', package, req.headers.lang);

    } catch (err) {

        console.log("err(addpackages)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.getAllPackages = async (req, res) => {

    try {

        const { page = 1, limit = 10, offset = 0 } = req.query;

        // Calculate skip for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit) + parseInt(offset);

        const packages = await Package.find()
            .sort()
            .skip(skip)
            .limit(parseInt(limit));

        if (!packages || packages.length == 0)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "PACKAGES.not_found", {}, req.headers.lang);


        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'PACKAGES.get_all_packages', packages, req.headers.lang);

    } catch (err) {
        console.log("err(getAllPackages)...", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}



exports.deletePackages = async (req, res) => {

    try {

        const userId = req.user._id;
        const packageId = req.params.packageId
        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        const packages = await Package.findOneAndDelete({ _id: packageId })

        if (!packages)
            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, "PACKAGES.not_found", {}, req.headers.lang);


        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'PACKAGES.delete_package', packages, req.headers.lang);

    } catch (err) {
        console.log("err(deletePackages)...", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
