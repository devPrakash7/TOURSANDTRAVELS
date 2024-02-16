const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middleware/admin.autenticate');
const { upload } = require('../../middleware/imageUpload');
const { createNewGallery, getAllGallery } = require('../controllers/gallery.controller');


router.post('/addAllImages' ,  upload.array('image' , 5) , verifyAccessToken , createNewGallery )
router.get('/getAllImages' , getAllGallery)



module.exports = router;