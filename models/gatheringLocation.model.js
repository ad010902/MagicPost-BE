const mongoose = require("mongoose");

const GatheringLocation = mongoose.model(
  "GatheringLocation",
  new mongoose.Schema({
    nameGather: String,
    phone: String,
    email: String,
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
