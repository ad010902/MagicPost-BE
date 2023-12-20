const authJwt = require("../middlewares");
const controlOrder = require("../controllers/order.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/order/createOrderOrigin", controlOrder.createOrderOrigin);
  app.post("/api/order/createOrderTransS", controlOrder.createOrderTransS);
  // app.post("/api/order/createOrderGatherF", controlOrder.createOrderToGatherF);
  // app.post("/api/order/createOrderTransF", controlOrder.createOrderToTransF);
  app.get("/api/order/findOneOrder", controlOrder.findOneOrder);
  app.get("/api/order/findAllOrderGatherS", controlOrder.findAllOrderGatherS);
  app.get("/api/order/findAllOrderGatherF", controlOrder.findAllOrderGatherF);
  app.get("/api/order/findAllOrderTransF", controlOrder.findAllOrderTransF);
  app.get("/api/order/countOrderTransFail", controlOrder.countOrderTransFail);
  app.get(
    "/api/order/countOrderTransSuccessCostomer",
    controlOrder.countOrderTransSuccessCostomer
  );
  app.get(
    "/api/order/countOrderTransSuccessGatherNext",
    controlOrder.countOrderTransSuccessGatherNext
  );
  app.get("/api/order/countOrderReceive", controlOrder.countOrderReceive);

  //Update status order.
  app.put("/api/order/updateOrder", controlOrder.updateOrder);
};
