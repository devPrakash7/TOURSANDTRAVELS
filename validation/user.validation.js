
const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');



//validate user form detail
exports.user_validator = [

  body('full_name')
    .not()
    .isEmpty()
    .withMessage('full name is required')
    .isString()
    .withMessage(`full name should be string`)
    .isLength({ min: 3 })
    .withMessage('full name min length is 2'),

  body('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .isString()
    .withMessage(`email should be string`)
    .isEmail().withMessage('please enter a valid email')
    .trim(),

  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isString()
    .withMessage(`password should be string`)
    .trim()
    .isLength({ min: 8 })
    .withMessage('password min length is 8')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('please enter a valid password'),

  body('mobile_number')
    .not()
    .isEmpty()
    .withMessage('mobile_number is required')
    .isString()
    .withMessage(`mobile_number should be string`)
    .trim()
    .isMobilePhone()
    .withMessage('please enter a valid mobile_number'),

];

exports.login_validator = [

  body('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .isString()
    .withMessage(`email should be string`)
    .isEmail().withMessage('please enter a valid email')
    .trim(),

  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isString()
    .withMessage(`password should be string`)
    .trim()
    .isLength({ min: 8 })
    .withMessage('password min length is 8')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('please enter a valid password'),

];


exports.changePassword_validator = [

  body('old_password')
    .not()
    .isEmpty()
    .withMessage('old_password is required')
    .isString()
    .withMessage(`old_password should be string`)
    .trim()
    .isLength({ min: 8 })
    .withMessage('old_password min length is 8')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('please enter a valid old_password'),

  body('new_password')
    .not()
    .isEmpty()
    .withMessage('new_password is required')
    .isString()
    .withMessage(`new_password should be string`)
    .trim()
    .isLength({ min: 8 })
    .withMessage('new_password min length is 8')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('please enter a valid new_password'),

  body('confirm_password')
    .not()
    .isEmpty()
    .withMessage('confirm_password is required')
    .isString()
    .withMessage(`confirm_password should be string`)
    .trim()
    .isLength({ min: 8 })
    .withMessage('confirm_password min length is 8')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('please enter a valid confirm_password'),

];

exports.isValidObjectId = (id) => {
  return ObjectId.isValid(id);
};




exports.ValidatorResult = (req, res, next) => {

  try {

    const result = validationResult(req);
    const haserror = !result.isEmpty();

    if (haserror) {
      const err = result.array()[0].msg;
      return res.status(400).send({ sucess: false, message: err });
    }
    next();

  } catch (err) {

    res.status(false).send({ status: false, message: err.message })
  }
}


