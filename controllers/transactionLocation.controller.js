// Tạo API tạo người nhân viên để quản lý, tạo nhân viên ở điểm giao dịch, điểm tập kết
const db = require("../models");
const GatheringLocation = require("../models/gatheringLocation.model");
//const GatheringLocation = db.GatheringLocation
const TransactionLocation = db.transactionLocation;

exports.createTransactionLocation = (req, res) => {
  //Valid request
  if (!req.body.nameTrans) {
    res.status(400).send({ message: "Transaction Location can not be empty!" });
    return;
  }

  //create a transactionLocation
  const transactionLocation = new TransactionLocation({
    nameTrans: req.body.nameTrans,
    managerNameTrans: req.body.managerNameTrans,
    gatherLocation: req.body.gatherLocation,
  });

  //Save new transactionLocation
  transactionLocation
    .save(transactionLocation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the Transaction Location.",
      });
    });
};

//Find all according to condition

/*exports.findAllTrans = (req, res) => {
  const nameGather = req.query.nameGather;
  //loc ra danh sach theo ten, hay chuc vu, ra danh sach
  var condition = nameGather
    ? { nameGather: { $regex: new RegExp(nameGather), $options: "i" } }
    : {};

  TransactionLocation.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving gathering Location.",
      });
    });
};*/

exports.findOneTrans = (req, res) => {
  const id = req.params._id;

  TransactionLocation.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found transactionLocation with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving transactionLocation with id=" + id,
      });
    });
};

//Update a transactionLocation by the id in the request
exports.updateTrans = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;
  TransactionLocation.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found transactionLocation with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving transactionLocation with id" + id });
    });
};

// Delete a transactionLocation with the specified id in the request
exports.deleteTrans = (req, res) => {
  const id = req.params._id;

  TransactionLocation.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete transactionLocation with id=${id}. Maybe transactionLocation was not found!`,
        });
      } else {
        res.send({
          message: "transactionLocation was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete transactionLocation with id=" + id,
      });
    });
};

// Delete all transactionLocation from the database.
exports.deleteAll = (req, res) => {
  TransactionLocation.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} TransactionLocation were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all transactionLocation.",
      });
    });
};

//Find all TransactionLocation
exports.showAllTransLoca = (req, res) => {
  TransactionLocation.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
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
