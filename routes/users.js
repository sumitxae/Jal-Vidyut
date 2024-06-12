const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb+srv://sumitxae:sumitxae@cluster0.nyy25em.mongodb.net/ccet?retryWrites=true&w=majority&appName=Cluster0");

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
