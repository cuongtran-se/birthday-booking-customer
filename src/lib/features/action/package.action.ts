import { GetPackageRequest } from "@/dtos/request/package.request";
import { packageService } from "@/lib/service/package.service";
import { venueService } from "@/lib/service/venue.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllPackage = createAsyncThunk(
  "package/getAllPackage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackage();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageDecor = createAsyncThunk(
  "package/getAllPackageDecor",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackageDecor(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageFood = createAsyncThunk(
  "package/getAllPackageFood",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackageFood(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageDecorNotChoose = createAsyncThunk(
  "package/getAllPackageDecorNotChoose",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackageDecorNotChoose(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageFoodNotChoose = createAsyncThunk(
  "package/getAllPackageFoodNotChoose",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackageFoodNotChoose(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getPackageById = createAsyncThunk(
  "package/getPackageById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getPackageById(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
