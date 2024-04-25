import {
  BookingRequest,
  BookingUpdateOrganzationTimeRequest,
  BookingUpdatePackage,
} from "@/dtos/request/partyBooking.request";
import { partyBookingService } from "@/lib/service/partyBooking.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createPartyBooking = createAsyncThunk(
  "partyBooking/createPartyBooking",
  async (payload: BookingRequest, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.createPartyBooking(payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllBooking = createAsyncThunk(
  "partyBooking/getAllBooking",
  async (_, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.getAllBooking();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getBookingById = createAsyncThunk(
  "partyBooking/getBookingById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.getBookingById(id);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const cancelBooking = createAsyncThunk(
  "partyBooking/cancelBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.cancelBooking(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const updateOrganizationTime = createAsyncThunk(
  "partyBooking/updateOrganizationTime",
  async (params: BookingUpdateOrganzationTimeRequest, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.updateOrganizationTime(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const updatePackage = createAsyncThunk(
  "partyBooking/updatePackage",
  async (params: BookingUpdatePackage, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.updatePackage(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
