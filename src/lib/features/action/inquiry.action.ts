import { inquiryService } from "@/lib/service/inquiry.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllInquiryByAuthor = createAsyncThunk(
  "inquiry/getAllInquiryByAuthor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await inquiryService.getAllInquiryByAuthor();
      return response?.data?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getInquiryById = createAsyncThunk(
  "inquiry/getInquiryById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await inquiryService.getInquiryById(id);
      return response?.data?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const createInquiry = createAsyncThunk(
  "inquiry/createInquiry",
  async (
    payload: {
      inquiryQuestion: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await inquiryService.createInquiry(payload);
      return response?.data?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const createInquiryForChangeThemeInVenue = createAsyncThunk(
  "inquiry/createInquiryForChangeThemeInVenue",
  async (
    payload: {
      bookingId: number;
      themeInVenueId: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response =
        await inquiryService.createInquiryForChangeThemeInVenue(payload);
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const createInquiryForChangePackageInVenue = createAsyncThunk(
  "inquiry/createInquiryForChangePackageInVenue",
  async (
    payload: {
      bookingId: number;
      packageInVenueId: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response =
        await inquiryService.createInquiryForChangePackageInVenue(payload);
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const updateInquiry = createAsyncThunk(
  "inquiry/updateInquiry",
  async (
    request: { id: number; payload: { inquiryQuestion: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await inquiryService.updateInquiry({
        id: request.id,
        payload: request.payload,
      });
      return response?.data?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const deleteInquiry = createAsyncThunk(
  "inquiry/deleteInquiry",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await inquiryService.deleteInquiry(id);
      return response?.data?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
