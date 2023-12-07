const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // cau nay nghia la gi

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.order = require("./order.model");
db.gatheringLocation = require("./gatheringLocation.model");
db.transactionLocation = require("./transactionLocation.model");

db.ROLES = [
    "user",
    "staffGather",
    "managerGather",
    "staffTrans",
    "managerTrans",
    "admin",
];

module.exports = db;