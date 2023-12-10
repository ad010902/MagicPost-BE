const express = require("express");
const cors = require("cors");

const dbConfig = require("./config/db.config");
//const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     keys: ["COOKIE_SECRET"], // should use as secret environment variable
//     httpOnly: true,
//     sameSite: "strict",
//   })
// );

const db = require("./models");
const Role = db.role;
//db.sequelize.sync();

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
//app.get("/", (req, res) => {
//res.json({ message: "Welcome to bezkoder application." });
//});

// routes
require("./routes/auth.route")(app);
//require("./routes/user.route")(app);
require("./routes/gatheringLocation.route")(app);
// require("./routes/transactionLocation.route")(app);
//require("./routes/order.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "staffGather",
//   });

//   Role.create({
//     id: 3,
//     name: "managerGather",
//   });

//   Role.create({
//     id: 4,
//     name: "staffTrans",
//   });

//   Role.create({
//     id: 5,
//     name: "managerTrans",
//   });

//   Role.create({
//     id: 6,
//     name: "admin",
//   });
// }
