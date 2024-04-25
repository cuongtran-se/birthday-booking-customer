import { createSlice } from "@reduxjs/toolkit";
import { getAllRoomCheckSlot } from "../action/room.action";
import {
  RoomArrayResponse,
  RoomDataResponse,
} from "@/dtos/response/room.response";

interface State {
  roomReponse: RoomArrayResponse;
  roomList: RoomDataResponse[] | [];
  roomByIdList: any;
  loading: boolean;
}

const initialState: State = {
  roomReponse: {
    status: "",
    message: "",
    data: [],
  },
  roomList: [],
  roomByIdList: null,
  loading: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomCheckSlot.pending, (state, action) => {
        state.loading = true;
        // state.roomList = [];
      })
      .addCase(getAllRoomCheckSlot.fulfilled, (state, action) => {
        state.roomReponse = action.payload;
        state.roomList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllRoomCheckSlot.rejected, (state, action) => {
        state.loading = false;
        state.roomList = [];
      });
  },
});

export default roomSlice.reducer;
