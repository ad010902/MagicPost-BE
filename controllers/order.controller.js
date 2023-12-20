const db = require("../models");
const GatheringLocation = db.GatheringLocation;
const Order = db.order;
const OrderHistory = db.orderHistory;
const EmailService = require("../services/email.service");
//const Role = db.role;
const TransactionLocation = db.TransactionLocation;

exports.createOrderOrigin = (req, res) => {
  const order = new Order({
    name: req.body.name,
    title: req.body.title,
    receiveIf: req.body.receiveIf,
    sendIf: req.body.sendIf,
    addressIfR: req.body.addressIfR,
    addressIfS: req.body.addressIfS,
    typeOrder: req.body.typeOrder,
    contentValue: req.body.contentValue,
    describeOrder: req.body.describeOrder,
    specialService: req.body.specialService,
    status: req.body.status,
    timeReceive: req.body.timeReceive, // Đi tìm kiểu dữ liệu của time.
    price: req.body.price, //Kiểu number trong js có được dùng thập phân, nó có thể chạy được từ đâu đến đâu
    paided: req.body.paided,
    isDeliveSuccess: req.body.isDeliveSuccess,
  });

  //Save new order
  order
    .save(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the order.",
      });
    });

  const orderHistory = new OrderHistory({
    orderName: req.body.orderName,
    title: req.body.title,
    transLocaStart: req.body.transLocaStart,
    transLocaEnd: req.body.transLocaEnd,
    status: req.body.status,
  });

  orderHistory
    .save(orderHistory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the order history.",
      });
    });
  // Automaticly update count after changing and creating
  // const id = req.params._id;
  // TransactionLocation.findByIdAndUpdate(
  //   {
  //     //update by name
  //     _id: order.transLocaStart._id,
  //   },
  //   {
  //     $inc: { countOrderS: +1 },
  //   },
  //   { new: true }
  // );
};

//Find all list includes gathering Location according condition

/*exports.findAllGather = (req, res) => {
  const nameTrans = req.query.nameTrans;
  //loc ra danh sach theo ten, hay chuc vu, ra danh sach
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};*/
//Ta
exports.createOrderTransS = (req, res) => {
  const orderHistory = new OrderHistory({
    orderName: req.body.orderName,
    title: req.body.title,
    transLocaStart: req.body.transLocaStart,
    gatherLocaStart: req.body.gatherLocaStart.name,
    status: false,
  });

  //   //Save new order
  orderHistory
    .save(orderHistory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the order to.",
      });
    });
};

exports.findOneOrder = (req, res) => {
  const id = req.params._id;

  Order.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving order with id " + id });
    });
};

//Update order by the id in the request
exports.updateOrder = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;
  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found order with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving order with id" + id });
    });
};
// Đưa ra tất cả các đơn đang chờ xác nhận đến điểm tập kết đầu tiên
exports.findAllOrderGatherS = (req, res) => {
  OrderHistory.find({ transLocaStart: User.nameTrans })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred gatherS.",
      });
    });
};

exports.findAllOrderGatherF = (req, res) => {
  Order.find({ statusGatherF: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured gatherF ",
      });
    });
};

exports.findAllOrderTransF = (req, res) => {
  Order.find({ statusTransF: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured gatherF",
      });
    });
};

//Đếm số lượng hàng chuyển đi thành công == Số lượng hàng mà điểm tập kết nhận, gatherStart true
exports.countOrderTransFail = (req, res) => {
  try {
    const condition = { statusGatherS: false };
    const countOrderTransFail = Order.countDocuments(condition);
    res.status(200).send(countOrderTransFail);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error countOrderTransFail!",
    });
  }

  //return;
};
exports.countOrderTransSuccessCostomer = (req, res) => {
  try {
    const condition = { isDeliveSuccess: true };
    const countOrderTransSucess = Order.countDocuments(condition);
    res.status(200).send(countOrderTransSucess);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error countOrderTransSuCcess",
    });
  }
};

exports.countOrderTransSuccessGatherNext = (req, res) => {
  try {
    const condition = { statusGatherS: true };
    const countOrderTransSucess = Order.countDocuments(condition);
    res.status(200).send(countOrderTransSucess);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error countOrderTransSuCcess",
    });
  }
};
// exports.countOrderGatherSend = (req, res) => {
//   try {
//     const condition = {};
//   } catch (err) {}
// };
// exports.countOrderGatherReceive;
exports.countOrderReceive = (req, res) => {
  try {
    const condition = { statusTransS: true };
    const countOrderReceive = Order.countDocuments(condition);
    res.send(200).send(countOrderReceive);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error countOrderReceive",
    });
  }
};
// exports.countOrderSend;

//Đếm số lượng hàng nhận đc == sô lượng transStart true, gatherStart true

//Đếm số lượng trả đi tại điểm tập kết chính là giao dịch đảm bảo đúng, điểm tập kết tiếp theo cf
