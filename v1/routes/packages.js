
const express = require('express');
const { addpackages, getAllPackages, deletePackages } = require('../controllers/package.controller');
const router = express.Router();
const {verifyAccessToken} = require('../../middleware/admin.autenticate')


router.post('/addPackage' , verifyAccessToken , addpackages)
router.get('/getAllPackages' , getAllPackages);
router.delete('/deletePackage/:packageId' , verifyAccessToken , deletePackages)


module.exports = router;