import express from "express";
import {
  createOrder,
  createOrderAsGuest,
  getAllOrdersForUser,
  trackOrder,
  updateOrder
} from "../controllers/OrdersController.js";
import { verifyUser } from "../middleware/Auth.js";

const orderRouter = express.Router();

orderRouter.post("/orders/createOrder", verifyUser, createOrder);
orderRouter.post("/orders/createOrderAsGuest", createOrderAsGuest);
orderRouter.post("/orders/updateOrder",verifyUser, updateOrder);
orderRouter.post("/orders/getAllOrdersForUser",verifyUser, getAllOrdersForUser);
orderRouter.post("/orders/trackOrder", trackOrder);

export default orderRouter;
