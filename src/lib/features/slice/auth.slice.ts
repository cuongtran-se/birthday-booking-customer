import { LOGIN_PARAM, REGISTER_PARAM } from "@/models/auth.param";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authService } from "../../service/auth.service";
import { REGISTER_RES_DATA, USERINFO_RESPONSE } from "@/dtos/response/auth.response";
import { APP_CONSTANTS } from "@/enums/app";

interface AuthState {
  isAuthenticated: boolean;
  role: number;
  userInfo: USERINFO_RESPONSE | null;
  dataRegister: REGISTER_RES_DATA;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  role: -1,
  userInfo: null,
  dataRegister: null,
  loading: false,
  error: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (param: REGISTER_PARAM, { rejectWithValue }) => {
    try {
      const response = await authService.register(param);

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError?.response?.data);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (param: LOGIN_PARAM, { rejectWithValue }) => {
    try {
      const response = await authService.login(param);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError?.response?.data);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await authService.loginWithGoogle(accessToken);
      localStorage.setItem(APP_CONSTANTS.ACCESS_TOKEN, response?.data?.token);
      // localStorage.setItem(AppConstants.USER, JSON.stringify(result.data.data.account));
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUserInfo();

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError?.response?.data);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem(APP_CONSTANTS.ACCESS_TOKEN);
      return null;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log("<Collab_logout>: ", error);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const loadAuthState = createAsyncThunk(
  "auth/loadAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const isAuthenticated = Boolean(
        localStorage.getItem(APP_CONSTANTS.ACCESS_TOKEN),
      );
      //   const roleId = await localStorage.getItem(APP_CONSTANTS.ROLE_ID);

      return {
        isAuthenticated: isAuthenticated,
        roleId: -1,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (imgSrc: File | null, { rejectWithValue }) => {
    try {
      const response = await authService.updateAvatar(imgSrc);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.dataRegister = action.payload;
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        // state.isAuthenticated = true;
        // state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.userInfo = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
