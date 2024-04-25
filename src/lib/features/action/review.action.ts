import { reviewService } from "@/lib/service/review.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (
    request: {
      id: number;
      payload: {
        reviewMessage: string;
        rating: number;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await reviewService.createReview(request);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllReview = createAsyncThunk(
  "review/getAllReview",
  async (
    request: {
      venueId: number;
      fitler?: { rating?: number | null };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await reviewService.getAllReview(request);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
