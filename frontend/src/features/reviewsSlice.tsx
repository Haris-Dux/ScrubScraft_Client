import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Base_url } from "./constant";
import toast from "react-hot-toast";
import {
  CreateReviewPayload,
  UpdateReviewPayload,
} from "../sections/single-product/product-details";

// API URLs
const createReviewUrl = `${Base_url}/reviews/createReview`;
const updateReviewUrl = `${Base_url}/reviews/updateReview`;
const deleteReviewUrl = `${Base_url}/reviews/deleteReview`;
const getAllReviewsByProductUrl = `${Base_url}/reviews/getAllReviewsByProduct`;

// CREATE REVIEWS ASYNC THUNK
export const createreviewsAsync = createAsyncThunk(
  "reviews/create",
  async (formData: CreateReviewPayload) => {
    try {
      const response = await axios.post(createReviewUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

// GET ALL REVIEWS BY PRODUCT ASYNC THUNK
export const getallreviewsAsync = createAsyncThunk(
  "reviews/getall",
  async (id: any) => {
    try {
      const response = await axios.post(getAllReviewsByProductUrl, { id });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const updatereviewsAsync = createAsyncThunk(
  "reviews/update",
  async (formData: UpdateReviewPayload) => {
    try {
      const response = await axios.post(updateReviewUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw new Error(error);
    }
  }
);

// DELETE REVIEWS PRODUCT ASYNC THUNK
export const deletereviewsAsync = createAsyncThunk(
  "reviews/delete",
  async (id: any) => {
    try {
      const response = await axios.post(deleteReviewUrl, id);
      toast.success(response.data.message);
      // console.log("response", response);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  }
);

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  userID: string;
  createdAt: string;
}

// INITIAL STATE
interface ReviewsState {
  loading: boolean;
  createReviewLoading: boolean;
  updateReviewLoading: boolean;
  deleteReviewLoading: boolean;
  allReviews: Review[];
}

const initialState: ReviewsState = {
  loading: false,
  createReviewLoading: false,
  updateReviewLoading: false,
  deleteReviewLoading: false,
  allReviews: [],
};

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // DELETE REVIEW
      .addCase(createreviewsAsync.pending, (state) => {
        state.createReviewLoading = true;
      })
      .addCase(createreviewsAsync.fulfilled, (state) => {
        state.createReviewLoading = false;
      })
      .addCase(createreviewsAsync.rejected, (state) => {
        state.createReviewLoading = false;
      })

      // GET ALL REVIEWS ADD CASE
      .addCase(getallreviewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallreviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allReviews = action.payload;
      })
      .addCase(getallreviewsAsync.rejected, (state) => {
        state.loading = false;
      })

      // UPDATE REVIEW
      .addCase(updatereviewsAsync.pending, (state) => {
        state.updateReviewLoading = true;
      })
      .addCase(updatereviewsAsync.fulfilled, (state) => {
        state.updateReviewLoading = false;
      })
      .addCase(updatereviewsAsync.rejected, (state) => {
        state.updateReviewLoading = false;
      })

      // DELETE REVIEW
      .addCase(deletereviewsAsync.pending, (state) => {
        state.deleteReviewLoading = true;
      })
      .addCase(deletereviewsAsync.fulfilled, (state) => {
        state.deleteReviewLoading = false;
      })
      .addCase(deletereviewsAsync.rejected, (state) => {
        state.deleteReviewLoading = false;
      });
  },
});

export default reviewsSlice.reducer;
