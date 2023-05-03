const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const Userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{collection:"all-users"}, { timestamps: true }
);

mongoose.models = {}
const User = mongoose.model("user", Userschema)
module.exports = User