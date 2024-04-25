import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  pathName: string;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  pathName: "/",
  loading: false,
  error: "",
};

export const setPathName = createAsyncThunk(
  "app/getPathName",
  async (pathName: string) => {
    try {
      return pathName;
    } catch (error) {
      console.log(error);
    }
  },
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPathName.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPathName.fulfilled, (state, action) => {
        state.pathName = action.payload || "/";
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(setPathName.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default appSlice.reducer;
