// Tạo API tạo người nhân viên để quản lý, tạo nhân viên ở điểm giao dịch, điểm tập kết
const db = require("../models");
const GatheringLocation = db.GatheringLocation;
const Order = db.Order;

//const Role = db.role;

exports.createGather = (req, res) => {
  //Valid request
  if (!req.body.nameGather) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //create a gatheringLocation
  const gatheringLocation = new GatheringLocation({
    nameGather: req.body.nameGather,
    managerNameGather: req.body.managerNameGather,
  });

  //Save new gatheringLocation
  gatheringLocation
    .save(gatheringLocation)
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

exports.findOneGather = (req, res) => {
  const id = req.params._id;

  GatheringLocation.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Gathering Location with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Gathering Location with id=" + id });
    });
};

//Update a gathering Location by the id in the request
exports.updateGather = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;
  GatheringLocation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found gathering with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving gathering with id" + id });
    });
};

// Delete a gathering with the specified id in the request
exports.deleteGather = (req, res) => {
  const id = req.params._id;
  GatheringLocation.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Gathering Location with id=${id}. Maybe Gathering Location was not found!`,
        });
      } else {
        res.send({
          message: "Gathering Location was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Gathering Location with id=" + id,
      });
    });
};

// Delete all gathering from the database.
exports.deleteAllGather = (req, res) => {
  GatheringLocation.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Gathering Location were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all gathering Location.",
      });
    });
};

//show all Gathering Location
exports.showAllGatherLoca = (req, res) => {
  GatheringLocation.find()
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
