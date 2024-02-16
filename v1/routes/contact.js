
const express = require('express');
const { addNewContact, getAllContact, DeleteContact } = require('../controllers/contact.controller');
const router = express.Router();
const { verifyAccessToken } = require('../../middleware/admin.autenticate');
const { contact } = require('../controllers/contactController');


router.post('/addNewContact' , addNewContact);
router.get('/getAllContact' , verifyAccessToken , getAllContact)
router.delete('/deleteContact/:contactId' , verifyAccessToken , DeleteContact)
router.post('/LivosoInquiryForm' , contact)



module.exports = router;