const mongoose = require("mongoose");

const GatheringLocation = mongoose.model(
    "GatheringLocation",
    new mongoose.Schema({
        nameGather: String,
        phone: String,
        email: String,
        address: String,
        //count orders, which orders are received
        countOrderReceived: Number,
        //count orders,
        countOrderSend: Number,
        //
        managerGather: [{
            managerGatherName: String,
            managerGatherID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }, ],
    })
);
module.exports = GatheringLocation;