const { authJWT } = require("../middlewares");
const controlUser = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all/", controlUser.allAccess);

  app.get("/api/test/user/", [authJWT.verifyToken], controlUser.userBoard);

  app.get(
    "/api/test/staffGather/",
    [authJWT.verifyToken, authJWT.isStaffGather],
    controlUser.staffGatherBoard
  );

  app.get(
    "/api/test/managerGather/",
    [authJWT.verifyToken, authJWT.isManagerGather],
    controlUser.isManagerGather
  );

  app.get(
    "/api/test/staffTrans/",
    [authJWT.verifyToken, authJWT.isStaffTrans],
    controlUser.staffTransBoard
  );

  app.get(
    "/api/test/managerTrans/",
    [authJWT.verifyToken, authJWT.isManagerTrans],
    controlUser.managerTransBoard
  );

  app.get(
    "/api/test/admin/",
    [authJWT.verifyToken, authJWT.isAdmin],
    controlUser.adminBoard
  );

  app.get(
    "/api/admin/showAllUsers/",
    [authJWT.verifyToken, authJWT.isAdmin],
    controlUser.showAllUser
  );

  app.get(
    "/api/staffTrans/:name",
    [authJWT.verifyToken, authJWT.authJwt.isManagerTrans],
    controlUser.findAllStaffTrans
  );

  app.get(
    "/api/staffGather/:name",
    [authJWT.verifyToken, authJWT.isManagerGather],
    controlUser.findAllStaffGather
  );

  app.post("/api/createUser", [authJWT.verifyToken], controlUser.createUser);

  app.delete(
    "/api/deleteUser/:_id",
    [authJWT.verifyToken],
    controlUser.deleteUser
  );

  app.delete(
    "/api/deleteAllUser/",
    [authJWT.verifyToken],
    controlUser.deleteAll
  );

  app.put(
    "/api/updateUser/:_id",
    [authJWT.verifyToken],
    controlUser.updateUser
  );

  app.get(
    "/api/searchUser/:_id",
    [authJWT.verifyToken],
    controlUser.findOneUser
  );
};
