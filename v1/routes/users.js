const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const { user_validator,login_validator,changePassword_validator,ValidatorResult
} = require('../../validation/user.validation')
const {
  signUp,
  login,
  logout,
  changePassword,
  getUser,
  updateUser
} = require('../controllers/user.controller');
const { register  } = require('../../v1/controllers/smartInterncontroller')


router.post('/signUp',user_validator, ValidatorResult, signUp)
router.post('/login', login_validator,  ValidatorResult,  login)
router.get('/logout', authenticate , logout)
router.post('/change_password' , changePassword_validator, ValidatorResult, authenticate ,   changePassword)
router.post('/register' , register)





module.exports = router;
