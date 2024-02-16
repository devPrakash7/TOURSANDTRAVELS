
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const constants = require('../config/constants')
const { sendResponse } = require('../services/common.service');
const { JWT_SECRET } = require('../keys/keys')



exports.verifyAccessToken = async (req, res, next) => {

        try {

            if (!req.header('Authorization')) return sendResponse(res, constants.WEB_STATUS_CODE.UNAUTHORIZED, constants.STATUS_CODE.UNAUTHENTICATED, 'GENERAL.unauthorized_user', {}, req.headers.lang);

            const token = req.header('Authorization').replace('Bearer ', '');
            if (!token) sendResponse(res, constants.WEB_STATUS_CODE.BAD_REQUEST, constants.STATUS_CODE.FAIL, 'GENERAL.not_token', {}, req.headers.lang)

            const decoded = await jwt.verify(token, JWT_SECRET);

            const user = await User.findOne({ _id: decoded._id, 'tokens': token, user_type: 1 });

            if (!user) return sendResponse(res, constants.WEB_STATUS_CODE.UNAUTHORIZED, constants.STATUS_CODE.UNAUTHENTICATED, 'GENERAL.unauthorized_user', {}, req.headers.lang)

            req.token = token;
            req.user = user;

            next();

        } catch (err) {

            console.log('err....', err)
            sendResponse(res, constants.WEB_STATUS_CODE.SERVER_ERROR, constants.STATUS_CODE.FAIL, 'GENERAL.general_error_content', err.message, req.headers.lang)
        }
    }