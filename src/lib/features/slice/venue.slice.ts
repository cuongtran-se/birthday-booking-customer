import { createSlice } from "@reduxjs/toolkit";
import {
  VenueArrayResponse,
  VenueDataResponse,
} from "@/dtos/response/venue.response";
import {
  getAllVenue,
  getAllVenueCheckSlotByDate,
} from "../action/venue.action";
import { ReviewDataResponse } from "@/dtos/response/review.response";
import { getAllReview } from "../action/review.action";

interface State {
  venueCheckSlotByDateResponse: VenueArrayResponse;
  venueCheckSlotByDateList: VenueDataResponse[] | [];
  venueList: VenueDataResponse[] | [];
  reviewList: ReviewDataResponse[];
  loading: boolean;
  loadingReview: boolean;
}
const initialState: State = {
  venueCheckSlotByDateResponse: {
    status: "",
    message: "",
    data: [],
  },
  venueCheckSlotByDateList: [],
  venueList: [],
  reviewList: [],
  loading: false,
  loadingReview: false,
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVenue.fulfilled, (state, action) => {
        state.venueList = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getAllVenue.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllVenueCheckSlotByDate.pending, (state) => {
        state.loading = true;
        state.venueCheckSlotByDateList = [];
      })
      .addCase(getAllVenueCheckSlotByDate.fulfilled, (state, action) => {
        state.venueCheckSlotByDateList = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getAllVenueCheckSlotByDate.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllReview.pending, (state) => {
        state.loadingReview = true;
      })
      .addCase(getAllReview.fulfilled, (state, action) => {
        state.reviewList = action.payload?.data || [];
        state.loadingReview = false;
      })
      .addCase(getAllReview.rejected, (state, action) => {
        state.loadingReview = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default venueSlice.reducer;
