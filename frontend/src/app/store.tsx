import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import ActionsSlice from "../features/ActionsSlice";
import productSlice from "../features/productSlice";
import reviewsSlice from "../features/reviewsSlice";
import orderSlice from "../features/orderSlice";
import couponSlice from "../features/couponSlice";

export const store = configureStore({
  reducer: {
    actions: ActionsSlice,
    auth: authSlice,
    products: productSlice,
    reviews: reviewsSlice,
    orders: orderSlice,
    coupons:couponSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
