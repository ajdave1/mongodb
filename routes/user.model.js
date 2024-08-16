const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  age: { type: Number, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  password: { type: String, minlength: 8, trim: true, required: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
