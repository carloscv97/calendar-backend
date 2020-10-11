const { Schema, model } = require("mongoose");

/**
 *  Schema of User Model
 */
const UserSchema = Schema({

   name: {
      type: String,
      required: true
   }, 

   email: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true
   }
});

module.exports = model('User', UserSchema);