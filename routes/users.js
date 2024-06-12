const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
require("dotenv").config({
  path: "./.env",
});

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
