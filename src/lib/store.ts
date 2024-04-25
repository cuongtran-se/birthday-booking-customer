// store.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slice/auth.slice";
import appReducer from "./features/slice/app.slice";
import inquiryReducer from "./features/slice/inquiry.slice";
import venueReducer from "../lib/features/slice/venue.slice";
import themeReducer from "../lib/features/slice/theme.slice";
import packageReducer from "../lib/features/slice/package.slice";
import serviceReducer from "../lib/features/slice/service.slice";
import partyBookingReducer from "../lib/features/slice/partyBooking.slice";
import roomReducer from "../lib/features/slice/room.slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // If you want to disable serializableCheck as well
    });
  },
  reducer: {
    auth: authReducer,
    app: appReducer,
    inquiryReducer,
    venueReducer,
    themeReducer,
    packageReducer,
    serviceReducer,
    partyBookingReducer,
    roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
