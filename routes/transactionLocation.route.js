const authJwt = require("../middlewares");
const controlTrans = require("../controllers/transactionLocation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/api/transLoca/showAlTrans/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isManagerGather],
    controlTrans.showAllTransLoca
  );

  app.get(
    "/api/transLoca/findOne/:_id",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isManagerGather],
    controlTrans.findOneTrans
  );

  app.delete(
    "/api/transLoca/deleteAll/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isManagerGather],
    controlTrans.deleteAll
  );

  app.delete(
    "/api/transLoca/deleteOne/:_id",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isManagerGather],
    controlTrans.deleteTrans
  );

  app.put(
    "/api/transLoca/update/:_id",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isManagerGather],
    controlTrans.updateTrans
  );
};
