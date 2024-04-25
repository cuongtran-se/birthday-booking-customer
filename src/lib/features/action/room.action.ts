import { GetRoomRequest } from "@/dtos/request/room.request";
import { roomService } from "@/lib/service/room.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllRoomCheckSlot = createAsyncThunk(
  "service/getAllRoomCheckSlot",
  async (payload: GetRoomRequest, { rejectWithValue }) => {
    try {
      const response = await roomService.getAllRoomCheckSlot(payload);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
