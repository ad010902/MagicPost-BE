const mongoose = require("mongoose");

const TransactionLocation = mongoose.model(
  "TransactionLocation",
  new mongoose.Schema({
    nameTrans: String,
    phone: String,
    email: String,
    //ten cua truong diem giao dich
    managerTrans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //thuoc diem tap ket nao
    gatherLocation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GatheringLocation",
      },
    ],
  })
);
module.exports = TransactionLocation;
