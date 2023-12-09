const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      idOrder: String,
      name: String,
      tilte: String,
      addressIfR: String,
      addressIfS: String,
      receiveIf: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      sendIf: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      transLocaStart: [
        {
          timeTransStart: {
            type: Date,
            default: Date.now,
          },
          statusTransS: Boolean,
          transLocaStartName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionLocation",
          },
        },
      ],

      transLocaEnd: [
        {
          timeTransEnd: {
            type: Date,
            default: Date.now,
          },
          statusTransF: Boolean,
          transLocaEndName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionLocation",
          },
        },
      ],

      gatherLocaStart: [
        {
          timeGatherStart: {
            type: Date,
            default: Date.now,
          },
          statusGatherS: Boolean,
          gatherLocaStartName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GatheringLocation",
          },
        },
      ],

      gatherLocaEnd: [
        {
          timeGatherEnd: {
            type: Date,
            default: Date.now,
          },
          statusGatherF: Boolean,
          gatherLocaEndName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GatheringLocation",
          },
        },
      ],
      typeOrder: String,
      contentValue: String,
      describeOrder: String,
      specialService: String,
      timeReceive: String, // Đi tìm kiểu dữ liệu của time.
      price: Number, //Kiểu number trong js có được dùng thập phân, nó có thể chạy được từ đâu đến đâu
      paided: Number,
      isDeliveSuccess: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = Order;
