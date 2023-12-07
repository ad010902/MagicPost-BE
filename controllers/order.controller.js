const db = require("../models");
const GatheringLocation = db.GatheringLocation;
const Order = db.order;
//const Role = db.role;

//Create order carefully, notiable pls
// Create order to user
exports.createOrder = (req, res) => {
  //Valid request
  /*if (!req.body.nameGather) {
                      res.status(400).send({ message: "Content can not be empty!" });
                      return;
                    }*/
  //create a order
  const order = new Order({
    name: req.body.name,
    receiveIf: {
      fullNameR: req.body.receiveIf.fullNameR,
      addressR: req.body.receiveIf.addressR,
      phoneR: req.body.receiveIf.phoneR,
      idReceiver: req.body.receiveIf.idReceiver,
      idTelR: req.body.receiveIf.idReceiver, // mã bưu chính?
    },
    sendIf: {
      fullNameS: req.body.sendIf.fullNameS,
      addressS: req.body.sendIf.addressR,
      phoneS: req.body.sendIf.phoneS,
      idSender: req.body.sendIf.id,
      idTelS: req.body.sendIf.isTelS,
    },
    typeOrder: req.body.typeOrder,
    contentValue: req.body.contentValue,
    specialService: req.body.specialService,
    timeReceive: req.body.timeReceive, // Đi tìm kiểu dữ liệu của time.
    price: req.body.price, //Kiểu number trong js có được dùng thập phân, nó có thể chạy được từ đâu đến đâu
    paided: req.body.paided,
    status: req.body.status,
  });

  //Save new order
  Order.save(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the gathering Location.",
      });
    });
};

// Create order to TransF (diem dau)
exports.createOrderTransF = (req, res) => {
  //Valid request
  if (!req.body.name) {
    res.status(400).send({ message: "Order can not be empty!" });
    return;
  }

  //create a Order to startTransaction
  const Order = new Order({
    idOrder: req.body.idOrder,
    content: req.body.content,
    name: req.body.name,
    transLocaStart: req.body.transLocaStart,
    gatherLocaStart: req.body.gatherLocaStart,
    status: req.body.status,
  });

  //Save new order
  Order.save(order)
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

//Create order to TransF(tao don chuyen den diem tiep theo)
exports.createOrderRTrans = (req, res) => {
  if (!req.body.name) {
  }
};

//Create order to GatherF
exports.createOrderGatherF = (req, res) => {};

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

exports.countOrder;

// Find all theo role
/*exports.findAllStaffGather = (req, res) => {
  User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving staffGather."
      });
    });
};*/

//
