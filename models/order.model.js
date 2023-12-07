const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      idOrder: String,
      name: String,
      tilte: String,
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
          transLocaStartName: {
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
          gatherLocaStartName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GatheringLocation",
          },
        },
      ],

      gatherLocaStart: [
        {
          timeTransStart: {
            type: Date,
            default: Date.now,
          },
          transLocaStartName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionLocation",
          },
        },
      ],
      typeOrder: String,
      //Noi dung la gi
      status: String,
      //Chuyen den dau, gui ve
      contentValue: String,
      specialService: String,
      timeReceive: String, // Đi tìm kiểu dữ liệu của time.
      price: Number, //Kiểu number trong js có được dùng thập phân, nó có thể chạy được từ đâu đến đâu
      paided: Number,
      status: String,
    },
    { timestamps: true }
  )
);

module.exports = Order;
