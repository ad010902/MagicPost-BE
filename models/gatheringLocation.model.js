const mongoose = require("mongoose");

const GatheringLocation = mongoose.model(
  "GatheringLocation",
  new mongoose.Schema({
    nameGather: String,
    phone: String,
    email: String,
    //count orders, which orders are received
    countOrderReceived: Number,
    //count orders,
    countOrderSend: Number,
    //Khong biet co nen lay khong nhi, lay ten cua ID, ten o cac truong da luu ra.
    managerGather: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);
module.exports = GatheringLocation;
