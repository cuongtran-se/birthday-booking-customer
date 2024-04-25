import { serviceService } from "@/lib/service/service.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllService = createAsyncThunk(
  "service/getAllService",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await serviceService.getAllService(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (
    params: { venueId: number; serviceId: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await serviceService.getServiceById(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
