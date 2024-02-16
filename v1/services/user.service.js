const {
  ObjectId
} = require('mongoose').Types;


const User = require("../../models/user.model")

exports.getUser = async (idOrEmail, fieldName = '_id') => {
  const data = await User.findOne({
    [fieldName]: `${idOrEmail}`
  }).lean();
  return data;
};

exports.Usersave = data => new User(data).save();

exports.checkAdmin = async (userId) => {

     try {

      const users =  await User.findOne({_id: userId})
      return users

     }catch(err) {

        throw err;
     }
}

exports.updateuser = async (userId , reqBody) => {

   try {
     
    const updateUser = await User.findByIdAndUpdate({_id: userId } , reqBody , { new : true });
    return updateUser;
      
   }catch(err){

       throw new Error(err.message)
   }
}