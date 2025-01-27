import express from "express";
import {
  getBestSellingProducts,
  getLatestPRoducts,
  getProductById,
  getProducts,
} from "../controllers/ProductsController.js";

const productRouter = express.Router();

productRouter.post("/products/getLatestPRoducts", getLatestPRoducts);
productRouter.post("/products/getProducts", getProducts);
productRouter.post("/products/getProductById", getProductById);
productRouter.post("/products/getBestSellingProducts", getBestSellingProducts);

export default productRouter;
