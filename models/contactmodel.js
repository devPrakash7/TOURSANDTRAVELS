const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    
    full_name: {
        type: String,
        required: true, // Add this line if full_name is mandatory
    },
    email: {
        type: String,
        
    },
    location: {
        type: String,
    },
    enquery: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    message: {
        type: String,
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    },
});


ContactSchema.index({ "email": 1 }, { unique: true });

const Contact = mongoose.model('Livosocontacts', ContactSchema);
module.exports = Contact;