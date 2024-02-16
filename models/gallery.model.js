

const mongoose = require('mongoose');


const gallerySchema = new mongoose.Schema({
  
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    image5:{
        type:String
    },
    category:{
        type:String
    },
    created_at:{
      type:String
    },
    updated_at:{
        type:String
    },
});



//Output data to JSON
gallerySchema.methods.toJSON = function () {
    const gallery = this;
    const galleryObject = gallery.toObject();
    return galleryObject;
};


// Create the model for gallerys
const Gallery = mongoose.model('gallerys', gallerySchema);
module.exports = Gallery;
