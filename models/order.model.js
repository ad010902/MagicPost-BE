const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        // Đánh id cho đơn dạng abcxyz1234...
        // Đây là tên đơn để thuận tiện cho việc thống kê
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        tilte: String,
        addressIfR: String,
        addressIfS: String,
        receiveIf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        sendIf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // transLocaStart: {
        //     timeTransStart: {
        //         type: Date,
        //         default: Date.now,
        //     },
        //     statusTransS: Boolean,
        //     transLocaStartName: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "TransactionLocation",
        //     },
        // },

        // transLocaEnd: {
        //     timeTransEnd: {
        //         type: Date,
        //         default: Date.now,
        //     },
        //     statusTransF: Boolean,
        //     transLocaEndName: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "TransactionLocation",
        //     },
        // },

        // gatherLocaStart: {

        //     gatherLocaStartName: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "GatheringLocation",
        //     },
        // },

        // gatherLocaEnd: {
        //     timeGatherEnd: {
        //         type: Date,
        //         default: Date.now,
        //     },
        //     statusGatherF: Boolean,
        //     gatherLocaEndName: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "GatheringLocation",
        //     },
        // },
        status: String,
        typeOrder: String,
        contentValue: String,
        describeOrder: String,
        specialService: String,
        timeReceive: String, // Đi tìm kiểu dữ liệu của time.
        price: Number, //Kiểu number trong js có được dùng thập phân, nó có thể chạy được từ đâu đến đâu
        paided: Number,
        isDeliveSuccess: Boolean,
    }, { timestamps: true })
);

module.exports = Order;