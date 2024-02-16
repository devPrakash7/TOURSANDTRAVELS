const express = require('express');
const router = express.Router();
const { login_validator , ValidatorResult } = require('../../validation/user.validation')
const authenticate = require('../../middleware/authenticate') 
const {
  login,
  logout
} = require('../controllers/admin.controller')



router.post('/login', login_validator, ValidatorResult, login)
router.get('/logout', authenticate , logout)




module.exports = router;


