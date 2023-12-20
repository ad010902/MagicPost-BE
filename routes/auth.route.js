const { authJWT } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
//const authJWT = require("../middlewares/authJWT");
const controlAuth = require("../controllers/auth.controller");
const controlEmail = require("../services/email.service");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  //signup
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controlAuth.signup
  );

  //signin
  app.post("/api/auth/signin", controlAuth.signin);

  //sign out
  app.post("/api/auth/signout", controlAuth.signout);

  app.post("/api/auth/sendAccount", controlEmail.createEmail);

  app.get(
    "/api/auth/userBoard",
    // [authJWT.isUser, authJWT.verifyToken],
    controlAuth.isUser
  );
  app.get(
    "/api/auth/adminBoard",
    // [authJWT.isAdmin, authJWT.verifyToken],
    controlAuth.isAdmin
  );
};
