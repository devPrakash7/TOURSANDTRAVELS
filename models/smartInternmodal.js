const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    phone_number: String,
    gender: String,
    password:String,
    email: String,
    subject: String,
    course: String,
    mode:String
}
);

userSchema.index({ "emailAddress": 1 }, { unique: true });

const User = mongoose.model('smartIntern', userSchema);
module.exports = User;
