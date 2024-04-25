import { paymentService } from "@/lib/service/payment.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createPaymentByBookingId = createAsyncThunk(
  "payment/createPaymentByBookingId",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await paymentService.createPaymentByBookingId(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
