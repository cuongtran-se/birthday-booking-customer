import { InquiryDataResponse } from "@/dtos/response/inquiry.response";
import { createSlice } from "@reduxjs/toolkit";
import { getAllInquiryByAuthor } from "../action/inquiry.action";

interface InquiryState {
  inquiryList: InquiryDataResponse[] | [];
  loading: boolean;
}
const initialState: InquiryState = {
  inquiryList: [],
  loading: false,
};

export const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInquiryByAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInquiryByAuthor.fulfilled, (state, action) => {
        state.inquiryList = action.payload || [];
        state.loading = false;
      })
      .addCase(getAllInquiryByAuthor.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default inquirySlice.reducer;
