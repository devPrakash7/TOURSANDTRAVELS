

const {
    sendResponse
} = require('../../services/common.service')
const dateFormat = require('../../helper/dateformat.helper');
const Gallery = require('../../models/gallery.model')
const constants = require('../../config/constants')
const { checkAdmin } = require('../services/user.service')
const { BASEURL } = require('../../keys/development.keys')



exports.createNewGallery = async (req, res) => {

    try {

        const userId = req.user._id;
        const users = await checkAdmin(userId)

        if (users.user_type !== constants.USER_TYPE.ADMIN)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.unauthorized_user', {}, req.headers.lang);

        if (!req.file)
            return sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'USER.no_image_upload', {}, req.headers.lang);

        const imagePaths = req.files.map(file => file);

        const newGallery = new Gallery({
            image1: `${BASEURL}/${imagePaths[0].destination}/${imagePaths[0].filename}`,
            image2: `${BASEURL}/${imagePaths[1].destination}/${imagePaths[1].filename}`,
            image3: `${BASEURL}/${imagePaths[2].destination}/${imagePaths[2].filename}`,
            image4: `${BASEURL}/${imagePaths[3].destination}/${imagePaths[3].filename}`,
            image5: `${BASEURL}/${imagePaths[4].destination}/${imagePaths[4].filename}`,
            category: req.body.category,
            created_at: dateFormat.set_current_timestamp(),
            updated_at: dateFormat.set_current_timestamp()
        });

        await newGallery.save();
        return sendResponse(res, constants.WEB_STATUS_CODE.CREATED, constants.STATUS_CODE.SUCCESS, 'GALLERY.add_new_images', newGallery, req.headers.lang);

    } catch (err) {

        console.log("err(createNewGallery)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}


exports.getAllGallery = async (req, res) => {

    try {

        const { category } = req.query;

        const gallerys = await Gallery.find({ category: category });

        if (!gallerys || gallerys.length === 0) {

            return sendResponse(res, constants.WEB_STATUS_CODE.NOT_FOUND, constants.STATUS_CODE.FAIL, 'GALLERY.not_found', {}, req.headers.lang);
        }

        return sendResponse(res, constants.WEB_STATUS_CODE.OK, constants.STATUS_CODE.SUCCESS, 'GALLERY.get_all_images', gallerys, req.headers.lang);

    } catch (err) {

        console.log("err(createNewGallery)", err)
        return sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
    }
}
