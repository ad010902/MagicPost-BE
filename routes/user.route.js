const authJwt = require("../middlewares");
const controlUser = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all/", controlUser.allAccess);

  app.get("/api/test/user/", [authJwt.verifyToken], controlUser.userBoard);

  app.get(
    "/api/test/staffGather/",
    [authJwt.verifyToken, authJwt.isStaffGather],
    controlUser.staffGatherBoard
  );

  app.get(
    "/api/test/managerGather/",
    [authJwt.verifyToken, authJwt.isManagerGather],
    controlUser.isManagerGather
  );

  app.get(
    "/api/test/staffTrans/",
    [authJwt.verifyToken, authJwt.isStaffTrans],
    controlUser.staffTransBoard
  );

  app.get(
    "/api/test/managerTrans/",
    [authJwt.verifyToken, authJwt.isManagerTrans],
    controlUser.managerTransBoard
  );

  app.get(
    "/api/test/admin/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlUser.adminBoard
  );

  app.get(
    "/api/admin/showAllUsers/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlUser.showAllUser
  );

  app.get(
    "/api/staffTrans/:name",
    [auth.verifyToken, authJwt.authJwt.isManagerTrans],
    controlUser.findAllStaffTrans
  );

  app.get(
    "/api/staffGather/:name",
    [authJwt.verifyToken, authJwt.isManagerGather],
    controlUser.findAllStaffGather
  );

  app.post("/api/createUser", [authJwt.verifyToken], controlUser.createUser);

  app.delete(
    "/api/deleteUser/:_id",
    [authJwt.verifyToken],
    controlUser.deleteUser
  );

  app.delete(
    "/api/deleteAllUser/",
    [authJwt.verifyToken],
    controlUser.deleteAll
  );

  app.put(
    "/api/updateUser/:_id",
    [authJwt.verifyToken],
    controlUser.updateUser
  );

  app.get(
    "/api/searchUser/:_id",
    [authJwt.verifyToken],
    controlUser.findOneUser
  );
};
