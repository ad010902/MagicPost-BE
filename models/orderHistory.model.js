const mongoose = require("mongoose");
const OrderHistory = mongoose.model(
    "OrderHistory",
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        //tên đơn
        orderName: String,
        // title:
        title: String,
        transLocaStart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionLocation",
        },
        transLocaEnd: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionLocation",
        },
        gatherLocaStart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GatheringLocation",
        },
        gatherLocaEnd: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GatheringLocation",
        },
        status: Boolean,
    }, {
        timestamps: true,
    })
);
module.exports = OrderHistory;