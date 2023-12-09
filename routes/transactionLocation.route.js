const { authJWT } = require("../middlewares");
const controlTrans = require("../controllers/transactionLocation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/api/transLoca/showAlTrans/",
    [authJWT.verifyToken, authJWT.isAdmin, authJWT.isManagerGather],
    controlTrans.showAllTransLoca
  );

  app.get(
    "/api/transLoca/findOne/:_id",
    [authJWT.verifyToken, authJWT.isAdmin, authJWT.isManagerGather],
    controlTrans.findOneTrans
  );

  app.delete(
    "/api/transLoca/deleteAll/",
    [authJWT.verifyToken, authJWT.isAdmin, authJWT.isManagerGather],
    controlTrans.deleteAll
  );

  app.delete(
    "/api/transLoca/deleteOne/:_id",
    [authJWT.verifyToken, authJWT.isAdmin, authJWT.isManagerGather],
    controlTrans.deleteTrans
  );

  app.put(
    "/api/transLoca/update/:_id",
    [authJWT.verifyToken, authJWT.isAdmin, authJWT.isManagerGather],
    controlTrans.updateTrans
  );
};
