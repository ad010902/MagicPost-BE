const mongoose = require("mongoose");

const TransactionLocation = mongoose.model(
  "TransactionLocation",
  new mongoose.Schema({
    nameTrans: String,
    phone: String,
    email: String,
    //count order, which user receive
    countOrderS: Number,
    //count order, which user don't receive, does this case exist??
    //count order, which transaction cf
    countOrderT: Number,
    //cont order, which transaction doesn't cf
    countOrderF: Number,
    //ten cua truong diem giao dich
    managerTrans: {
      managerTransName: String,
      managerTransID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    //
    gatherLocation: {
      gatherLocationName: String,
      gatherLocationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GatheringLocation",
      },
    },
  })
);
module.exports = TransactionLocation;
