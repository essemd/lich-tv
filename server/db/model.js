const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // one of the more secure hashing algorithms currently

const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    stream_key: String
  });
  
  // hash the password
  userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model("users", userSchema);