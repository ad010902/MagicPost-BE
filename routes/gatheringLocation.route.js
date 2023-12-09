const { authJWT } = require("../middlewares");
const controlGather = require("../controllers/gatheringLocation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/gatherLoca/createGather", controlGather.createGather);

  app.get("/api/gatherLoca/showAlGather", controlGather.showAllGatherLoca);

  app.get("/api/gatherLoca/findOne/:_id", controlGather.findOneGather);

  app.delete("/api/gatherLoca/deleteAll", controlGather.deleteAllGather);

  app.delete("/api/gatherLoca/deleteOne/:_id", controlGather.deleteGather);

  app.put("/api/transLoca/update/:_id", controlGather.updateGather);
};
