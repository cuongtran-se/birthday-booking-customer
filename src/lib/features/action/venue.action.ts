import { venueService } from "@/lib/service/venue.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllVenue = createAsyncThunk(
  "venue/getAllVenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await venueService.getAllVenue();
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllVenueCheckSlotByDate = createAsyncThunk(
  "venue/getAllVenueCheckSlotByDate",
  async (date: string | null, { rejectWithValue }) => {
    try {
      const response = await venueService.getAllVenueCheckSlotByDate(date);
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
