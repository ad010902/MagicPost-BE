const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    phone: Number,
    nameTrans: String,
    nameGather: String,
    roleName: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);
module.exports = User;
