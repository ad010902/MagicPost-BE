const authJwt = require("../middlewares");
const controlGather = require("../controllers/gatheringLocation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/api/gatherLoca/showAlGather/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlGather.showAllGatherLoca
  );

  app.get(
    "/api/gatherLoca/findOne/:_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlGather.findOneGather
  );

  app.delete(
    "/api/gatherLoca/deleteAll/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlGather.deleteAllGather
  );

  app.delete(
    "/api/gatherLoca/deleteOne/:_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlGather.deleteGather
  );

  app.put(
    "/api/transLoca/update/:_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controlGather.updateGather
  );
};
