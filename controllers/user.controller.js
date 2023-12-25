const db = require("../models");
const GatheringLocation = db.GatheringLocation;
const TransactionLocation = db.TransactionLocation;
const User = db.user;
const Role = db.role;
const Email = require("../services/email.service");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content."); //Check current user
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content."); //check xem phai la role user
};

exports.staffGatherBoard = (req, res) => {
  res.status(200).send("Staff Gather Content.");
};

exports.managerGatherBoard = (req, res) => {
  res.status(200).send("Manager Gather Content.");
};

exports.staffTransBoard = (req, res) => {
  res.status(200).send("Staff Trans Content.");
};

exports.managerTransBoard = (req, res) => {
  res.status(200).send("Manager Trans Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.showAllUser = (req, res) => {
  User.find(role)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Create admin
exports.createUser = (req, res) => {
  //Valid request
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roleName: req.body.roleName,
    nameTrans: req.body.nameTrans,
    nameGather: req.body.nameGather,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            //res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: user.roleName }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = role._id;
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          //gửi mật khẩu và tài khoản về email.

          res.send({ message: "Create user successfully!" });
        });
      });
    }
  });
};

//tìm tất cả danh sách theo cái gì đây ????

/*exports.findAllUser = (req, res) => {
  const username = req.query.username;
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

exports.findOneUser = (req, res) => {
  const id = req.params._id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

//Update a user by the id in the request
exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id" + id });
    });
};

// Delete a user with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params._id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

// Delete all user from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} User were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all user.",
      });
    });
};

// Find all according staffGather
exports.findAllStaffGather = (req, res) => {
  //const name = req.params.name;
  User.find({ roleName: "staffGather" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving staffGather.",
      });
    });
};

//Find all according staffTrans
exports.findAllStaffTrans = (req, res) => {
  const staffTransRole = Role.findOne({ name: "staffTrans" });
  //const adminUsers = await User.find({ nameWork: 'admin', roles: adminRole._id }).exec();
  //how to user assign
  const name = req.params.name;
  User.find({ nameTrans: name, roles: staffTransRole })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving staffGather.",
      });
    });
};
