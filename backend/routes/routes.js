import express from "express";
import userRouter from "./UserRoutes.js";
import productRouter from "./ProductsRoutes.js";
import reviewsRouter from "./ReviewsRoutes.js";
import orderRouter from "./OrdersRoutes.js";
import contactRouter from "./ContactRoutes.js";


const router = express.Router();

router.use(userRouter);
router.use(productRouter);
router.use(reviewsRouter);
router.use(orderRouter);
router.use(contactRouter);


export default router;