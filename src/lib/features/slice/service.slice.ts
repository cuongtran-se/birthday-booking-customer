import { createSlice } from "@reduxjs/toolkit";
import { getAllService, getServiceById } from "../action/service.action";
import {
  ServiceArrayResponse,
  ServiceDataResponse,
} from "@/dtos/response/service.response";

interface State {
  serviceReponse: ServiceArrayResponse;
  serviceList: ServiceDataResponse[] | [];
  serviceByIdList: any;
  loading: boolean;
}

const initialState: State = {
  serviceReponse: {
    status: "",
    message: "",
    data: [],
  },
  serviceList: [],
  serviceByIdList: null,
  loading: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllService.fulfilled, (state, action) => {
        state.serviceReponse = action.payload;
        state.serviceList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllService.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getServiceById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.serviceByIdList = action.payload.data;
        state.loading = false;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default serviceSlice.reducer;
