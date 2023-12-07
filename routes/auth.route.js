const verifySignUp = require("../middlewares");
const controlAuth = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  //signup
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDupplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controlAuth.signup
  );

  //signin
  app.post("/api/auth/signin", controlAuth.signin);

  //sign out
  app.post("api/auth/signout", controlAuth.signout);
};
