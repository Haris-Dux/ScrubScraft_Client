import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Base_url } from "./constant";
import { RequestData } from "../sections/checkout/checkout-details";
import { data } from "../sections/orders/orders-view";

// API URLs
const pricingDetailsUrl = `https://admin.scrubscraft.shop/pricing/getPricing`;
const createOrderUrl = `${Base_url}/orders/createOrder`;
const createOrderForGuestUrl = `${Base_url}/orders/createOrderAsGuest`;
const getAllOrderUrl = `${Base_url}/orders/getAllOrdersForUser`;
const updateOrderUrl = `${Base_url}/orders/updateOrder`;
const trackOrderUrl = `${Base_url}/orders/trackOrder`;

// CREATE REVIEWS ASYNC THUNK
export const pricingDetailsAsync = createAsyncThunk(
  "Details/pricing",
  async () => {
    try {
      const response = await axios.get(pricingDetailsUrl);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);
export const createOrderAsync = createAsyncThunk(
  "reviews/create",
  async (formData: RequestData) => {
    try {
      const response = await axios.post(createOrderUrl, formData);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

export const createOrderForGuestAsync = createAsyncThunk(
  "order/forGuest",
  async (formData: RequestData) => {
    try {
      const response = await axios.post(createOrderForGuestUrl, formData);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// TRACK ORDER ASYNC THUNK
export const trackOrderAsync = createAsyncThunk(
  "track/order",
  async (orderId: any) => {
    try {
      const response = await axios.post(trackOrderUrl, orderId);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// GET ALL REVIEWS BY PRODUCT ASYNC THUNK
export const getallOrderAsync = createAsyncThunk(
  "reviews/getall",
  async (id: string | undefined) => {
    try {
      const response = await axios.post(getAllOrderUrl, { id });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "reviews/update",
  async (formData: data) => {
    try {
      const response = await axios.post(updateOrderUrl, formData);
      console.log("response", response.data);

      if (response.data.message === "Order Updated") {
        toast.success("Order Status Updated");
      }

      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

interface Image {
  downloadURL: string;
  name: string;
  type: string;
}
interface Product {
  id: string;
  name: string;
  category: string;
  image: Image;
  averageRating: number;
  sale_price: number | undefined;
  price: number;
  stock: number;
}

interface Orders {
  OrderID: string;
  createdAt: Date;
  orderProgress: string;
  totalAmount: number;
  id: string;
  items: Product;
}

// INITIAL STATE
interface ReviewsState {
  loading: boolean;
  createOrderLoading: boolean;
  orderTrackingLoading: boolean;
  pricingLoading: boolean;
  updateLoading: boolean;
  allOrders: Orders[];
  trackOrder: Orders[];
  pricing: any;
}

const initialState: ReviewsState = {
  loading: false,
  orderTrackingLoading: false,
  createOrderLoading: false,
  pricingLoading: false,
  updateLoading: false,
  allOrders: [],
  trackOrder: [],
  pricing: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    clearTrackOrder: (state) => {
      state.trackOrder = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // PRICING DETIALS
      .addCase(pricingDetailsAsync.pending, (state) => {
        state.pricingLoading = true;
      })
      .addCase(pricingDetailsAsync.fulfilled, (state, action) => {
        state.pricingLoading = false;
        state.pricing = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrderAsync.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state) => {
        state.createOrderLoading = false;
      })

      // GUEST ORDER
      .addCase(createOrderForGuestAsync.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrderForGuestAsync.fulfilled, (state) => {
        state.createOrderLoading = false;
      })

      // GET ALL REVIEWS ADD CASE
      .addCase(getallOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })

      // UPDATE ORDER
      .addCase(updateOrderAsync.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateOrderAsync.fulfilled, (state) => {
        state.updateLoading = false;
      })

      // TRACK ORDER ADD CASE
      .addCase(trackOrderAsync.pending, (state) => {
        state.orderTrackingLoading = true;
      })
      .addCase(trackOrderAsync.fulfilled, (state, action) => {
        state.orderTrackingLoading = false;
        state.trackOrder = action.payload;
      });
  },
});

export const { clearTrackOrder } = orderSlice.actions;
export default orderSlice.reducer;
